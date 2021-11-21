const express = require('express');
const ejs = require('ejs');
const compression = require('compression');
const search_page = require('./lib/search-page.js');
var parseurl = require('parseurl');

const app = express();
const port = 80

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.use(express.static('public'));

app.use(compression());


app.use(express.urlencoded({ extended: false}));

app.get('/', (req, res, next) => {
    search_page.home(req, res, next);
});

app.get('/search', (req, res, next) => {
    search_page.search(req, res, next);
});

app.get('/info/:registration', (req, res, next) => {
    search_page.info(req, res, next);
});


app.use((req, res, next) => {
    res.status(404).send('404 error');
});
app.use((err, req, res, next) => {
    console.log(err);
    res.status(500).send('Broken Page');
});
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});