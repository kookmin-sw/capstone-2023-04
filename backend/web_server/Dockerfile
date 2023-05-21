# 생성하는 docker의 python 버전
FROM python:3.8.10  

ENV PYTHONUNBUFFERED 1 

RUN apt-get -y update 

# docker 안에서 vi 설치 안해도됨
RUN apt-get -y install vim 

# sudo 설치
RUN apt-get install -y sudo 
RUN chmod +w /etc/sudoers
RUN echo 'irteam ALL=(ALL) NOPASSWD:ALL' | tee -a /etc/sudoers
RUN chmod -w /etc/sudoers


# docker안에 srv/docker-server 폴더 생성
RUN mkdir /srv/docker-server 
# 현재 디렉토리를 srv/docker-server 폴더에 복사
ADD . /srv/docker-server 

RUN pip install konlpy
RUN apt-get -y install curl
RUN curl -s https://raw.githubusercontent.com/konlpy/konlpy/master/scripts/mecab.sh | bash -s



# 작업 디렉토리 설정
WORKDIR /srv/docker-server 

# pip 업글
RUN pip install --upgrade pip 
# 필수 패키지 설치
RUN pip install -r requirements.txt 

# EXPOSE 8000
# CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]