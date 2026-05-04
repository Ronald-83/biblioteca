var express = require('express');
var router = express.Router();
var produtoController = require('../controllers/produtoController');

/* GET produtos page. */
router.get('/', produtoController.produtos_list);

/* GET detalhes do produto por id */
router.get('/detalhes/:id', produtoController.produto_detail);

module.exports = router;
