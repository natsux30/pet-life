import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

function Carrinho() {
  const navigate = useNavigate();
  const {
    carrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    limparCarrinho,
    getSubtotal,
    getFrete,
    getTotal,
    getQuantidadeItens,
  } = useApp();
  const { addToast } = useToast();
  const [itemRemovendo, setItemRemovendo] = useState(null);
  const [cep, setCep] = useState("");
  const [cupom, setCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState(false);
  const [desconto, setDesconto] = useState(0);

  function handleRemover(produtoId) {
    setItemRemovendo(produtoId);
  }

  function confirmarRemocao() {
    removerDoCarrinho(itemRemovendo);
    setItemRemovendo(null);
  }

  function handleQuantidade(produtoId, novaQuantidade) {
    if (novaQuantidade > 0 && novaQuantidade <= 99) {
      atualizarQuantidade(produtoId, novaQuantidade);
    }
  }

  function handleAplicarCupom() {
    const cuponsValidos = {
      PET10: 10, // 10% de desconto
      PET20: 20, // 20% de desconto
      FRETEGRATIS: 0, // Frete grátis
      BOASVINDAS: 15, // 15% de desconto
    };

    const descontoPercentual = cuponsValidos[cupom.toUpperCase()];

    if (descontoPercentual !== undefined) {
      const valorDesconto = (getSubtotal() * descontoPercentual) / 100;
      setDesconto(valorDesconto);
      setCupomAplicado(true);
      addToast(
        `🎉 Cupom aplicado! ${descontoPercentual}% de desconto`,
        "success",
      );
    } else {
      addToast("❌ Cupom inválido", "error");
    }
  }

  function handleFinalizarCompra() {
    addToast(
      "✅ Compra finalizada com sucesso! Obrigado por comprar na Pets-LifeStyle!",
      "success",
    );
    limparCarrinho();
    navigate("/");
  }

  function formatarCEP(value) {
    const numbers = value.replace(/\D/g, "");
    if (numbers.length <= 5) return numbers;
    return numbers.replace(/(\d{5})(\d{0,3})/, "$1-$2");
  }

  // Carrinho vazio
  if (carrinho.length === 0) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          padding: "20px",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>🛒</div>
          <h1 style={{ color: "#333", marginBottom: "10px" }}>
            Seu carrinho está vazio
          </h1>
          <p style={{ color: "#666", marginBottom: "30px" }}>
            Que tal explorar nossos produtos e encontrar algo para seu pet?
          </p>
          <Link to="/loja">
            <button
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "15px 40px",
                borderRadius: "30px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Ir para Loja
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "20px" }}>
      <div style={{ maxWidth: "900px", margin: "0 auto" }}>
        {/* Cabeçalho */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "30px",
          }}
        >
          <h1 style={{ color: "#333", fontSize: "2rem" }}>
            🛒 Carrinho ({getQuantidadeItens()}{" "}
            {getQuantidadeItens() === 1 ? "item" : "itens"})
          </h1>
          <button
            onClick={function () {
              if (window.confirm("Tem certeza que deseja limpar o carrinho?")) {
                limparCarrinho();
              }
            }}
            style={{
              background: "none",
              border: "1px solid #ff4757",
              color: "#ff4757",
              padding: "8px 15px",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "0.85rem",
            }}
          >
            🗑️ Limpar Carrinho
          </button>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 350px",
            gap: "20px",
          }}
        >
          {/* Lista de Itens */}
          <div
            style={{ display: "flex", flexDirection: "column", gap: "15px" }}
          >
            {carrinho.map(function (item) {
              return (
                <div
                  key={item.id}
                  style={{
                    background: "white",
                    borderRadius: "15px",
                    padding: "20px",
                    display: "flex",
                    gap: "20px",
                    boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
                  }}
                >
                  {/* Imagem */}
                  <Link to={`/produto/${item.id}`}>
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "120px",
                        height: "120px",
                        objectFit: "cover",
                        borderRadius: "10px",
                      }}
                    />
                  </Link>

                  {/* Informações */}
                  <div style={{ flex: 1 }}>
                    <Link
                      to={`/produto/${item.id}`}
                      style={{ textDecoration: "none" }}
                    >
                      <h3
                        style={{
                          margin: "0 0 5px 0",
                          color: "#333",
                          fontSize: "1.1rem",
                        }}
                      >
                        {item.title}
                      </h3>
                    </Link>

                    <p
                      style={{
                        color: "#667eea",
                        fontWeight: "bold",
                        fontSize: "1.3rem",
                        margin: "0 0 15px 0",
                      }}
                    >
                      R$ {item.price.toFixed(2)}
                    </p>

                    {/* Controle de Quantidade */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "15px",
                      }}
                    >
                      <span style={{ color: "#666", fontSize: "0.9rem" }}>
                        Qtd:
                      </span>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "5px",
                        }}
                      >
                        <button
                          onClick={function () {
                            handleQuantidade(item.id, item.quantidade - 1);
                          }}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            border: "2px solid #e0e0e0",
                            background: "white",
                            cursor: "pointer",
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          −
                        </button>
                        <span
                          style={{
                            width: "40px",
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "1rem",
                          }}
                        >
                          {item.quantidade}
                        </span>
                        <button
                          onClick={function () {
                            handleQuantidade(item.id, item.quantidade + 1);
                          }}
                          style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            border: "2px solid #e0e0e0",
                            background: "white",
                            cursor: "pointer",
                            fontSize: "1rem",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                          }}
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Subtotal */}
                    <p
                      style={{
                        color: "#999",
                        fontSize: "0.85rem",
                        margin: "10px 0 0 0",
                      }}
                    >
                      Subtotal: R$ {(item.price * item.quantidade).toFixed(2)}
                    </p>
                  </div>

                  {/* Botão Remover */}
                  <button
                    onClick={function () {
                      handleRemover(item.id);
                    }}
                    style={{
                      background: "none",
                      border: "none",
                      color: "#ff4757",
                      cursor: "pointer",
                      fontSize: "1.2rem",
                      alignSelf: "flex-start",
                      padding: "5px",
                    }}
                    title="Remover item"
                  >
                    🗑️
                  </button>
                </div>
              );
            })}
          </div>

          {/* Resumo do Pedido */}
          <div>
            <div
              style={{
                background: "white",
                borderRadius: "15px",
                padding: "25px",
                boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
                position: "sticky",
                top: "100px",
              }}
            >
              <h2
                style={{
                  marginTop: 0,
                  color: "#333",
                  fontSize: "1.3rem",
                  marginBottom: "20px",
                }}
              >
                📋 Resumo do Pedido
              </h2>

              {/* CEP */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#666",
                    fontSize: "0.85rem",
                    marginBottom: "5px",
                  }}
                >
                  Calcular Frete
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    placeholder="00000-000"
                    value={formatarCEP(cep)}
                    onChange={function (e) {
                      const raw = e.target.value.replace(/\D/g, "");
                      setCep(raw);
                    }}
                    maxLength={9}
                    style={{
                      flex: 1,
                      padding: "10px",
                      border: "2px solid #e0e0e0",
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                    }}
                  />
                  <button
                    style={{
                      padding: "10px 15px",
                      background: "#667eea",
                      color: "white",
                      border: "none",
                      borderRadius: "8px",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    OK
                  </button>
                </div>
              </div>

              {/* Cupom */}
              <div style={{ marginBottom: "20px" }}>
                <label
                  style={{
                    display: "block",
                    color: "#666",
                    fontSize: "0.85rem",
                    marginBottom: "5px",
                  }}
                >
                  Cupom de Desconto
                </label>
                <div style={{ display: "flex", gap: "10px" }}>
                  <input
                    type="text"
                    placeholder="Digite o cupom"
                    value={cupom}
                    onChange={function (e) {
                      setCupom(e.target.value.toUpperCase());
                    }}
                    disabled={cupomAplicado}
                    style={{
                      flex: 1,
                      padding: "10px",
                      border: `2px solid ${cupomAplicado ? "#2e7d32" : "#e0e0e0"}`,
                      borderRadius: "8px",
                      fontSize: "0.9rem",
                      background: cupomAplicado ? "#e8f5e9" : "white",
                    }}
                  />
                  {!cupomAplicado ? (
                    <button
                      onClick={handleAplicarCupom}
                      style={{
                        padding: "10px 15px",
                        background: "#667eea",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      Aplicar
                    </button>
                  ) : (
                    <button
                      onClick={function () {
                        setCupom("");
                        setCupomAplicado(false);
                        setDesconto(0);
                      }}
                      style={{
                        padding: "10px 15px",
                        background: "#ff4757",
                        color: "white",
                        border: "none",
                        borderRadius: "8px",
                        cursor: "pointer",
                        fontSize: "0.85rem",
                      }}
                    >
                      ✕
                    </button>
                  )}
                </div>
                <div
                  style={{
                    marginTop: "5px",
                    fontSize: "0.75rem",
                    color: "#999",
                  }}
                >
                  Cupons: PET10, PET20, BOASVINDAS, FRETEGRATIS
                </div>
              </div>

              {/* Valores */}
              <div
                style={{ borderTop: "1px solid #f0f0f0", paddingTop: "15px" }}
              >
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  <span>Subtotal</span>
                  <span>R$ {getSubtotal().toFixed(2)}</span>
                </div>

                {desconto > 0 && (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: "10px",
                      color: "#2e7d32",
                      fontSize: "0.9rem",
                    }}
                  >
                    <span>Desconto</span>
                    <span>- R$ {desconto.toFixed(2)}</span>
                  </div>
                )}

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "10px",
                    color: "#666",
                    fontSize: "0.9rem",
                  }}
                >
                  <span>Frete</span>
                  <span
                    style={{ color: getFrete() === 0 ? "#2e7d32" : "#666" }}
                  >
                    {getFrete() === 0
                      ? "Grátis"
                      : `R$ ${getFrete().toFixed(2)}`}
                  </span>
                </div>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginTop: "15px",
                    paddingTop: "15px",
                    borderTop: "2px solid #f0f0f0",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                    color: "#333",
                  }}
                >
                  <span>Total</span>
                  <span style={{ color: "#667eea" }}>
                    R$ {(getTotal() - desconto).toFixed(2)}
                  </span>
                </div>

                {getSubtotal() < 99 && getSubtotal() > 0 && (
                  <p
                    style={{
                      color: "#e65100",
                      fontSize: "0.8rem",
                      marginTop: "10px",
                      textAlign: "center",
                    }}
                  >
                    Faltam R$ {(99 - getSubtotal()).toFixed(2)} para frete
                    grátis
                  </p>
                )}
              </div>

              {/* Botão Finalizar */}
              <button
                onClick={handleFinalizarCompra}
                style={{
                  width: "100%",
                  padding: "15px",
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  marginTop: "20px",
                  transition: "transform 0.2s",
                }}
                onMouseEnter={function (e) {
                  e.target.style.transform = "translateY(-2px)";
                }}
                onMouseLeave={function (e) {
                  e.target.style.transform = "translateY(0)";
                }}
              >
                Finalizar Compra 🎉
              </button>

              <Link to="/loja">
                <button
                  style={{
                    width: "100%",
                    padding: "12px",
                    background: "transparent",
                    color: "#667eea",
                    border: "2px solid #667eea",
                    borderRadius: "10px",
                    fontSize: "0.9rem",
                    fontWeight: "500",
                    cursor: "pointer",
                    marginTop: "10px",
                  }}
                >
                  Continuar Comprando
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Confirmação de Remoção */}
      {itemRemovendo && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "30px",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🗑️</div>
            <h3 style={{ margin: "0 0 10px 0" }}>Remover Item</h3>
            <p style={{ color: "#666", margin: "0 0 20px 0" }}>
              Tem certeza que deseja remover este item do carrinho?
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={function () {
                  setItemRemovendo(null);
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "10px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={confirmarRemocao}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#d63031",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrinho;
