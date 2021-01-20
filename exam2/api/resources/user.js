const { Router } = require('express');
const http = require('http');
const fetch = require('node-fetch');

const router = Router();

router.get('/', (req, res, next) => {
  fetch('http://jsonplaceholder.typicode.com/users')
    .then(data => data.json())
    .then(data => res.send(data));
});

router.get('/:id', (req, res, next) => {
  fetch(`http://jsonplaceholder.typicode.com/users/${req.params.id}`)
    .then(data => data.json())
    .then(data => res.send(data));
});

module.exports = router;