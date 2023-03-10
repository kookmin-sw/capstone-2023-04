from rest_framework.serializers import ModelSerializer
from .models import Stations
class TestDataSerializer(ModelSerializer):
    class Meta:
        model = Stations
        fields = "__all__"