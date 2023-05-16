FROM python:3.8.10  # 생성하는 docker의 python 버전

ENV PYTHONUNBUFFERED 1 

RUN apt-get -y update 
RUN apt-get -y install vim # docker 안에서 vi 설치 안해도됨

RUN mkdir /srv/docker-server # docker안에 srv/docker-server 폴더 생성
ADD . /srv/docker-server # 현재 디렉토리를 srv/docker-server 폴더에 복사


WORKDIR /srv/docker-server # 작업 디렉토리 설정

RUN pip install --upgrade pip # pip 업글
RUN pip install -r requirements.txt # 필수 패키지 설치

EXPOSE 8000
CMD ["python", "manage.py", "runserver", "0.0.0.0:8000"]