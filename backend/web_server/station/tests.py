from django.test import TestCase

import sys
sys.path.append(r'/home/mumat/capstone-2023-04/backend/web_server/station')

from .models import Stations
from util import crawler

class TestORM(TestCase):
    def test_get_result(self):
        tester = crawler.Crawler()
        station_info = tester.station_info(["서울", "삼각지", "공덕"])
        print(Stations.objects.all())
