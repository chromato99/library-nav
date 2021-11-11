const template = require('./template.js');
var fs = require('fs');
const db = require('./db.js');
const sanitizeHtml = require('sanitize-html');
const { Console } = require('console');

function getList(arr) {
    var list = "<ul>";
    for (var i=0; i < arr.length; i++) {  
        list += `<li class = 'source' id = ${i}><a href="/info/${arr[i].registration_num}">${arr[i].book_name}&nbsp;&nbsp;&nbsp;&nbsp;${arr[i].author}</a></li>`; 
    }
    list += "</ul>";
    return list;
}

function editDistance(s,t) {
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

exports.home = function(request, response, next){
    var formedTemplate = template.html('','','');
    response.send(formedTemplate);
}

exports.search = function(request, response, next) {
    var search_word = request.query.item || '';
    var resultList = new Array();

    var data = db.query('SELECT * FROM book', (err, data) => {
        if(err) {return err;}
        for(var i=0; i < data.length; i++) {

            var result = editDistance(data[i].book_name.toLowerCase(), search_word.toLowerCase());
            let flag = 0;
            if((result == 1)||result == 0) {
                for(var listCount = 0; listCount < resultList.length; listCount++) {
                    if(resultList[listCount].book_name.toLowerCase() === data[i].book_name.toLowerCase() && resultList[listCount].author === data[i].author) {
                        flag = 1;
                        break;
                    }
                }
                if(flag === 0) {
                    console.log(flag);
                    resultList.push(data[i]);
                }
            } else if(data[i].book_name.toLowerCase().includes(search_word.toLowerCase())) {
                for(var listCount = 0; listCount < resultList.length; listCount++) {
                    if(resultList[listCount].book_name.toLowerCase() === data[i].book_name.toLowerCase() && resultList[listCount].author === data[i].author) {
                        flag = 1;
                        break;
                    }
                }
                if(flag === 0) {
                    console.log(flag);
                    resultList.push(data[i]);
                }
            }
        }
        
        var list = getList(resultList);
        var formedTemplate = template.html('', list,'');
        response.send(formedTemplate);
    });
}

exports.info = function(request, response, next) {
    var name = request.query.registration;

    var data = db.query('SELECT * FROM book WHERE ', (err, data) => {
        var formedTemplate = name;
        response.send(formedTemplate);
    });
    
}