from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework.generics import ListAPIView
from .serializer import *

from .models import *
from util import crawler, findingRoute

# 새로고침 버튼 눌렀을 때 불러올 API
@api_view(['GET'])
def getStation(request):
    getter = crawler.Crawler()
    station = getter.find_station()
    getter.station_info(station)
    queryset = Stations.objects.all().order_by('subway_id')
    serializer = StationSerializer(queryset, many=True)
    
    return Response(serializer.data)

# 홈 화면 로딩할 때 불러올 API
@api_view(['GET'])
def getTime(request):
    queryset = Times.objects.all()
    serializer = TimeSerializer(queryset, many=True)
    return Response(serializer.data)

@api_view(['POST'])
def findRoute(request):
    finder = findingRoute.FindingRoute()
    starting_point = request.data['departure']
    destination = request.data['arrival']
    address = [starting_point, destination]
    
    geocode = finder.geocoding(address)
    route = finder.find_route(geocode)
    return Response({'route' : route}) 
    
class ListStationView(ListAPIView):
    queryset = Stations.objects.all().order_by('subway_id')
    serializer_class = StationSerializer
    
@api_view(['GET'])
def test(request):
    getter = crawler.Crawler()
    station = getter.test()
    queryset = Tests.objects.all().order_by('subway_id')
    serializer = TestSerializer(queryset, many=True)
    
    return Response(serializer.data)

class ListTestView(ListAPIView):
    queryset = Tests.objects.all().order_by('subway_id')
    serializer_class = TestSerializer