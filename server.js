const express = require('express');
const compression = require('compression');
const front = require('./lib/front.js');
var helmet = require('helmet');
var parseurl = require('parseurl');
var flash = require('connect-flash');

const app = express();
const port = 80

app.use(helmet());
app.use(compression());
app.use(express.static('public'));

app.use(flash());

app.use(express.urlencoded({ extended: false}));

const res = require('express/lib/response');

app.get('/', (req, res, next) => {
    front.home(req, res, next);
});

app.get('/search', (req, res, next) => {
    front.search(req, res, next);
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