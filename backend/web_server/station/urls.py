from django.urls import path
from . import views

urlpatterns = [
    path('datas/', views.getTestDatas, name="test"),
]
