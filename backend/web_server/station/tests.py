from django.test import TestCase

import sys
sys.path.append(r'/home/mumat/capstone-2023-04/backend/web_server/station')
from crawler import crawler
# Create your tests here.

tester = crawler.Crawler()
station_info = tester.station_info(["수유"])
