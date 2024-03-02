var express = require('express');
var app = express();
var router = require('./router.js');
var pool = require('./db/db-connect.js');

app.use(express.json());
app.use('/', router);

pool.connect((err, res) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Connected to the database");
});

app.listen(3000);