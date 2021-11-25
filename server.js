const express = require('express');
const ejs = require('ejs');
const compression = require('compression');
const sanitizeHtml = require('sanitize-html');
const libraryInfo = require('./lib/library-nav-info.js');
const librarySearch = require('./lib/library-nav-search.js');

const app = express(); // express 모듈 초기화
const port = 80 // 포트번호 설정

const start_position = { // 지도상에서 현재 위치
    x: 5,
    y: 15
}

app.set('views', __dirname + '/views'); // ejs모듈 초기화
app.set('view engine', 'ejs');
app.use(express.static('public')); // 정적 파일 위치 지정

app.use(compression()); // 데이터 절약을 위한 압축 미들웨어(기능적으로 무시해도 됨)


app.use(express.urlencoded({ extended: false})); // url 처리

app.get('/', (req, res, next) => { // 기본 진입점
    response.render('index', {data: []}); // 별다른 설정 없이 기본 템플릿 생성
});

app.get('/search', (req, res, next) => { // 검색했을시 진입점
    let search_word = req.query.item || ''; // http get 방식으로 들어온 쿼리문에서 검색어 추출
    librarySearch.searchBook(search_word, res, next);
});

app.get('/info/:registration', (req, res, next) => { // 책 정보 진입점
    let registration = req.params.registration;
    libraryInfo.getBookInfo(registration, start_position, res, next);
});


app.use((req, res, next) => { // 잘못된 접근일시
    res.status(404).send('404 error');
});
app.use((err, req, res, next) => { // 페이지 깨짐 오류 처리
    console.log(err);
    res.status(500).send('Broken Page');
});
app.listen(port, () => { // 포트 오픈
    console.log(`Example app listening at http://localhost:${port}`);
});