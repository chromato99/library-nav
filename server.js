const express = require('express');
const compression = require('compression');
const libraryInfo = require('./src/library-nav-info.js');
const librarySearch = require('./src/library-nav-search.js');
const mysql = require('mysql');
const db_config = require('./src/db-config.js');

const app = express(); // Initialize the express module
const port = 80 // Port number setting


const start_position = { // Starting location on the map
    x: 5,
    y: 15
}

app.set('views', __dirname + '/views'); // Initialize ejs moudule location
app.set('view engine', 'ejs'); // Initiallize ejs render engine
app.use(express.static('public')); // Initialize static file location

app.use(compression()); // Compression middleware to save data (functionally negligible)


app.use(express.urlencoded({ extended: false})); // url encoding

app.get('/', (req, res) => { // Default entry point
    console.log('From : ', req.ip);
    console.log(req.headers);
    res.render('index', {data: []}); // Create a basic template without any settings
});

app.get('/search', (req, res, next) => { // Entry point with searching
    let search_word = req.query.item || ''; // Extracts search word from query statements entered through http get method
    console.log('From : ', req.ip);
    console.log(req.headers);
    if(search_word == '') {
        res.render('index', {data: []});
    } else {
        let db = mysql.createConnection(db_config);
        db.connect();
        librarySearch.searchBook(search_word, res, db, next);
    }
});

app.get('/info/:registration', (req, res, next) => { // Book information entry point
    let registration = req.params.registration;
    console.log('From : ', req.ip);
    console.log(req.headers);
    let db = mysql.createConnection(db_config);
    db.connect();
    libraryInfo.getBookInfo(registration, start_position, res, db, next);
});


app.use((req, res) => { // wrong access
    res.status(404).send('404 error');
});
app.use((err, req, res) => { // Page broken error
    console.log(err);
    res.status(500).send('Broken Page');
});
app.listen(port, () => { // Opening port
    console.log(`Example app listening at http://localhost:${port}`);
});