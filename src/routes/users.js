// Endpoints for external data
const { Router } = require('express');
const router = new Router();

const fetch = require('node-fetch');

// obteniendo data de pagina web externa desde un endpoint
router.get('/', async (req, res) => {
    const response = await fetch('https://jsonplaceholder.typicode.com/users');
    const data = await response.json();
    res.json(data); //respondiendo con un json
});

module.exports = router;