from django.urls import path
from . import views

urlpatterns = [
    path('station', views.getStation, name="station"),
    path('time', views.getTime, name='time'),
    path('list', views.ListStationView.as_view(), name='list'),
    path('findRoute', views.findRoute, name='findRoute'),
    path('test', views.test, name='test'),
    path('testList', views.ListTestView.as_view()),
]
