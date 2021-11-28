# library-nav
2021 Gachon univeristy algorithm class term project<br>
This is a service for the experimental implementation of the edit distance algorithm and the dijkstra algorithm.

http://chromato99.com

This is a web service to shorten the search time to locate a book when using the Gachon University library.

Provides a function with 'Dijkstra' algorithm to inform you of the shortest path from the current location to the location of the book when searching for a book name. <br>
Also, if you make a typo when searching for a book name, similar book names are automatically suggested by using 'Edit Distance' algorithm.

Currently, there is no Gachon University library DB, so the Gangnam-gu smart library DB is being used temporarily.

<Example Screenshots>
![Screenshot from 2021-11-29 02-05-57](https://user-images.githubusercontent.com/20539422/143778363-8e89e173-0a47-4c1f-ba5c-cae9a1b979e5.png)
![Screenshot from 2021-11-29 02-06-50](https://user-images.githubusercontent.com/20539422/143778382-c46bdba5-11b5-46a6-b2e3-d452f7b1b7ca.png)
![Screenshot from 2021-11-29 02-07-13](https://user-images.githubusercontent.com/20539422/143778388-95ede539-f26e-4951-9ca1-377f99a8be05.png)

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
