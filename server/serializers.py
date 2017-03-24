from rest_framework import serializers
from server.models import Photo
from django.contrib.auth.models import User

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'email', 'password')

class PhotoSerializer(serializers.ModelSerializer):
    user_id = serializers.ReadOnlyField(source='user.id')
    class Meta:
        model = Photo
        fields = ('id', 'user_id', 'photo_url')
