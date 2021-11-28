# library-nav
2021 Gachon univeristy algorithm class term project

http://chromato99.com

This is a web service to shorten the search time to locate a book when using the Gachon University library.
Provides a function to inform you of the shortest path from the current location to the location of the book when searching for a book name. Also, if you make a typo when searching for a book name, similar book names are automatically suggested.


# Run on localhost
1) Download DB data https://www.data.go.kr/data/15071671/fileData.do 
2) Set MySQL server as you wnat and set db.template.js to db.js with your setting.
3) Run Server with Node.js
```
cd <project directory>
npm install
node server.js
```

# Tech Stack
[FE] HTML / CSS / Javascript<br>
[BE] Node.js<br>
[Database] MySql<br>
Book DB from https://www.data.go.kr/data/15071671/fileData.do 
