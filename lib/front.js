const template = require('./template.js');
var fs = require('fs');
const sanitizeHtml = require('sanitize-html');

function getList(arr) {
    var list = "<ul>"; 
    for (var i=0; i < arr.length; i++) {  
        list += "<li>" + arr[i] + "<span class='close' id=" + i + ">X</span></li>"; 
    }
    list += "</ul>";
    return list;
}

function getMin(n1,n2,n3) {
    var minN=n1;
    if(minN>n2)
    minN=n2;
    if(minN>n3)
    minN=n3;

    return minN;
}

function editDistance(s,t) {
    var m = s.length-1;
    var n = t.length;
    var d = new Array(m+1);
    for(var i=0; i<d.length; i++)
    {
        d[i]=new Array(n+1);
    }
    d[0][0]=0;
    for(var i=1; i<m; i++)
    {
        d[i][0]=i;
    }
    for( var j =1; j<n; j++)
    {
        d[0][j]=j;
    }

    for(var j=1; j<=n; j++)
    {
        for(var i=1; i<=m; i++)
        {
            if(s[i]==t[j])
            {
                d[i][j]=d[i-1][j-1];
            }
            else
            {
                d[i][j]=getMin(d[i-1][j],d[i][j-1],d[i-1][j-1])+1;
            }
        }

    }
    
    return d[m-1][n-1];
}




exports.home = function(request, response, next){
    

    var formedTemplate = template.html('','',''
    );
    response.send(formedTemplate);
}

exports.search = function(request, response, next) {
    var search_word = request.query.item;
    var resultList = new Array();
    var data = fs.readFile('./data/word.txt', 'utf8', function (err, data) {
        if(err) {return err;}
        dataArr = data.split('\n');

        for(var i=0; i<dataArr.length-1; i++) {
            var word = dataArr[i];
            var result = editDistance(word,search_word);
            
            if((result == 1) || (result == 0))
            {
                resultList.push(dataArr[i]);
            }
        }

        var list = getList(resultList);
        var formedTemplate = template.html('', list,'');
        response.send(formedTemplate);
    });
}