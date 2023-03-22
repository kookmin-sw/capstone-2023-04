from rest_framework.serializers import ModelSerializer
from .models import Stations

class TestDataSerializer(ModelSerializer):
    class Meta:
        model = Stations
        fields = ['station_name', 'heading_to', 'arrival_time', 'subway_id']