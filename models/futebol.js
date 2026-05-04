var mongoose = require('mongoose');

var FutebolSchema = new mongoose.Schema(
  {
    nome: { type: String, required: true },
    icon: { type: String },
    descricao: { type: String },
    tipo: { type: String, enum: ['competicao', 'jogador'] }
  }
);

FutebolSchema.virtual('url').get(function() {
  return '/ejs/futebol/' + this._id;
});

var Futebol = mongoose.model('Futebol', FutebolSchema);

Futebol.getCompetitions = function(callback) {
  const competicoes = [
    { nome: 'Campeonato Brasileiro', icon: '🏆', descricao: 'O principal campeonato de futebol do Brasil.' },
    { nome: 'Copa do Mundo', icon: '🌍', descricao: 'O maior torneio internacional de futebol.' },
    { nome: 'Libertadores', icon: '⚽', descricao: 'A competição continental da América do Sul.' },
    { nome: 'Champions League', icon: '⭐', descricao: 'O torneio de clubes mais prestigiado da Europa.' }
  ];
  callback(null, competicoes);
};

Futebol.getJogadores = function(callback) {
  const jogadores = [
    { nome: 'Pelé', icon: '👑', descricao: 'Lenda do futebol brasileiro.' },
    { nome: 'Messi', icon: '🐐', descricao: 'Jogador argentino, considerado um dos melhores.' },
    { nome: 'Cristiano Ronaldo', icon: '🔥', descricao: 'Estrela portuguesa de clubes europeus.' },
    { nome: 'Neymar', icon: '⚡', descricao: 'Atacante brasileiro, criativo e habilidoso.' }
  ];
  callback(null, jogadores);
};

module.exports = Futebol;
