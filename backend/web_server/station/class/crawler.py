import urllib.request
import pandas as pd
import json
import re
from konlpy.tag import Mecab
from collections import Counter

from ....web_server import my_settings

class Crawler():
    def __init__(self, query):
        query = self.query
        display = 10
        start = 1
        end = 10
        sort = 'date'
        client_id = my_settings.client_id
        client_secret = my_settings.client_secret