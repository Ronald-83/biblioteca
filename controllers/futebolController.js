var Futebol = require('../models/futebol');

// Display list of all Futebol competitions
exports.futebol_list = function(req, res, next) {
  Futebol.getCompetitions(function(err, lista_competicoes) {
    if (err) {
      return next(err);
    }
    res.render('futebol', { 
      title: 'Futebol', 
      itens: lista_competicoes
    });
  });
};

// Display list of jogadores
exports.futebol_jogadores = function(req, res, next) {
  Futebol.getJogadores(function(err, lista_jogadores) {
    if (err) {
      return next(err);
    }
    res.render('jogadores', { 
      title: 'Jogadores', 
      jogadores: lista_jogadores
    });
  });
};
