from rest_framework.generics import RetrieveAPIView, get_object_or_404
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView

from users.models import User
from users.serializers import UserSerializer


class RegistrationAPI(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email, password = request.data['email'], request.data['password']
        user = User.objects.create_user(email, password)
        return Response(user.get_token())


class UserAPI(RetrieveAPIView):
    permission_classes = [IsAuthenticated]
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
