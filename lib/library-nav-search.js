const db = require('./db.js');

function editDistance(s,t) {  // edit distance 함수
    let m = s.length;
    let n = t.length;
    let d = new Array(m+1);

    for(let i=0; i<d.length; i++) {
        d[i]=new Array(n+1);
    }
    d[0][0]=0;
    for(let i=1; i<=m; i++) {
        d[i][0]=i;
    }
    for( let j =1; j<=n; j++) {
        d[0][j]=j;
    }

    for(let i=0; i<=m; i++) {
        for(let j=1; j<=n; j++) {
            d[i][j] = (i === 0) ? j : Math.min(
            d[i - 1][j] + 1,
            d[i][j - 1] + 1,
            d[i - 1][j - 1] + (t[j - 1] === s[i - 1] ? 0 : 1)
            );
        }

    }
    return d[m][n];
}

exports.searchBook = function (search_word, response, next) {
    
    let data = db.query('SELECT * FROM book', (err, data) => { // db에 모든 book데이터 베이스 요청
        if(err) {return err;}
        let resultList = new Array();
        for(let i=0; i < data.length; i++) { // 들어온 데이터 길이만큼 반복 실행

            let result = editDistance(data[i].book_name.toLowerCase(), search_word.toLowerCase()); // edit distance함수로 유사도 검사
            let flag = 0;
            if((result == 1)||result == 0) { // 1 이하의 오차로 유사할때 실행

                for(let listCount = 0; listCount < resultList.length; listCount++) { // 이미 결과 리스트에 들어간 데이터들과 비교해서 이미 중복된 책이 있는지 확인    
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
                for(let listCount = 0; listCount < resultList.length; listCount++) {
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
        if(search_word === '') {
            response.render('index', {data: []});
        }
        else {
            response.render('index', {data: resultList});
        }
    });
}