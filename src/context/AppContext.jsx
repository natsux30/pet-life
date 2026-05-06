import React, { createContext, useContext, useState } from "react";

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
    setUsuario(function (prev) {
      return { ...prev, ...userData };
    });
  }

  // ========== Funções dos Pets ==========
  function adicionarPet(petData) {
    const novoPet = {
      ...petData,
      id: Date.now(),
      dataCadastro: new Date().toLocaleDateString("pt-BR"),
    };
    setPets(function (prev) {
      return [...prev, novoPet];
    });
  }

  function removerPet(petId) {
    setPets(function (prev) {
      return prev.filter(function (pet) {
        return pet.id !== petId;
      });
    });
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
            return {
              ...item,
              quantidade: item.quantidade + quantidade,
            };
          }
          return item;
        });
      }

      return [
        ...prev,
        {
          id: produto.id,
          title: produto.title,
          price: produto.price,
          image: produto.image,
          quantidade: quantidade,
          estoque: produto.estoque,
        },
      ];
    });
  }

  function removerDoCarrinho(produtoId) {
    setCarrinho(function (prev) {
      return prev.filter(function (item) {
        return item.id !== produtoId;
      });
    });
  }

  function atualizarQuantidade(produtoId, novaQuantidade) {
    if (novaQuantidade <= 0) {
      removerDoCarrinho(produtoId);
      return;
    }

    setCarrinho(function (prev) {
      return prev.map(function (item) {
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
    return carrinho.reduce(function (total, item) {
      return total + item.price * item.quantidade;
    }, 0);
  }

  function getQuantidadeItens() {
    return carrinho.reduce(function (total, item) {
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
    return 19.9;
  }

  function getTotal() {
    return getSubtotal() + getFrete();
  }
  //===========APLICAR CUPOM==========
  function aplicarCupom(codigo, subtotal, frete) {
    const cupons = {
      PET10: 10,
      PET20: 20,
      BOASVINDAS: 15,
      FRETEGRATIS: "frete",
    };

    const cupomUpper = codigo.toUpperCase().trim();
    const valorCupom = cupons[cupomUpper];

    if (!valorCupom) {
      return { sucesso: false, mensagem: "Cupom inválido" };
    }

    let valorDesconto = 0;

    if (valorCupom === "frete") {
      valorDesconto = frete;
    } else {
      valorDesconto = (subtotal * valorCupom) / 100;
    }

    setCupom(cupomUpper);
    setDesconto(valorDesconto);
    setCupomAplicado(true);

    return {
      sucesso: true,
      mensagem: `Cupom de ${valorCupom === "frete" ? "frete grátis" : valorCupom + "%"} aplicado!`,
      desconto: valorDesconto,
    };
  }

  function removerCupom() {
    setCupom("");
    setDesconto(0);
    setCupomAplicado(false);
  }

  // ========== Funções de Avaliação ==========
  function adicionarAvaliacao(produtoId, avaliacao) {
    const novaAvaliacao = {
      id: Date.now(),
      produtoId: produtoId,
      usuarioId: usuario?.id,
      usuarioNome: usuario?.nome || "Anônimo",
      nota: avaliacao.nota,
      titulo: avaliacao.titulo,
      comentario: avaliacao.comentario,
      data: new Date().toISOString(),
      util: 0,
      usuariosQueMarcaramUtil: [],
    };
    setAvaliacoes(function (prev) {
      return [...prev, novaAvaliacao];
    });
    return novaAvaliacao;
  }

  function marcarUtil(avaliacaoId) {
    if (!usuario) return;
    setAvaliacoes(function (prev) {
      return prev.map(function (avaliacao) {
        if (avaliacao.id === avaliacaoId) {
          const jaMarcou = avaliacao.usuariosQueMarcaramUtil.includes(
            usuario.id,
          );
          return {
            ...avaliacao,
            util: jaMarcou ? avaliacao.util - 1 : avaliacao.util + 1,
            usuariosQueMarcaramUtil: jaMarcou
              ? avaliacao.usuariosQueMarcaramUtil.filter(function (id) {
                  return id !== usuario.id;
                })
              : [...avaliacao.usuariosQueMarcaramUtil, usuario.id],
          };
        }
        return avaliacao;
      });
    });
  }

  function getAvaliacoesPorProduto(produtoId) {
    return avaliacoes.filter(function (a) {
      return a.produtoId === produtoId;
    });
  }

  function getMediaAvaliacoes(produtoId) {
    const produtoAvaliacoes = getAvaliacoesPorProduto(produtoId);
    if (produtoAvaliacoes.length === 0) return 0;
    const soma = produtoAvaliacoes.reduce(function (total, a) {
      return total + a.nota;
    }, 0);
    return (soma / produtoAvaliacoes.length).toFixed(1);
  }

  function getDistribuicaoNotas(produtoId) {
    const produtoAvaliacoes = getAvaliacoesPorProduto(produtoId);
    const distribuicao = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    produtoAvaliacoes.forEach(function (a) {
      distribuicao[a.nota] = (distribuicao[a.nota] || 0) + 1;
    });
    return distribuicao;
  }

  function verificarUsuarioAvaliou(produtoId) {
    if (!usuario) return false;
    return avaliacoes.some(function (a) {
      return a.produtoId === produtoId && a.usuarioId === usuario.id;
    });
  }
  // ========== Funções de Pedidos ==========
  function criarPedido(dadosPedido) {
    const numeroPedido = Math.floor(Math.random() * 900000) + 100000;

    const novoPedido = {
      id: Date.now(),
      numero: numeroPedido,
      data: new Date().toISOString(),
      status: "confirmado",
      itens: [...carrinho],
      endereco: dadosPedido.endereco,
      formaPagamento: dadosPedido.formaPagamento,
      parcelas: dadosPedido.parcelas || 1,
      subtotal: dadosPedido.subtotal,
      frete: dadosPedido.frete,
      desconto: dadosPedido.desconto || 0,
      total: dadosPedido.total,
      rastreio: {
        codigo: "BR" + Math.floor(Math.random() * 90000000) + 10000000 + "BR",
        status: "Preparando pedido",
        atualizacao: new Date().toISOString(),
        historico: [
          {
            data: new Date().toISOString(),
            status: "Pedido confirmado",
            descricao: "Seu pedido foi confirmado e está sendo processado.",
            local: "Centro de Distribuição - São Paulo/SP",
          },
        ],
      },
    };

    setPedidos(function (prev) {
      return [novoPedido, ...prev];
    });

    return novoPedido;
  }

  function getPedidosUsuario() {
    return pedidos;
  }

  function getPedidoPorNumero(numero) {
    return pedidos.find(function (p) {
      return p.numero === Number(numero);
    });
  }

  function atualizarStatusRastreio(pedidoId, novoStatus) {
    setPedidos(function (prev) {
      return prev.map(function (pedido) {
        if (pedido.id === pedidoId) {
          const novoHistorico = [
            {
              data: new Date().toISOString(),
              status: novoStatus.status,
              descricao: novoStatus.descricao,
              local: novoStatus.local,
            },
            ...pedido.rastreio.historico,
          ];

          return {
            ...pedido,
            rastreio: {
              ...pedido.rastreio,
              status: novoStatus.status,
              atualizacao: new Date().toISOString(),
              historico: novoHistorico,
            },
          };
        }
        return pedido;
      });
    });
  }

  // Simulação de avanço de status
  function simularAvancosRastreio(pedidoId) {
    const statusFluxo = [
      {
        status: "Pedido confirmado",
        descricao: "Seu pedido foi confirmado.",
        local: "Centro de Distribuição - São Paulo/SP",
      },
      {
        status: "Em separação",
        descricao: "Os produtos estão sendo separados.",
        local: "Centro de Distribuição - São Paulo/SP",
      },
      {
        status: "Embalado",
        descricao: "Pedido embalado e pronto para envio.",
        local: "Centro de Distribuição - São Paulo/SP",
      },
      {
        status: "Enviado",
        descricao: "Pedido entregue à transportadora.",
        local: "Transportadora - São Paulo/SP",
      },
      {
        status: "Em trânsito",
        descricao: "Pedido a caminho do destino.",
        local: "Transportadora - Em rota",
      },
      {
        status: "Saiu para entrega",
        descricao: "Pedido saiu para entrega ao destinatário.",
        local: "Unidade de Entrega Local",
      },
      {
        status: "Entregue",
        descricao: "Pedido entregue ao destinatário.",
        local: "Endereço de entrega",
      },
    ];

    let index = 0;

    const interval = setInterval(function () {
      if (index < statusFluxo.length) {
        atualizarStatusRastreio(pedidoId, statusFluxo[index]);
        index++;
      } else {
        clearInterval(interval);
      }
    }, 30000); // Avança a cada 30 segundos (simulação)
  }
  return (
    <AppContext.Provider
      value={{
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
        verificarUsuarioAvaliou,

        // Pedidos
        pedidos,
        criarPedido,
        getPedidosUsuario,
        getPedidoPorNumero,
        simularAvancosRastreio,
        // Cupons

        cupom,
        desconto,
        cupomAplicado,
        aplicarCupom,
        removerCupom,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp deve ser usado dentro de AppProvider");
  }
  return context;
}
