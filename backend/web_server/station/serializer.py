from rest_framework.serializers import ModelSerializer
from .models import *

class TimeSerializer(ModelSerializer):
    class Meta:
        model = Times
        fields = ['request_time']

class StationSerializer(ModelSerializer):
    class Meta:
        model = Stations
        fields = ['station_name', 'updnLine', 'heading_to', 'arrival_time', 'subway_id']
        
class TestSerializer(ModelSerializer):
    class Meta:
        model = Tests
        fields = ['station_name', 'updnLine', 'heading_to', 'arrival_time', 'subway_id']
