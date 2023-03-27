from rest_framework.response import Response
from rest_framework.decorators import api_view

from .serializer import TestDataSerializer

from .models import *
from util import crawler

@api_view(['GET'])
def getTestDatas(request):
    tester = crawler.Crawler()
    station = tester.find_station()
    tester.station_info(station)
    
    queryset = Stations.objects.all()
    serializer = TestDataSerializer(queryset, many=True)
    
    return Response(serializer.data)
