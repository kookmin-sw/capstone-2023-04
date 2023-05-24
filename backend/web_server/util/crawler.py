# 장고 경로 설정 및 settings.py 설정
import os
import sys
sys.path.append('/home/ubuntu/capstone-2023-04/backend/web_server')
os.environ.setdefault("DJANGO_SETTINGS_MODULE", "web_server.settings")

import urllib.request
import pandas as pd
import json
import re
from konlpy.tag import Mecab
from collections import Counter

import django

class Crawler():
    def __init__(self):
        self.__start = 1
        self.__end = 100
        self.__display = 100
        self.__sort = 'date'
        
        self.__dataframe = pd.DataFrame(columns=("Title", "Description", "Pub Date"))
        # 역명 파일 불러오기
        __station_info = pd.read_excel(io='./station/data/station_230309.xlsx')
        
        self.__station = set()
        for row in __station_info.itertuples():
            self.__station.add(row[2])
        self.__station = list(self.__station)
        
        
    @property        
    def start(self):
        return self.__start
    
    @property
    def end(self):
        return self.__end
    
    @property
    def display(self):
        return self.__display
    
    @property
    def sort(self):
        return self.__sort
        
    @property
    def dataframe(self):
        return self.__dataframe
    
    @property
    def station(self):
        return self.__station
    
    def find_station(self):
        idx = 0
        start = self.start
        end = self.end
        display = self.display
        sort = self.sort
        query = urllib.parse.quote('지하철 지연')
        news_df = self.dataframe
        # bashrc에 담긴 변수들 불러옴
        client_id = os.environ['client_id']
        client_secret = os.environ['client_secret']
        
        tagger = Mecab()
        
        # 네이버 뉴스 검색 api 사용
        for start_index in range(start, end, display):
            url = 'https://openapi.naver.com/v1/search/news?query=' + query + '&display=' + str(display) + '&start=' + str(start_index) + '&sort=' + sort
            
            request = urllib.request.Request(url)
            request.add_header('X-Naver-Client-Id', client_id)
            request.add_header('X-Naver-Client-Secret', client_secret)
            
            response = urllib.request.urlopen(request)
            rescode = response.getcode()
            
            if(rescode == 200):
                response_body = response.read()
                response_dict = json.loads(response_body.decode('utf-8'))
                items = response_dict['items']
                
                # 응답 결과 하나씩 돌면서 데이터 프레임에 저장
                for item_index in range(0, len(items)):
                    remove_tag = re.compile('<.*?>')
                    title = re.sub(remove_tag, '', items[item_index]['title'])
                    description = re.sub(remove_tag, '', items[item_index]['description'])
                    pub_date = items[item_index]['pubDate']
                    news_df.loc[idx] = [title, description, pub_date]
                    idx += 1
            else:
                print("Error Code: " + rescode)
            
        # 뉴스 요약 저장
        news = []
        for n in news_df.Description:
            news.append(n)
        
        # Mecab 이용해서 지하철 역명만 저장
        station = self.station
        station_nouns = []
        for n in news:
            for noun in tagger.nouns(n):
                if noun in station:
                    noun = noun.rstrip("역")
                    station_nouns.append(noun)
    
        # 지하철 역명 카운팅
        station_nouns_counter = Counter(station_nouns)
        # 상위 20개만 저장
        top_station_nouns = list(station_nouns_counter.most_common(20))
        
        results = []
        for item in top_station_nouns:
            results.append(item[0])
        
        return results
    
    def test(self):
        tagger = Mecab()
        
        #테스트 데이터 불러오기
        test_content = pd.read_csv('./station/data/demo_221202.csv')
        test_content = list(test_content['content'])
            
        station_nouns = []
        station = self.station
        for n in test_content:
            for noun in tagger.nouns(n):
                if noun in station:
                    noun = noun.rstrip("역")
                    station_nouns.append(noun)

        # 지하철 역명 카운팅
        station_nouns_counter = Counter(station_nouns)
        # 상위 20개만 저장
        top_station_nouns = list(station_nouns_counter.most_common(3))
        print(top_station_nouns)
        # results에 역명만 저장
        results = []
        for item in top_station_nouns:
            results.append(item[0])
        
        # 해당 역에 대해 조회 요청
        django.setup()
        from station.models import Tests
        queryset = Tests.objects.all()
        queryset.delete()
        api_key = os.environ['api_key']
        for station in results:
            query = urllib.parse.quote(station)
            # 서울시 API
            url = 'http://swopenAPI.seoul.go.kr/api/subway/' + api_key + '/json/realtimeStationArrival/0/100/'+query
        
            request = urllib.request.Request(url)
            
            response = urllib.request.urlopen(request)
            response_body = response.read()
            rescode = response.getcode()  

            if(rescode == 200):
                response_dict = json.loads(response_body.decode('utf-8'))
                items = response_dict['realtimeArrivalList']
                # json 응답에서 필요한 정보만 처리
                for item_index in range(0, len(items)):
                    if items[item_index]['ordkey'][1] == "1" and int(items[item_index]['barvlDt']) > 0:
                        name = items[item_index]['statnNm']
                        updnLine = items[item_index]['updnLine']
                        heading_to = items[item_index]['trainLineNm']
                        arrival_time = items[item_index]['barvlDt']
                        subwayId = items[item_index]['subwayId']
                        
                        Tests.objects.create(station_name=name, updnLine=updnLine, heading_to=heading_to, arrival_time=arrival_time, subway_id=subwayId)
        
        
    def station_info(self, stations):
        django.setup()
        from station.models import Stations, Times
        
        api_key = os.environ['api_key']
        queryset = Stations.objects.all()
        queryset.delete()
        time = Times.objects.update_or_create()
        
        for station in stations:    
            query = urllib.parse.quote(station)
            # 서울시 API
            url = 'http://swopenAPI.seoul.go.kr/api/subway/' + api_key + '/json/realtimeStationArrival/0/100/'+query
        
            request = urllib.request.Request(url)
            
            response = urllib.request.urlopen(request)
            response_body = response.read()
            rescode = response.getcode()  

            if(rescode == 200):
                response_dict = json.loads(response_body.decode('utf-8'))
                items = response_dict['realtimeArrivalList']
                # json 응답에서 필요한 정보만 처리
                for item_index in range(0, len(items)):
                    if items[item_index]['ordkey'][1] == "1" and int(items[item_index]['barvlDt']) > 600:
                        
                        name = items[item_index]['statnNm']
                        updnLine = items[item_index]['updnLine']
                        heading_to = items[item_index]['trainLineNm']
                        arrival_time = items[item_index]['barvlDt']
                        subwayId = items[item_index]['subwayId']
                        
                        Stations.objects.create(station_name=name, updnLine=updnLine, heading_to=heading_to, arrival_time=arrival_time, subway_id=subwayId)
            else:
                print("Error Code: " + rescode)
        