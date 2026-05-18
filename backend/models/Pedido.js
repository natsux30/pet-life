const mongoose = require('mongoose');

const pedidoSchema = new mongoose.Schema({
  usuario: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
  numero: { type: Number, unique: true, required: true },
  status: {
    type: String,
    enum: ['confirmado', 'separacao', 'embalado', 'enviado', 'transito', 'saiu_entrega', 'entregue'],
    default: 'confirmado'
  },
  itens: [{
    produto: { type: mongoose.Schema.Types.ObjectId, ref: 'Produto' },
    quantidade: Number,
    precoUnitario: Number
  }],
  enderecoEntrega: {
    cep: String, rua: String, numero: String,
    complemento: String, bairro: String, cidade: String, estado: String
  },
  formaPagamento: { type: String, enum: ['pix', 'credito', 'debito', 'boleto'], required: true },
  parcelas: { type: Number, default: 1 },
  subtotal: Number,
  frete: Number,
  desconto: Number,
  total: Number,
  rastreio: {
    codigo: String,
    status: String,
    historico: [{
      data: { type: Date, default: Date.now },
      status: String,
      descricao: String,
      local: String
    }]
  },
  data: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Pedido', pedidoSchema);