import datetime

from django.db import transaction
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from appeals.models import Appeal
from appeals.serializers import AppealSerializer
from resolver.animals import classify_text
from resolver.classify_holder import ClassifyHolder
from resolver.email import generate_appeal_accepted_email, generate_appeal_police_email


ARTICLE_245 = 'Статья 245 УК РФ «Жестокое обращение с животными» (п.1-убийство)'
ARTICLE_245_a = 'Статья 245 УК РФ «Жестокое обращение с животными» (п.1-убийство,  п.2 (а) группой лиц, группой лиц по предварительному сговору или организованной группой'
ARTICLE_213_1_a = 'Статья 213 УК РФ «Хулиганство» (п.1 - грубое нарушение общественного порядка (а) - с применением оружия или предметов, используемых в качестве оружия)'
ARTICLE_167 = 'Статья 167. «Умышленное повреждение или уничтожение имущества» (п. 9 - Уничтожением или повреждением имущества (…) признаются действия, обладающие большой разрушительной силой и создающие опасность гибели людей и причинения иных тяжких последствий. Ими могут быть (…) отравление животных(…))'
ARTICLE_222 = 'Статья 222. «Незаконные приобретение, передача, сбыт, хранение, перевозка или ношение оружия, боеприпасов, взрывчатых веществ и взрывных устройств» КоАП РФ Статья 20.13. «Стрельба из оружия в отведенных для этого местах с нарушением установленных правил или в не отведенных для этого местах»'
ARTICLE_FZ_498 = 'ФЗ от 27.12.2018 N 498-ФЗ Об ответственном обращении с животными и о внесении изменений в отдельные законодательные акты Российской Федерации (ст. 4 - Обращение с животными основывается на следующих нравственных принципах и принципах гуманности: отношение к животным как к существам, способным испытывать эмоции и физические страдания; 2) ответственность человека за судьбу животного.)'


class AppealListCreateAPI(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Appeal.objects.all()
    serializer_class = AppealSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        entities = classify_text(ClassifyHolder.get_classifier(), serializer.validated_data.get('text'))
        fio = serializer.validated_data.get('fio')

        persons = set()
        animals = set()
        crimes = set()
        weapons = set()

        punishes = set()

        for ent in entities:
            if ent[0] == 'PERSON':
                persons.add(ent[1])
            elif ent[0] == 'ANIMAL':
                animals.add(ent[1])
            elif ent[0] == 'CRIME':
                crimes.add(ent[1])
            elif ent[0] == 'WEAPON':
                weapons.add(ent[1])

        if len(persons) > 1:
            punishes.add(ARTICLE_245_a)
        else:
            punishes.add(ARTICLE_245)

        for weapon in weapons:
            if weapon in ('пистолет', 'автомат', 'ружье', 'ружьё', 'нож'):
                punishes.add(ARTICLE_213_1_a)
            if weapon in ('пистолет', 'автомат', 'ружье', 'ружьё'):
                punishes.add(ARTICLE_222)

        for crime in crimes:
            if crime in ('убить', 'заморить', 'уморить', 'мучить', 'голод', 'жажда'):
                punishes.add(ARTICLE_FZ_498)

        for animal in animals:
            if 'мой' in animal or 'моего' in animal or 'мою' in animal:
                punishes.add(ARTICLE_167)

        punishes_string = "\n".join(punishes)

        description_date = f'Управлению МВД России\nот {fio}\n\nЗаявление\n\n{datetime.date.today().strftime("%d.%m.%Y")} было совершено преступление'
        description_people = f' следующими людьми: {", ".join(persons)}' if persons else ''
        description_animals = f', во время которого {", ".join(animals)}' if animals else ', во время которого животное'
        description_crimes = f'{"подвергались" if len(animals) > 1 else "подвергалось"} следующим деяниям: {", ".join(crimes)}' \
            if crimes else f'{"подвергались" if len(animals) > 1 else "подвергалось"} жестокому обращению'
        description_weapons = f'с использованием следующих предметов: {", ".join(weapons)}.\n' if weapons else '.\n'
        description_punishes = f'\nПрошу привлечь виновных к ответственности по следующим статьям:\n{punishes_string}' if punishes else ''
        description = f'{description_date} {description_people}{description_animals} {description_crimes} {description_weapons}{description_punishes}'

        description = f'''
{description}
Email для связи: {self.request.user.email}
------------
Заявление обработано порталом "Енот прав"'''

        return serializer.save(owner=self.request.user, description=description)


class AppealRetrieveUpdateCancelAPI(RetrieveUpdateDestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Appeal.objects.all()
    serializer_class = AppealSerializer
    lookup_url_kwarg = 'id'
    lookup_field = 'id'

    def filter_queryset(self, queryset):
        return queryset.filter(owner=self.request.user)

    def perform_destroy(self, instance):
        if instance.status in (instance.STATUS_NEW,):
            instance.status = instance.STATUS_CANCELED
            instance.save()


class AppealSaveDocumentAPI(APIView):
    parser_class = (MultiPartParser,)
    permission_classes = [IsAuthenticated]

    def post(self, request, id):
        appeal = get_object_or_404(Appeal.objects.filter(owner=self.request.user), pk=id)
        appeal.file = request.FILES.get('file')
        appeal.save()
        return Response()


class AppealSendAPI(APIView):
    parser_class = (MultiPartParser,)
    permission_classes = [IsAuthenticated]

    def filter_queryset(self, queryset):
        return queryset.filter(owner=self.request.user)

    @transaction.atomic()
    def post(self, request, id):
        appeal = get_object_or_404(Appeal.objects.filter(owner=self.request.user), pk=id)

        generate_appeal_accepted_email(appeal.owner.email, appeal.description).send()
        generate_appeal_police_email(appeal.description).send()
        appeal.status = appeal.STATUS_DONE
        appeal.save()
        return Response()


class AppealTestAPI(APIView):
    permission_classes = []
    parser_class = (MultiPartParser,)

    def filter_queryset(self, queryset):
        return queryset.filter(owner=self.request.user)

    def get(self, request, text):
        entities = classify_text(
            ClassifyHolder.get_classifier(),
            text
        )

        return Response(entities)
