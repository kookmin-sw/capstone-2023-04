from rest_framework.serializers import ModelSerializer
from .models import Stationinfo

class TestDataSerializer(ModelSerializer):
    class Meta:
        model = Stationinfo
        fields = ['name']