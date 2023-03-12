from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Stations
from .serializer import TestDataSerializer
from .crawler.crawler import Crawler

@api_view(['GET'])
def getTestDatas(request):
    crawler = Crawler()
    station = crawler.find_station()
    station_info = crawler.station_info(station)
    print(station)
    return Response(station)
