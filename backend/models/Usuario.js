const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');
const db = require('../config/db');
const auth = require('../middleware/auth');

router.post('/cadastro', async (req, res) => {
  try {
    const { nome, email, senha, telefone, cep, endereco, numero, complemento } = req.body;
    
    if (db.find('usuarios', u => u.email === email).length > 0) {
      return res.status(400).json({ sucesso: false, mensagem: 'Email já cadastrado' });
    }

    const usuario = {
      id: uuidv4(),
      nome, email,
      senha: await bcrypt.hash(senha, 10),
      telefone, cep, endereco, numero,
      complemento: complemento || '',
      dataCadastro: new Date().toISOString()
    };

    db.insert('usuarios', usuario);
    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET || 'pets_secret', { expiresIn: '7d' });
    const { senha: _, ...userData } = usuario;

    res.status(201).json({ sucesso: true, token, usuario: userData });
  } catch (err) {
    res.status(500).json({ sucesso: false, mensagem: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = db.find('usuarios', u => u.email === email)[0];

    if (!usuario || !(await bcrypt.compare(senha, usuario.senha))) {
      return res.status(401).json({ sucesso: false, mensagem: 'Email ou senha inválidos' });
    }

    const token = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET || 'pets_secret', { expiresIn: '7d' });
    const { senha: _, ...userData } = usuario;

    res.json({ sucesso: true, token, usuario: userData });
  } catch (err) {
    res.status(500).json({ sucesso: false, mensagem: 'Erro no servidor' });
  }
});

router.get('/perfil', auth, (req, res) => {
  const usuario = db.getById('usuarios', req.usuarioId);
  if (!usuario) return res.status(404).json({ mensagem: 'Não encontrado' });
  const { senha: _, ...userData } = usuario;
  res.json(userData);
});

module.exports = router;