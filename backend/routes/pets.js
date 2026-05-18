const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
const auth = require('../middleware/auth');

router.use(auth);

router.get('/', (req, res) => {
  res.json(db.find('pets', p => p.usuarioId === req.usuarioId));
});

router.post('/', (req, res) => {
  const pet = { id: uuidv4(), usuarioId: req.usuarioId, ...req.body, dataCadastro: new Date().toISOString() };
  res.status(201).json(db.insert('pets', pet));
});

router.delete('/:id', (req, res) => {
  const pet = db.getById('pets', req.params.id);
  if (!pet || pet.usuarioId !== req.usuarioId) return res.status(404).json({ mensagem: 'Não encontrado' });
  db.delete('pets', req.params.id);
  res.json({ sucesso: true });
});

module.exports = router;