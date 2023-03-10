from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Stations
from .serializer import TestDataSerializer

@api_view(['GET'])
def getTestDatas(request):
    datas = Stations.objects.using('station_db').all()
    serializer = TestDataSerializer(datas, many=True)
    return Response(serializer.data)
