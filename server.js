const express = require('express');
const ejs = require('ejs');
const compression = require('compression');
const sanitizeHtml = require('sanitize-html');
const libraryInfo = require('./lib/library-nav-info.js');
const librarySearch = require('./lib/library-nav-search.js');

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

app.get('/', (req, res, next) => { // Default entry point
    res.render('index', {data: []}); // Create a basic template without any settings
});

app.get('/search', (req, res, next) => { // Entry point with searching
    let search_word = req.query.item || ''; // Extracts search word from query statements entered through http get method
    if(search_word == '') {
        res.render('index', {data: []});
    } else {
        librarySearch.searchBook(search_word, res, next);
    }
});

app.get('/info/:registration', (req, res, next) => { // Book information entry point
    let registration = req.params.registration;
    libraryInfo.getBookInfo(registration, start_position, res, next);
});


app.use((req, res, next) => { // wrong access
    res.status(404).send('404 error');
});
app.use((err, req, res, next) => { // Page broken error
    console.log(err);
    res.status(500).send('Broken Page');
});
app.listen(port, () => { // Opening port
    console.log(`Example app listening at http://localhost:${port}`);
});