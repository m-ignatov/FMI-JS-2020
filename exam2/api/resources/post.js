const { Router } = require('express');
const fetch = require('node-fetch');

const router = Router();

router.get('/:id', (req, res, next) => {
  fetch(`http://jsonplaceholder.typicode.com/posts/${req.params.id}`)
    .then(data => data.json())
    .then(data => res.send(data));
});

module.exports = router;