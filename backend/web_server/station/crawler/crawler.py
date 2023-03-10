import urllib.request
import pandas as pd
import json
import re
from konlpy.tag import Mecab
from collections import Counter
import os

class Crawler():
    def __init__(self):
        self.__start = 1
        self.__end = 100
        self.__display = 100
        self.__sort = 'date'
        
        self.__client_id = os.environ['client_id']
        self.__client_secret = os.environ['client_secret']
        
        self.__dataframe = pd.DataFrame(columns=("Title", "Description", "Pub Date"))
        
        __station_info = pd.read_excel(io='/home/mumat/capstone-2023-04/backend/web_server/station/data/station_230309.xlsx')
        
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
    def clientid(self):
        return self.__client_id
    
    @property
    def clientsecret(self):
        return self.__client_secret
    
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
        
        tagger = Mecab()
        
        # 네이버 뉴스 검색 api 사용
        for start_index in range(start, end, display):
            url = 'https://openapi.naver.com/v1/search/news?query=' + query + '&display=' + str(display) + '&start=' + str(start_index) + '&sort=' + sort
            
            request = urllib.request.Request(url)
            request.add_header('X-Naver-Client-Id', self.clientid)
            request.add_header('X-Naver-Client-Secret', self.clientsecret)
            
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
        
        return top_station_nouns