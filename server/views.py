from server.models import Photo
from server.serializers import UserSerializer, PhotoSerializer
from server.permissions import IsOwner
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, permissions
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

class UserList(APIView):
    serializer_class = UserSerializer

    def post(self, request, format=None):
        serializer = UserSerializer(data=request.data)
        if serializer.is_valid():
            user = User.objects.create_user(username=serializer.data['username'], email=serializer.data['email'], password=serializer.data['password'])
            if user is not None:
                login(request, user)
                return Response(1, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class Session(APIView):

    def get(self, request, format=None):
        if request.user.is_authenticated:
            return Response(True, status=status.HTTP_200_OK)
        else:
            return Response(False, status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, format=None):
        username = request.data['username']
        password = request.data['password']
        user = authenticate(username=username, password=password)
        if user is not None:
            login(request, user)
            return Response(True, status=status.HTTP_200_OK)
        else:
            return Response(False, status=status.HTTP_400_BAD_REQUEST)

class Logout(APIView):

    def get(self, request, format=None):
        logout(request)
        return Response(True, status=status.HTTP_200_OK)

class PhotoList(generics.ListCreateAPIView):
    permission_classes = (permissions.IsAuthenticated, IsOwner,)
    serializer_class = PhotoSerializer

    def get_queryset(self):
        user = self.request.user
        return Photo.objects.filter(user=user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

# class PhotoDetail(generics.RetrieveUpdateDestroyAPIView):
#     permission_classes = (permissions.IsAuthenticatedOrReadOnly, IsOwner)
#     queryset = Photo.objects.all()
#     serializer_class = PhotoSerializer
