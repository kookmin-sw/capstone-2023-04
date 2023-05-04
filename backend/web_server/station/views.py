from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializer import *

from .models import *
from util import crawler

import time

@api_view(['GET'])
def getStation(request):
    getter = crawler.Crawler()
    station = getter.find_station()
    getter.station_info(station)
    queryset = Stations.objects.all()
    serializer = StationSerializer(queryset, many=True)
    
    return Response(serializer.data)

@api_view(['GET'])
def getTime(request):
    queryset = Times.objects.all()
    serializer = TimeSerializer(queryset, many=True)
    time_string = serializer.data[0]['request_time']
    time_format = "%H:%M:%S"
    time_result = time.strptime(time_string, time_format)
    print(type(time_result))
    return Response(serializer.data)