from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^landing', views.index, name='landing'),
    url(r'^profile', views.index, name='profile'),
    url(r'^login', views.index, name='login'),
    url(r'^signup', views.index, name='signup'),
    url(r'^confirm', views.index, name='confirm'),
    url(r'^painting', views.index, name='painting'),
    url(r'^photo', views.index, name='photo'),
    url(r'^$', views.index, name='index'),
]
