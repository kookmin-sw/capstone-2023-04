[![Open in Visual Studio Code](https://classroom.github.com/assets/open-in-vscode-c66648af7eb3fe8bc4f294546bfd86ef473780cde1dea487d3c4ff354943c9ae.svg)](https://classroom.github.com/online_ide?assignment_repo_id=10029363&assignment_repo_type=AssignmentRepo)
# 알고타 - 2023 캡스톤디자인 04조


### 1. 프로잭트 소개

22년 하반기 전장연의 시위로 인한 학생 및 직장인들의 대중교통, 특히 지하철 이용이 
어려웠던 점을 통해 아이디어를 떠올리게 되었다.

---

### 2. 소개 영상

프로젝트 소개하는 영상을 추가하세요

---

### 3. 팀 소개
팀장 - 천성규

팀원 - 김명찬

---

### 4. 사용법
### Mecab 설치
```
tar zxfv mecab-0.996-ko-0.9.2.tar.gz
cd mecab-0.996-ko-0.9.2
./configure 
make
make check
su
make install
```

### Mecab-ko-dic 설치
```
tar zxfv mecab-ko-dic-2.1.1-20180720.tar.gz
cd mecab-ko-dic-2.1.1-20180720
./configure 
make
su
make install
```

### MySQL 설치
```
sudo apt update
sudo apt install mysql-server
sudo mysql
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password by '새로운비밀번호';
```

### MySQL 실행
```
sudo /etc/init.d/mysql start
sudo mysql -u root -p
```

---

### 5. 기타

추가적인 내용은 자유롭게 작성하세요.