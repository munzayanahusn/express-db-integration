var express = require('express');
var router = express.Router();
var pool = require('./db/db-connect.js');

router.get('/films', function(req, res) {
    pool.query('SELECT * FROM film', (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    })
});

router.get('/films/:id', function(req, res) {
    pool.query('SELECT * FROM film WHERE film_id = $1', [req.params.id], (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    })
})

router.get('/categories', function(req, res){
    pool.query('SELECT * FROM category', (err, result) => {
        if (err) {
            throw err;
        }
        res.status(200).json(result.rows);
    })
})

router.get('/films-by-category/:category', function(req, res) {
    const category = req.params.category;
    pool.query('SELECT film.title, category.name as category, film.description FROM film JOIN film_category ON film.film_id = film_category.film_id JOIN category ON film_category.category_id = category.category_id WHERE category.name = $1', [category], (err, result) => {
        if (err) {
            console.error('Error executing query', err);
            res.status(500).send('Error executing query');
            return;
        }
        res.status(200).json(result.rows);
    });
});

module.exports = router;