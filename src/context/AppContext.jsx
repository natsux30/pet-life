import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [pets, setPets] = useState([]);
  const [carrinho, setCarrinho] = useState([]);
  const [avaliacoes, setAvaliacoes] = useState([]);

  // ========== Funções do Usuário ==========
  function loginUser(userData) {
    setUsuario(userData);
  }

  function logoutUser() {
    setUsuario(null);
    setPets([]);
    setCarrinho([]);
  }

  function atualizarUsuario(userData) {
    setUsuario(function(prev) {
      return { ...prev, ...userData };
    });
  }

  // ========== Funções dos Pets ==========
  function adicionarPet(petData) {
    const novoPet = {
      ...petData,
      id: Date.now(),
      dataCadastro: new Date().toLocaleDateString('pt-BR')
    };
    setPets(function(prev) {
      return [...prev, novoPet];
    });
  }

  function removerPet(petId) {
    setPets(function(prev) {
      return prev.filter(function(pet) {
        return pet.id !== petId;
      });
    });
  }

  // ========== Funções do Carrinho ==========
  function adicionarAoCarrinho(produto, quantidade) {
    setCarrinho(function(prev) {
      const itemExistente = prev.find(function(item) {
        return item.id === produto.id;
      });

      if (itemExistente) {
        return prev.map(function(item) {
          if (item.id === produto.id) {
            return {
              ...item,
              quantidade: item.quantidade + quantidade
            };
          }
          return item;
        });
      }

      return [...prev, {
        id: produto.id,
        title: produto.title,
        price: produto.price,
        image: produto.image,
        quantidade: quantidade,
        estoque: produto.estoque
      }];
    });
  }

  function removerDoCarrinho(produtoId) {
    setCarrinho(function(prev) {
      return prev.filter(function(item) {
        return item.id !== produtoId;
      });
    });
  }

  function atualizarQuantidade(produtoId, novaQuantidade) {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(produtoId);
      return;
    }

    setCarrinho(function(prev) {
      return prev.map(function(item) {
        if (item.id === produtoId) {
          return { ...item, quantidade: novaQuantidade };
        }
        return item;
      });
    });
  }

  function limparCarrinho() {
    setCarrinho([]);
  }

  function getTotalCarrinho() {
    return carrinho.reduce(function(total, item) {
      return total + (item.price * item.quantidade);
    }, 0);
  }

  function getQuantidadeItens() {
    return carrinho.reduce(function(total, item) {
      return total + item.quantidade;
    }, 0);
  }

  function getSubtotal() {
    return getTotalCarrinho();
  }

  function getFrete() {
    const total = getTotalCarrinho();
    if (total === 0) return 0;
    if (total >= 99) return 0; // Frete grátis acima de R$ 99
    return 19.90;
  }

  function getTotal() {
    return getSubtotal() + getFrete();
  }

  // ========== Funções de Avaliação ==========
  function adicionarAvaliacao(produtoId, avaliacao) {
    const novaAvaliacao = {
      id: Date.now(),
      produtoId: produtoId,
      usuarioId: usuario?.id,
      usuarioNome: usuario?.nome || 'Anônimo',
      nota: avaliacao.nota,
      titulo: avaliacao.titulo,
      comentario: avaliacao.comentario,
      data: new Date().toISOString(),
      util: 0,
      usuariosQueMarcaramUtil: []
    };
    setAvaliacoes(function(prev) {
      return [...prev, novaAvaliacao];
    });
    return novaAvaliacao;
  }

  function marcarUtil(avaliacaoId) {
    if (!usuario) return;
    setAvaliacoes(function(prev) {
      return prev.map(function(avaliacao) {
        if (avaliacao.id === avaliacaoId) {
          const jaMarcou = avaliacao.usuariosQueMarcaramUtil.includes(usuario.id);
          return {
            ...avaliacao,
            util: jaMarcou ? avaliacao.util - 1 : avaliacao.util + 1,
            usuariosQueMarcaramUtil: jaMarcou
              ? avaliacao.usuariosQueMarcaramUtil.filter(function(id) { return id !== usuario.id; })
              : [...avaliacao.usuariosQueMarcaramUtil, usuario.id]
          };
        }
        return avaliacao;
      });
    });
  }

  function getAvaliacoesPorProduto(produtoId) {
    return avaliacoes.filter(function(a) {
      return a.produtoId === produtoId;
    });
  }

  function getMediaAvaliacoes(produtoId) {
    const produtoAvaliacoes = getAvaliacoesPorProduto(produtoId);
    if (produtoAvaliacoes.length === 0) return 0;
    const soma = produtoAvaliacoes.reduce(function(total, a) {
      return total + a.nota;
    }, 0);
    return (soma / produtoAvaliacoes.length).toFixed(1);
  }

  function getDistribuicaoNotas(produtoId) {
    const produtoAvaliacoes = getAvaliacoesPorProduto(produtoId);
    const distribuicao = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    produtoAvaliacoes.forEach(function(a) {
      distribuicao[a.nota] = (distribuicao[a.nota] || 0) + 1;
    });
    return distribuicao;
  }

  function verificarUsuarioAvaliou(produtoId) {
    if (!usuario) return false;
    return avaliacoes.some(function(a) {
      return a.produtoId === produtoId && a.usuarioId === usuario.id;
    });
  }

  return (
    <AppContext.Provider value={{
      // Usuário
      usuario,
      loginUser,
      logoutUser,
      atualizarUsuario,
      
      // Pets
      pets,
      adicionarPet,
      removerPet,
      
      // Carrinho
      carrinho,
      adicionarAoCarrinho,
      removerDoCarrinho,
      atualizarQuantidade,
      limparCarrinho,
      getTotalCarrinho,
      getQuantidadeItens,
      getSubtotal,
      getFrete,
      getTotal,
      
      // Avaliações
      avaliacoes,
      adicionarAvaliacao,
      marcarUtil,
      getAvaliacoesPorProduto,
      getMediaAvaliacoes,
      getDistribuicaoNotas,
      verificarUsuarioAvaliou
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
}