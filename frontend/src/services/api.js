const API_URL = 'http://localhost:5000/api';

const api = {
  // Usuários
  login: async (email, senha) => {
    const res = await fetch(`${API_URL}/usuarios/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha })
    });
    return res.json();
  },

  cadastro: async (dados) => {
    const res = await fetch(`${API_URL}/usuarios/cadastro`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(dados)
    });
    return res.json();
  },

  // Pets
  getPets: async () => {
    const res = await fetch(`${API_URL}/pets`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return res.json();
  },

  addPet: async (pet) => {
    const res = await fetch(`${API_URL}/pets`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(pet)
    });
    return res.json();
  },

  deletePet: async (id) => {
    const res = await fetch(`${API_URL}/pets/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return res.json();
  },

  // Produtos
  getProdutos: async (filtros = {}) => {
    const params = new URLSearchParams(filtros).toString();
    const res = await fetch(`${API_URL}/produtos?${params}`);
    return res.json();
  },

  getProduto: async (id) => {
    const res = await fetch(`${API_URL}/produtos/${id}`);
    return res.json();
  },

  // Pedidos
  criarPedido: async (pedido) => {
    const res = await fetch(`${API_URL}/pedidos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      },
      body: JSON.stringify(pedido)
    });
    return res.json();
  },

  getPedidos: async () => {
    const res = await fetch(`${API_URL}/pedidos`, {
      headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
    });
    return res.json();
  }
};

export default api;