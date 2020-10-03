from rest_framework import serializers

from users.models import User


class UserSerializer(serializers.Serializer):
    email = serializers.CharField()
    created = serializers.DateTimeField()
    is_active = serializers.BooleanField()

    class Meta:
        model = User
