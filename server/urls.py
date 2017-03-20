from django.conf.urls import url, include

from . import views

urlpatterns = [
    url(r'^users/$', views.user_list, name='user_list'),
    url(r'^photo_list/(?P<pk>[0-9]+)/$', views.photo_list, name='photo_list'),
]
