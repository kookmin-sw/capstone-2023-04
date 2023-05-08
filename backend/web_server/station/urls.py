from django.urls import path
from . import views

urlpatterns = [
    path('station', views.getStation, name="station"),
    path('time', views.getTime, name='time'),
    path('list', views.ListStationView.as_view(), name='list'),
]
