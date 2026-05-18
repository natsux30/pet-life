import React, { createContext, useContext, useState } from "react";
import api from "../services/api";

const AppContext = createContext();

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [pets, setPets] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [cupom, setCupom] = useState("");
  const [desconto, setDesconto] = useState(0);
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const [produtos, setProdutos] = useState([]);

  // ========== Funções do Usuário ==========
  async function loginUser(email, senha) {
    const data = await api.login(email, senha);
    if (data.sucesso) {
      setUsuario(data.usuario);
      localStorage.setItem("token", data.token);
      // Carregar pets do usuário
      carregarPets();
      // Carregar pedidos do usuário
      carregarPedidos();
      return { sucesso: true };
    }
    return { sucesso: false, mensagem: data.mensagem };
  }

  async function cadastrarUsuario(dados) {
    const data = await api.cadastro(dados);
    if (data.sucesso) {
      setUsuario(data.usuario);
      localStorage.setItem("token", data.token);
      return { sucesso: true };
    }
    return { sucesso: false, mensagem: data.mensagem };
  }

  function logoutUser() {
    setUsuario(null);
    setPets([]);
    setCarrinho([]);
    setPedidos([]);
    localStorage.removeItem("token");
  }

  // ========== Funções dos Pets ==========
  async function carregarPets() {
    const data = await api.getPets();
    if (data.sucesso) {
      setPets(data.pets);
    }
  }

  async function adicionarPet(petData) {
    const data = await api.addPet(petData);
    console.log("Resposta API pet:", data); // Debug
    if (data && data.id) {
      setPets((prev) => [...prev, data]);
      return { sucesso: true };
    }
    return { sucesso: false };
  }

  async function removerPet(petId) {
    const data = await api.deletePet(petId);
    if (data.sucesso) {
      setPets((prev) => prev.filter((p) => p.id !== petId));
    }
  }
  // ========== Funções dos Produtos ==========
  async function carregarProdutos() {
    const data = await api.getProdutos();
    if (data.produtos) {
      setProdutos(data.produtos);
    }
  }

  // ========== Funções do Carrinho ==========
  function adicionarAoCarrinho(produto, quantidade) {
    setCarrinho(function (prev) {
      const itemExistente = prev.find(function (item) {
        return item.id === produto.id;
      });

      if (itemExistente) {
        return prev.map(function (item) {
          if (item.id === produto.id) {
            return { ...item, quantidade: item.quantidade + quantidade };
          }
          return item;
        });
      }

      return [
        ...prev,
        {
          id: produto.id,
          title: produto.titulo || produto.title,
          price: produto.preco || produto.price,
          image: produto.imagens?.[0]?.url || produto.image,
          quantidade: quantidade,
          estoque: produto.estoque,
        },
      ];
    });
  }

  function removerDoCarrinho(produtoId) {
    setCarrinho((prev) => prev.filter((item) => item.id !== produtoId));
  }

  function atualizarQuantidade(produtoId, novaQuantidade) {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(produtoId);
      return;
    }
    setCarrinho((prev) =>
      prev.map((item) =>
        item.id === produtoId ? { ...item, quantidade: novaQuantidade } : item,
      ),
    );
  }

  function limparCarrinho() {
    setCarrinho([]);
  }
  function getTotalCarrinho() {
    return carrinho.reduce((t, i) => t + i.price * i.quantidade, 0);
  }
  function getQuantidadeItens() {
    return carrinho.reduce((t, i) => t + i.quantidade, 0);
  }
  function getSubtotal() {
    return getTotalCarrinho();
  }
  function getFrete() {
    const t = getTotalCarrinho();
    return t === 0 ? 0 : t >= 99 ? 0 : 19.9;
  }
  function getTotal() {
    return getSubtotal() + getFrete();
  }

  // ========== Cupom ==========
  function aplicarCupom(codigo, subtotal, frete) {
    const cupons = {
      PET10: 10,
      PET20: 20,
      BOASVINDAS: 15,
      FRETEGRATIS: "frete",
    };
    const valor = cupons[codigo.toUpperCase().trim()];
    if (!valor) return { sucesso: false, mensagem: "Cupom inválido" };
    const desc = valor === "frete" ? frete : (subtotal * valor) / 100;
    setCupom(codigo);
    setDesconto(desc);
    setCupomAplicado(true);
    return { sucesso: true, mensagem: `Cupom aplicado!` };
  }

  function removerCupom() {
    setCupom("");
    setDesconto(0);
    setCupomAplicado(false);
  }

  // ========== Pedidos ==========
  async function carregarPedidos() {
    const data = await api.getPedidos();
    if (data.sucesso) setPedidos(data.pedidos);
  }

  async function criarPedido(dadosPedido) {
    const data = await api.criarPedido(dadosPedido);
    if (data.sucesso) {
      setPedidos((prev) => [data.pedido, ...prev]);
      return data.pedido;
    }
    return null;
  }

  return (
    <AppContext.Provider
      value={{
        usuario,
        pets,
        carrinho,
        pedidos,
        avaliacoes,
        cupom,
        desconto,
        cupomAplicado,
        loginUser,
        cadastrarUsuario,
        logoutUser,
        adicionarPet,
        removerPet,
        carregarPets,
        produtos,
        carregarProdutos,
        adicionarAoCarrinho,
        removerDoCarrinho,
        atualizarQuantidade,
        limparCarrinho,
        getTotalCarrinho,
        getQuantidadeItens,
        getSubtotal,
        getFrete,
        getTotal,
        aplicarCupom,
        removerCupom,
        criarPedido,
        carregarPedidos,
        getPedidosUsuario: () => pedidos,
        getPedidoPorNumero: (n) => pedidos.find((p) => p.numero === Number(n)),
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  return useContext(AppContext);
}
