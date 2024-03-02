var pool = require('./db-connect.js');
var fs = require('fs');

const seedQuery = fs.readFileSync('./db/seeding.sql', { encoding: 'utf-8'});
pool.query(seedQuery, (err, result) => {
    if (err) {
        console.log(err);
        return;
    }
    console.log("Seeding completed");
    pool.end();
});