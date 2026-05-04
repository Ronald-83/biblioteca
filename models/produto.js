var mongoose = require('mongoose');

var ProdutoSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    icon: { type: String },
    descricao: { type: String }
  }
);

ProdutoSchema.virtual('url').get(function() {
  return '/ejs/produtos/detalhes/' + this._id;
});

module.exports = mongoose.model('Produto', ProdutoSchema);
