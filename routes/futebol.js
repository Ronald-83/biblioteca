var express = require('express');
var router = express.Router();
var futebolController = require('../controllers/futebolController');

/* GET futebol page. */
router.get('/', futebolController.futebol_list);

/* GET jogadores sub-page. */
router.get('/jogadores', futebolController.futebol_jogadores);

module.exports = router;
