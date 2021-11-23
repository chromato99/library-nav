const template = require('./template.js');
var fs = require('fs');
const db = require('./db.js');
const sanitizeHtml = require('sanitize-html');
const { Console } = require('console');

function getList(arr) { // 들어온 배열을 사용해 리스트 html 생성
    var list = "<ul>";
    for (var i=0; i < arr.length; i++) {  
        list += `<li class = 'source' id = ${i}><a href="/info/${arr[i].registration_num}">${arr[i].book_name}&nbsp;&nbsp;&nbsp;&nbsp;[${arr[i].author}]</a></li>`; 
    }
    list += "</ul>";
    return list;
}

function editDistance(s,t) {  // edit distance 함수
    var m = s.length;

    var n = t.length;
    var d = new Array(m+1);
    for(var i=0; i<d.length; i++)
    {
        d[i]=new Array(n+1);
    }
    d[0][0]=0;
    for(var i=1; i<=m; i++)
    {
        d[i][0]=i;
    }
    for( var j =1; j<=n; j++)
    {
        d[0][j]=j;
    }

    for(var i=0; i<=m; i++)
    {
        for(var j=1; j<=n; j++)
        {
            d[i][j] = (i === 0) ? j : Math.min(
            d[i - 1][j] + 1,
            d[i][j - 1] + 1,
            d[i - 1][j - 1] + (t[j - 1] === s[i - 1] ? 0 : 1)
            );
        }

    }
    
    return d[m][n];
}

exports.home = function(request, response, next){ // 처음 접속시 화면 출력
    var formedTemplate = template.html('','',''); // 별다른 설정 없이 기본 템플릿 생성
    response.send(formedTemplate);
}

exports.search = function(request, response, next) { // 검색시 실행되는 함수
    var search_word = request.query.item || ''; // http get 방식으로 들어온 쿼리문에서 검색어 추출
    var resultList = new Array(); // 결과 담을 리스트 생성

    var data = db.query('SELECT * FROM book', (err, data) => { // db에 모든 book데이터 베이스 요청
        if(err) {return err;}
        for(var i=0; i < data.length; i++) { // 들어온 데이터 길이만큼 반복 실행

            var result = editDistance(data[i].book_name.toLowerCase(), search_word.toLowerCase()); // edit distance함수로 유사도 검사
            let flag = 0;
            if((result == 1)||result == 0) { // 1 이하의 오차로 유사할때 실행

                for(var listCount = 0; listCount < resultList.length; listCount++) { // 이미 결과 리스트에 들어간 데이터들과 비교해서 이미 중복된 책이 있는지 확인    
                    if(resultList[listCount].book_name.toLowerCase() === data[i].book_name.toLowerCase() && resultList[listCount].author === data[i].author) {
                        flag = 1;
                        break;
                    }
                }
                if(flag === 0) { // 중복된 책이 없다면 결과 리스트에 추가
                    resultList.push(data[i]);
                }
            } else if(data[i].book_name.toLowerCase().includes(search_word.toLowerCase())) { // 유사하지 않더라도 검색 문자열이 포함된 책재목이 있는지 확인
                
                // 이미 결과 리스트에 들어간 데이터들과 비교해서 이미 중복된 책이 있는지 확인
                for(var listCount = 0; listCount < resultList.length; listCount++) {
                    if(resultList[listCount].book_name.toLowerCase() === data[i].book_name.toLowerCase() && resultList[listCount].author === data[i].author) {
                        flag = 1;
                        break;
                    }
                }
                if(flag === 0) { // 중복된 책이 없다면 결과 리스트에 추가
                    resultList.push(data[i]);
                }
            }
        }
        
        var list = getList(resultList); // 결과 리스트로 리스트 html 생성
        var formedTemplate = template.html('', list,''); // 템플릿에 결과 리스트 html을 포함해서 html 생성
        response.send(formedTemplate);
    });
}

exports.info = function(request, response, next) { // 책 세부 정보 출력 함수
    var registration = request.params.registration;

    var data = db.query('SELECT * FROM book WHERE book_name=(SELECT book_name FROM book WHERE registration_num=?) and author=(SELECT author FROM book WHERE registration_num=?)', [registration, registration], (err, data) => { // 같은 책제목과 같은 글쓴이인 중복된 책까지 전부 요청
        var formedTemplate = '';
        if(data.length == 0) { // 책 정보가 없으면 에러 메세지 출력
            formedTemplate = 'No data!!\nWrong access'
            response.send(formedTemplate);
        }
        else {
            //console.log(data.length);
            response.render('info', {data: data}); // ejs파일을 기반으로 html 파일 생성(views 디렉토리에 있음)
        }
        
    });
}