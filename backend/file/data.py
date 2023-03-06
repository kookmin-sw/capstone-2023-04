import urllib.request
import pandas as pd
import json
import re
from konlpy.tag import Mecab
from collections import Counter

import my_settings

client_id = my_settings.client_id
client_secret = my_settings.client_secret

query = urllib.parse.quote('지하철 지연')
display = 100
start = 1
end = 100
sort = 'date'

news_df = pd.DataFrame(columns=("Title", "Description", "Pub Date"))
tagger = Mecab()

# 지하철 역 이름 저장
station_info = pd.read_csv('/tmp/mecab-ko-dic-2.1.1-20180720/Place-station.csv')
station = []
for row in station_info.itertuples():
    station.append(row[1])

def find_data():
    idx = 0
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

    # Mecap 이용해서 지하철 역명만 저장
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
    print(top_station_nouns[0][0])

find_data()