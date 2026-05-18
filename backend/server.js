const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/pets', require('./routes/pets'));
app.use('/api/produtos', require('./routes/produtos'));
app.use('/api/pedidos', require('./routes/pedidos'));

app.listen(process.env.PORT || 5000, () => {
  console.log('🚀 Servidor rodando em http://localhost:5000');
  console.log('📁 Banco: data/db.json');
});