from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse

def hello_world(request):
    return HttpResponse("Hello, World!")

from django.shortcuts import render

# Create your views here.
from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSerializer, GroupSerializer
from .serializers import *
from django.contrib.auth import authenticate, login

from django.contrib.auth import get_user_model

User = get_user_model()


class HelloWorld(APIView):

    def get(self, request):
        data = {'message': 'Hello, World!'}
        return Response(data, status=status.HTTP_200_OK)

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from .serializers import UserSerializer, UserSignUpSerializer
# from django.contrib.auth.hashers import make_password


class UserSignInView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        # print(email, password)


        if email is None or password is None:
            return Response({'error': 'Please provide both email and password.'}, status=status.HTTP_400_BAD_REQUEST)

        user = authenticate(request, email=email, password=password)
        print(user)
        if not user:
            return Response({'error': 'Invalid credentials.'}, status=status.HTTP_401_UNAUTHORIZED)

        # Generate authentication token if needed (e.g., using JWT)
        login(request, user)

        serializer = UserSerializer(user)
        # return Response(serializer.data)
        response_data = {
            'user_id': user.id,  # Add user_id to the response
            'user': serializer.data
        }
        return Response(response_data, status=status.HTTP_200_OK)


from django.views.decorators.csrf import csrf_exempt
from rest_framework.generics import CreateAPIView
from rest_framework.response import Response
from rest_framework import status
from .serializers import UserSignUpSerializer

class UserSignUpView(CreateAPIView):
    serializer_class = UserSignUpSerializer

    @csrf_exempt
    def dispatch(self, request, *args, **kwargs):
        return super().dispatch(request, *args, **kwargs)

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)