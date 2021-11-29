const db = require('./db.js');

function editDistance(s,t) {  // edit distance function to caculate similarity of word
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
    
    let data = db.query('SELECT * FROM book', (err, data) => { // Request all book database to db
        if(err) {return err;}
        let resultList = new Array();
        for(let i=0; i < data.length; i++) { // Repeat execution as long as the input data length

            let result = editDistance(data[i].book_name.toLowerCase(), search_word.toLowerCase()); // Similarity check with edit distance function
            let flag = 0;
            if((result == 1)||result == 0) { // Executed when similar with an error of 1 or less

                for(let listCount = 0; listCount < resultList.length; listCount++) { // Check if there are already duplicate books by comparing them with the data already in the result list  
                    if(resultList[listCount].book_name.toLowerCase() === data[i].book_name.toLowerCase() && resultList[listCount].author === data[i].author) {
                        flag = 1;
                        break;
                    }
                }
                if(flag === 0) { // If there are no duplicate books, add them to the result list
                    resultList.push(data[i]);
                }
            } else if(data[i].book_name.toLowerCase().includes(search_word.toLowerCase())) { // Check for bookshelves that contain the search word, even if they are not similar
                
                // Check if there are already duplicate books by comparing them with the data already in the result list
                for(let listCount = 0; listCount < resultList.length; listCount++) {
                    if(resultList[listCount].book_name.toLowerCase() === data[i].book_name.toLowerCase() && resultList[listCount].author === data[i].author) {
                        flag = 1;
                        break;
                    }
                }
                if(flag === 0) { // If there are no duplicate books, add them to the result list
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