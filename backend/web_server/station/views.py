from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from .serializer import *

from .models import *
from util import crawler

# 새로고침 버튼 눌렀을 때 불러올 API
@api_view(['GET'])
def getStation(request):
    getter = crawler.Crawler()
    station = getter.find_station()
    getter.station_info(station)
    queryset = Stations.objects.all()
    serializer = StationSerializer(queryset, many=True)
    
    return Response(serializer.data)

# 홈 화면 로딩할 때 불러올 API
@api_view(['GET'])
def getTime(request):
    queryset = Times.objects.all()
    serializer = TimeSerializer(queryset, many=True)
    return Response(serializer.data)

class ListStationView(ListAPIView):
    queryset = Stations.objects.all()
    serializer_class = StationSerializer