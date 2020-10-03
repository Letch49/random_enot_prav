from django.db import transaction
from rest_framework.generics import ListCreateAPIView, RetrieveUpdateDestroyAPIView, get_object_or_404
from rest_framework.parsers import MultiPartParser
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from appeals.models import Appeal
from appeals.serializers import AppealSerializer
from resolver.email import Email


class AppealListCreateAPI(ListCreateAPIView):
    permission_classes = [IsAuthenticated]
    queryset = Appeal.objects.all()
    serializer_class = AppealSerializer

    def filter_queryset(self, queryset):
        return queryset.filter(owner=self.request.user)

    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)


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
        # sending email
        Email(appeal.fio, appeal.text).send()
        # changing status
        appeal.status = appeal.STATUS_DONE
        appeal.save()
        return Response()
