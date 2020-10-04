from django.db import transaction
from rest_framework import serializers

from appeals.models import Appeal


class AppealSerializer(serializers.Serializer):
    id = serializers.IntegerField(required=False)
    status = serializers.CharField(required=False)
    created = serializers.DateTimeField(required=False)
    fio = serializers.CharField()
    reason = serializers.CharField()
    text = serializers.CharField()
    file = serializers.FileField(required=False)
    description = serializers.CharField(allow_blank=True, required=False)

    @transaction.atomic(savepoint=False)
    def create(self, validated_data):
        return Appeal.objects.create(
            owner=validated_data.get('owner'),
            text=validated_data.get('text'),
            fio=validated_data.get('fio'),
            reason=validated_data.get('reason'),
            description=validated_data.get('description'),
        )

    @transaction.atomic(savepoint=False)
    def update(self, instance, validated_data):
        instance.description = validated_data.get('description')
        instance.save()
        return instance

    class Meta:
        model = Appeal
