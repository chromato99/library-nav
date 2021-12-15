# library-nav
2021 Gachon university algorithm class term project<br>
This is a service for the experimental implementation of the Edit Distance Algorithm and the Dijkstra Algorithm.

Page for testing : http://chromato99.com (Currently Closed)

# Description
This is a web service to shorten the search time to locate a book when using the Gachon University library.

Provides a function with 'Dijkstra' algorithm to inform you of the shortest path from the current location to the location of the book when searching for a book name. 
Also, if you make a typo when searching for a book name, similar book names are automatically suggested by using 'Edit Distance' algorithm.

*Currently, there is no Gachon University library DB, so the Gangnam-gu smart library DB is being used temporarily.<br>
&nbsp;(But the Gangnam-gu smart library DB is not complete, so some data may work unstable.)

- Example Screenshots
<img src="https://user-images.githubusercontent.com/20539422/143778625-0500e8e7-f3de-4149-b7f9-4acc3b135dc6.png"  width="70%" height="70%"/>
<img src="https://user-images.githubusercontent.com/20539422/143778641-0750cd6d-509e-481c-8f27-75ae95e8fb26.png"  width="70%" height="70%"/>
<img src="https://user-images.githubusercontent.com/20539422/143778648-3e728bcf-774a-4a42-8b09-1c0d84807b0c.png"  width="70%" height="70%"/>

# Project Structure
<img src="https://user-images.githubusercontent.com/20539422/145703747-c5aaf101-ecaa-442a-88e7-04a99707da77.png"  width="35%" height="35%"/>

server.js : Main execution of this service

/public : A folder for static files, including image files, CSS, etc.<br>
&nbsp;&nbsp;&nbsp;&nbsp;/css : CSS files<br>
&nbsp;&nbsp;&nbsp;&nbsp;/img : Image files<br>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;library_map.jpg : Image of library map.

/src : Source code of library-nav modules.<br>
&nbsp;&nbsp;&nbsp;&nbsp;library-nav-search.js : A collection of functions used for searching library books.<br>
&nbsp;&nbsp;&nbsp;&nbsp;library-nav-info.js : A collection of functions that give information about a book and its location.<br>
&nbsp;&nbsp;&nbsp;&nbsp;library-map-node.js : Data of library map.<br>
&nbsp;&nbsp;&nbsp;&nbsp;db.template.js : Configuration file of DB connection (Should be rename to db-config.js)

/views : Frontend ejs template directory.<br>
&nbsp;&nbsp;&nbsp;&nbsp;index.ejs : First main screen and search result output.<br>
&nbsp;&nbsp;&nbsp;&nbsp;info.ejs : Book information and map output.
 
# Run on localhost
1) Download DB data from https://www.data.go.kr/data/15071671/fileData.do or your own DB.
2) Set MySQL server and table structure as below. (If you want to use different table structure, you need to edit source code)
<img src="https://user-images.githubusercontent.com/20539422/143809094-e616ca9a-2276-4fae-a8ad-b5289775933a.png"  width="65%" height="65%"/>

3) Import Database as below.
```
LOAD DATA LOCAL INFILE '<data file directory>/library.csv' INTO TABLE book FIELDS TERMINATED BY ',';
```
4) Rename db.template.js to db-config.js and set with your db configuration.
```javascript
var db = mysql.createConnection({
    host:'example.com',
    user:'example',
    password:'password',
    database:'library'
});
```

5) Run Server with Node.js
```
cd <project directory>
npm install
node server.js
```

# Tech Stack
[FE] HTML / CSS / Javascript<br>
[BE] Node.js, Express, PM2<br>
[Database] MySQL<br>
Testing DB from https://www.data.go.kr/data/15071671/fileData.do 
