from server.models import Photo
from server.serializers import UserSerializer, PhotoSerializer
from server.permissions import IsOwner, canPost
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login, logout
from rest_framework import generics, permissions
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from subprocess import Popen, PIPE, STDOUT
import scipy.misc, numpy as np, os, sys
import json

dir_path = os.path.dirname(os.path.realpath(__file__))

def styleTransfer(photo, paintingName):
    styleDict = {
        'la_muse': '/style_transfer/checkpoints/la_muse.ckpt',
        'rain_princess': '/style_transfer/checkpoints/rain_princess.ckpt',
        'the_scream': '/style_transfer/checkpoints/scream.ckpt',
        'udnie': '/style_transfer/checkpoints/udnie.ckpt',
        'wave': '/style_transfer/checkpoints/wave.ckpt',
        'shipwreck': '/style_transfer/checkpoints/wreck.ckpt'
    }
    cmd = "python %s/style_transfer/evaluate.py --checkpoint %s --in-path %s --out-path style_transfer/results/rainHeadshotTest6.jpg" %(dir_path, dir_path + styleDict[paintingName], dir_path + photo)
    p = Popen(cmd, shell=True, stdin=PIPE, stdout=PIPE, stderr=PIPE, close_fds=True)
    output = p.stdout.read()
    err = p.stderr.read()
    print ('stderr: ', err)
    image = scipy.misc.toimage(np.asarray(json.loads(output.decode('utf-8'))))
    return image

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

# class PhotoList(APIView):
    # permission_classes = (permissions.IsAuthenticated, IsOwner,)
    # permission_classes = (permissions.IsAuthenticated, canPost,)

    # def get(self, request, format=None):
    #     user = self.request.user
    #     photos = Photo.objects.filter(user=user)
    #     serializer = PhotoSerializer(photos, many=True)
    #     return Response(serializer.data, status=status.HTTP_200_OK)
    #
    # def post(self, request, format=None):
        # res = styleTransfer(request.data['photo'], request.data['painting'])
        # res.save('%s/style_transfer/results/myOwnSave3.jpg' % (dir_path))
        # res.show()
        # return Response('did it work?', status=status.HTTP_201_CREATED)
        # serializer = PhotoSerializer(data=request.data)
        # if serializer.is_valid():
        #     serializer.save(user=self.request.user)
        #     return Response(serializer.data, status=status.HTTP_201_CREATED)
        # return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PhotoList(generics.ListCreateAPIView):
    serializer_class = PhotoSerializer

    def get_queryset(self):
        queryset = Photo.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        print('im in photo list')
        print(self.request.data)
        serializer.save(user=self.request.user)
