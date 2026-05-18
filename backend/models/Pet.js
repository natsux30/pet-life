const mongoose = require('mongoose');

const petSchema = new mongoose.Schema({
  usuario: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true
  },
  nomePet: { type: String, required: true, minlength: 2 },
  tipo: {
    type: String,
    required: true,
    enum: ['cachorro', 'gato', 'ave', 'peixe', 'coelho', 'hamster', 'outro']
  },
  raca: { type: String, required: true },
  porte: {
    type: String,
    required: true,
    enum: ['mini', 'pequeno', 'medio', 'grande', 'gigante']
  },
  idade: { type: Number, required: true, min: 0, max: 30 },
  peso: { type: Number, required: true, min: 0.1, max: 100 },
  comportamento: { type: String, required: true },
  alergias: { type: String },
  observacoes: { type: String },
  dataCadastro: { type: Date, default: Date.now },
  ativo: { type: Boolean, default: true }
});

module.exports = mongoose.model('Pet', petSchema);