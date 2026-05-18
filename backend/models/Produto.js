const mongoose = require('mongoose');

const produtoSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  preco: { type: Number, required: true },
  descricaoCurta: { type: String, required: true },
  descricaoCompleta: { type: String, required: true },
  categoria: { type: String, required: true, enum: ['caes', 'gatos', 'outros'] },
  porteIndicado: { type: String, required: true, enum: ['mini', 'pequeno', 'medio', 'grande', 'gigante'] },
  idadeIndicada: { type: String, required: true, enum: ['filhote', 'adulto', 'idoso'] },
  material: { type: String, required: true },
  finalidade: { type: String, required: true },
  destaque: { type: Boolean, default: false },
  estoque: { type: Number, default: 0 },
  avaliacaoMedia: { type: Number, default: 0 },
  numAvaliacoes: { type: Number, default: 0 },
  dimensoes: String,
  pesoProduto: String,
  garantia: String,
  origem: { type: String, default: 'Brasil' },
  imagens: [{ url: String, ordem: Number, principal: Boolean }],
  comportamentosIndicados: [String],
  contraindicadoAlergias: [String],
  palavrasChave: [String],
  ativo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Produto', produtoSchema);