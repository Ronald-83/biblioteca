var Produto = require('../models/produto');

// Display list of all Produtos
exports.produtos_list = function(req, res, next) {
  Produto.find({}, function(err, lista_produtos) {
    if (err) {
      return next(err);
    }
    res.render('produtos', { 
      title: 'Produtos', 
      produtos: lista_produtos 
    });
  });
};

// Display detail page for a specific Produto
exports.produto_detail = function(req, res, next) {
  var id = parseInt(req.params.id, 10);
  
  Produto.findById(id, function(err, produto) {
    if (err) {
      return next(err);
    }
    if (produto == null) {
      var err = new Error('Produto não encontrado');
      err.status = 404;
      return next(err);
    }
    res.render('produto', { 
      title: produto.nome, 
      produto: produto
    });
  });
};
