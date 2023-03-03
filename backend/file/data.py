import urllib.request
import pandas as pd
import json
import re
from konlpy.tag import Mecab
from collections import Counter
import pymysql
from dotenv import load_dotenv
import os

load_dotenv()

client_id = os.environ.get('client_id')
client_secret = os.environ.get('client_secret')

query = urllib.parse.quote('지하철 지연')
idx = 0
display = 100
start = 1
end = 1000
sort = 'date'

news_df = pd.DataFrame(columns=("Title", "Description", "Pub Date"))
tagger = Mecab()

station_info = pd.read_csv('/home/mumat/Capstone/mecab-0.996-ko-0.9.2/mecab-ko-dic-2.1.1-20180720/Place-station.csv')
station = []
for row in station_info.itertuples():
    station.append(row[1])

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
        for item_index in range(0, len(items)):
            remove_tag = re.compile('<.*?>')
            title = re.sub(remove_tag, '', items[item_index]['title'])
            description = re.sub(remove_tag, '', items[item_index]['description'])
            pub_date = items[item_index]['pubDate']
            news_df.loc[idx] = [title, description, pub_date]
            idx += 1
    else:
        print("Error Code: " + rescode)
        
# import datetime
# now = datetime.datetime.now() 
# news_df.to_csv('{}_{}.csv'.format('data',now.strftime('%Y%m%d_%H시%M분%S초')),encoding='utf-8-sig',index=False)

news = []
for n in news_df.Description:
    news.append(n)

station_nouns = []
for n in news:
    for noun in tagger.nouns(n):
        if noun in station:
            noun = noun.rstrip("역")
            station_nouns.append(noun)


news_nouns_counter = Counter(station_nouns)
top_news_nouns = list(news_nouns_counter.most_common(100))
    

user = os.environ.get('User')
password = os.environ.get('Password')
conn = pymysql.connect(host='127.0.0.1', user=user, password=password, db='station', charset='utf8')
cur = conn.cursor()

for station_name in top_news_nouns:
    query = f"""INSERT INTO stationInfo(name) VALUES('{station_name[0]}')"""
    cur.execute(query)

    """TODO:
        테이블에 데이터가 있으면 데이터를 전부 삭제 및 PK 1로 초기화
        새로 데이터 작성 후 저장
    """
conn.commit()
conn.close()