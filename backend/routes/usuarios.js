const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const db = require("../config/db");
const auth = require("../middleware/auth");

// POST /api/usuarios/cadastro
router.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, senha, telefone, cep, endereco, numero, complemento } =
      req.body;

    // Verificar se email já existe
    const usuarios = db.getAll("usuarios");
    const existe = usuarios.find((u) => u.email === email);
    if (existe) {
      return res
        .status(400)
        .json({ sucesso: false, mensagem: "Email já cadastrado" });
    }

    const senhaHash = await bcrypt.hash(senha, 10);

    const usuario = {
      id: uuidv4(),
      nome,
      email,
      senha: senhaHash,
      telefone,
      cep,
      endereco,
      numero,
      complemento: complemento || "",
      dataCadastro: new Date().toISOString(),
    };

    db.insert("usuarios", usuario);

    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET || "pets_secret",
      { expiresIn: "7d" },
    );
    const { senha: _, ...usuarioSemSenha } = usuario;

    res.status(201).json({ sucesso: true, token, usuario: usuarioSemSenha });
  } catch (err) {
    res.status(500).json({ sucesso: false, mensagem: err.message });
  }
});

// POST /api/usuarios/login
router.post("/login", async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuarios = db.getAll("usuarios");
    const usuario = usuarios.find((u) => u.email === email);

    if (!usuario) {
      return res
        .status(401)
        .json({ sucesso: false, mensagem: "Email ou senha inválidos" });
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      return res
        .status(401)
        .json({ sucesso: false, mensagem: "Email ou senha inválidos" });
    }

    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET || "pets_secret",
      { expiresIn: "7d" },
    );
    const { senha: _, ...usuarioSemSenha } = usuario;

    res.json({ sucesso: true, token, usuario: usuarioSemSenha });
  } catch (err) {
    res.status(500).json({ sucesso: false, mensagem: "Erro no servidor" });
  }
});

// GET /api/usuarios/perfil
router.get("/perfil", auth, (req, res) => {
  const usuario = db.getById("usuarios", req.usuarioId);
  if (!usuario)
    return res.status(404).json({ mensagem: "Usuário não encontrado" });
  const { senha: _, ...usuarioSemSenha } = usuario;
  res.json(usuarioSemSenha);
});

module.exports = router;
