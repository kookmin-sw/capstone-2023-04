from django.urls import path
from . import views

urlpatterns = [
    path('station', views.getStation, name="test"),
    path('time', views.getTime, name='time')
]
