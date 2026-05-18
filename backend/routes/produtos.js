const express = require('express');
const router = express.Router();
const db = require('../config/db');

router.get('/', (req, res) => {
  let produtos = db.getAll('produtos');
  const { categoria, busca } = req.query;
  if (categoria && categoria !== 'todos') produtos = produtos.filter(p => p.categoria === categoria);
  if (busca) produtos = produtos.filter(p => p.titulo.toLowerCase().includes(busca.toLowerCase()));
  res.json({ produtos, total: produtos.length });
});

router.get('/:id', (req, res) => {
  const p = db.getById('produtos', req.params.id);
  p ? res.json(p) : res.status(404).json({ mensagem: 'Não encontrado' });
});

module.exports = router;