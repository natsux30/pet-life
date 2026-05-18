const jwt = require('jsonwebtoken');

module.exports = function(req, res, next) {
  const token = req.header('Authorization')?.replace('Bearer ', '');
  if (!token) return res.status(401).json({ mensagem: 'Acesso negado' });
  try {
    req.usuarioId = jwt.verify(token, process.env.JWT_SECRET || 'pets_secret').id;
    next();
  } catch {
    res.status(401).json({ mensagem: 'Token inválido' });
  }
};