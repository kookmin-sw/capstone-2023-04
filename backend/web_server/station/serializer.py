from rest_framework.serializers import ModelSerializer
from .models import Stations, Times

class TimeSerializer(ModelSerializer):
    class Meta:
        model = Times
        fields = ['request_time']

class StationSerializer(ModelSerializer):
    class Meta:
        model = Stations
        fields = ['station_name', 'heading_to', 'arrival_time', 'subway_id']
        
