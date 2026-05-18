const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
const auth = require('../middleware/auth');

router.use(auth);

// POST /api/pedidos
router.post('/', (req, res) => {
  const numero = Math.floor(Math.random() * 900000) + 100000;
  
  const pedido = {
    id: uuidv4(),
    usuarioId: req.usuarioId,
    numero,
    itens: req.body.itens || [],
    enderecoEntrega: req.body.enderecoEntrega || {},
    formaPagamento: req.body.formaPagamento || 'pix',
    parcelas: req.body.parcelas || 1,
    subtotal: req.body.subtotal || 0,
    frete: req.body.frete || 0,
    desconto: req.body.desconto || 0,
    total: req.body.total || 0,
    status: 'confirmado',
    data: new Date().toISOString(),
    rastreio: {
      codigo: 'BR' + Date.now() + 'BR',
      status: 'Pedido confirmado',
      atualizacao: new Date().toISOString(),
      historico: [
        {
          data: new Date().toISOString(),
          status: 'Pedido confirmado',
          descricao: 'Seu pedido foi confirmado e está sendo processado.',
          local: 'Centro de Distribuição - São Paulo/SP'
        }
      ]
    }
  };

  db.insert('pedidos', pedido);
  res.status(201).json({ sucesso: true, pedido });
});

// GET /api/pedidos
router.get('/', (req, res) => {
  const pedidos = db.find('pedidos', p => p.usuarioId === req.usuarioId)
    .sort((a, b) => new Date(b.data) - new Date(a.data));
  res.json({ sucesso: true, pedidos });
});

// GET /api/pedidos/:numero
router.get('/:numero', (req, res) => {
  const pedido = db.find('pedidos', p => 
    p.numero === Number(req.params.numero) && p.usuarioId === req.usuarioId
  )[0];
  
  if (!pedido) {
    return res.status(404).json({ sucesso: false, mensagem: 'Pedido não encontrado' });
  }
  
  res.json({ sucesso: true, pedido });
});

module.exports = router;