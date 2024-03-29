from django.conf.urls import url, include
from rest_framework.urlpatterns import format_suffix_patterns

from . import views

urlpatterns = [
    url(r'^users/$', views.UserList.as_view(), name='user_list'),
    url(r'^session/$', views.Session.as_view(), name='session'),
    url(r'^logout/$', views.Logout.as_view(), name='logout'),
    url(r'^photos/', views.PhotoList.as_view(), name='photos_list'),
    url(r'^photo/(?P<pk>[0-9]+)/$', views.PhotoList.as_view(), name='photo'),
]
urlpatterns = format_suffix_patterns(urlpatterns)
