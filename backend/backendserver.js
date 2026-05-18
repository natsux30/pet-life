const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Conectar ao MongoDB
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/pets-lifestyle')
  .then(() => console.log('MongoDB conectado'))
  .catch(err => console.error('Erro MongoDB:', err));

// Rotas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/produtos', require('./routes/produtos'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/pedidos', require('./routes/pedidos'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));