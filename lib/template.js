var sanitizeHtml = require('sanitize-html');

module.exports = {
    html:function(title, list, body){
        return `
        <!doctype html>
        <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width">
            <title>Gachon Univ. Library Serach Engine</title>
            <link rel="stylesheet" href="css/input.css">
            <link rel="stylesheet" href="css/list.css">
        </head>
        <body>
            <div id="wrapper">
                <h2>Gachon Univ. Library Serach Engine</h2>
                <form action="/search" method="get">
                    <input type="text" id="item" name="item" autofocus="true">
                    <input type="submit" value="검색">
                </form>
                <div id="itemList">
                ${list}
                </div>
            </div>

            <script src="js/searchEngine.js"></script>
        </html>
        `;
    },
    list:function(topics) {
        var list = '';
        list = `<ul>`;
        for (var i = 0; i < topics.length; i++) {
            list = list + `<li><a href="/page/${topics[i].id}">${sanitizeHtml(topics[i].title)}</a></li>`;
            
        }
        list = list + `</ul>`;
        return list;
    }
}
