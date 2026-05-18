import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Rastreio() {
  const navigate = useNavigate();
  const { pedidos, getPedidoPorNumero } = useApp();
  const [codigoBusca, setCodigoBusca] = useState("");
  const [pedidoEncontrado, setPedidoEncontrado] = useState(null);
  const [erroBusca, setErroBusca] = useState("");
  const [pedidoSelecionado, setPedidoSelecionado] = useState(null);

  function buscarPedido() {
    if (!codigoBusca.trim()) {
      setErroBusca("Digite o número do pedido");
      return;
    }

    const pedido = getPedidoPorNumero(codigoBusca);

    if (pedido) {
      setPedidoEncontrado(pedido);
      setPedidoSelecionado(pedido);
      setErroBusca("");
    } else {
      setPedidoEncontrado(null);
      setPedidoSelecionado(null);
      setErroBusca("Pedido não encontrado. Verifique o número.");
    }
  }

  function selecionarPedido(pedido) {
    if (pedidoSelecionado) {
      if (!pedidoSelecionado.rastreio) {
        pedidoSelecionado.rastreio = {
          codigo: "Indisponível",
          status: "Pedido confirmado",
          historico: [],
        };
      }
      if (!pedidoSelecionado.itens) {
        pedidoSelecionado.itens = [];
      }
      if (!pedidoSelecionado.endereco) {
        pedidoSelecionado.endereco = {};
      }
    }
  }

  function getStatusColor(status) {
    const cores = {
      "Pedido confirmado": "#008000",
      "Em separação": "#f093fb",
      Embalado: "#f5576c",
      Enviado: "#e65100",
      "Em trânsito": "#ff9800",
      "Saiu para entrega": "#4caf50",
      Entregue: "#2e7d32",
    };
    return cores[status] || "#999";
  }

  function getStatusIcon(status) {
    const icones = {
      "Pedido confirmado": "📋",
      "Em separação": "📦",
      Embalado: "🎁",
      Enviado: "🚚",
      "Em trânsito": "🛣️",
      "Saiu para entrega": "🏍️",
      Entregue: "✅",
    };
    return icones[status] || "📍";
  }

  function formatarData(data) {
    return new Date(data).toLocaleDateString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  // Se um pedido estiver selecionado, mostra detalhes
  if (pedidoSelecionado) {
    return (
      <div
        style={{ background: "#f5f5f5", minHeight: "100vh", padding: "20px" }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          {/* Cabeçalho */}
          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "25px",
              marginBottom: "20px",
              boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "start",
                flexWrap: "wrap",
                gap: "15px",
              }}
            >
              <div>
                <button
                  onClick={function () {
                    setPedidoSelecionado(null);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    color: "#008000",
                    cursor: "pointer",
                    fontSize: "0.9rem",
                    padding: "0",
                    marginBottom: "10px",
                    display: "block",
                  }}
                >
                  ← Voltar para lista
                </button>
                <h1
                  style={{
                    margin: "0 0 5px 0",
                    color: "#333",
                    fontSize: "1.5rem",
                  }}
                >
                  Pedido #{pedidoSelecionado.numero}
                </h1>
                <p style={{ margin: "0", color: "#999", fontSize: "0.9rem" }}>
                  Realizado em {formatarData(pedidoSelecionado.data)}
                </p>
              </div>
              <div
                style={{
                  background:
                    getStatusColor(pedidoSelecionado.rastreio?.status) + "20",
                  color: getStatusColor(pedidoSelecionado.rastreio?.status),
                  padding: "10px 20px",
                  borderRadius: "25px",
                  fontWeight: "bold",
                  fontSize: "0.9rem",
                }}
              >
                {getStatusIcon(pedidoSelecionado.rastreio?.status)}{" "}
                {pedidoSelecionado.rastreio?.status || "Pedido confirmado"}
              </div>
            </div>

            {/* Código de Rastreio */}
            <div
              style={{
                background: "#f8f9fa",
                padding: "15px",
                borderRadius: "10px",
                marginTop: "15px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div>
                <span style={{ color: "#999", fontSize: "0.8rem" }}>
                  Código de Rastreio
                </span>
                <p
                  style={{
                    margin: "3px 0 0 0",
                    fontWeight: "bold",
                    color: "#333",
                    fontSize: "1.1rem",
                    letterSpacing: "1px",
                  }}
                >
                  {pedidoSelecionado.rastreio?.codigo}
                </p>
              </div>
              <button
                onClick={function () {
                  navigator.clipboard.writeText(
                    pedidoSelecionado.rastreio?.codigo,
                  );
                }}
                style={{
                  background: "#008000",
                  color: "white",
                  border: "none",
                  padding: "8px 15px",
                  borderRadius: "8px",
                  cursor: "pointer",
                  fontSize: "0.85rem",
                }}
              >
                📋 Copiar
              </button>
            </div>
          </div>

          {/* Timeline de Rastreio */}
          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "30px",
              boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#333",
                fontSize: "1.2rem",
                marginBottom: "25px",
              }}
            >
              📍 Linha do Tempo
            </h2>

            <div style={{ position: "relative" }}>
              {pedidoSelecionado.rastreio?.historico.map(
                function (evento, index) {
                  const isLast =
                    index === pedidoSelecionado.rastreio?.historico.length - 1;
                  const isFirst = index === 0;

                  return (
                    <div
                      key={index}
                      style={{
                        display: "flex",
                        gap: "15px",
                        position: "relative",
                        paddingBottom: isLast ? "0" : "30px",
                      }}
                    >
                      {/* Linha conectora */}
                      {!isLast && (
                        <div
                          style={{
                            position: "absolute",
                            left: "15px",
                            top: "30px",
                            width: "2px",
                            height: "calc(100% - 30px)",
                            background: isFirst ? "#2e7d32" : "#e0e0e0",
                          }}
                        />
                      )}

                      {/* Bolinha */}
                      <div
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          background: isFirst
                            ? "#2e7d32"
                            : index ===
                                pedidoSelecionado.rastreio?.historico.length - 1
                              ? "#e0e0e0"
                              : "#008000",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          color: "white",
                          fontSize: "0.9rem",
                          flexShrink: 0,
                          zIndex: 1,
                        }}
                      >
                        {isFirst ? "✓" : isLast ? "○" : "●"}
                      </div>

                      {/* Conteúdo */}
                      <div
                        style={{
                          flex: 1,
                          background: isFirst ? "#e8f5e9" : "#f8f9fa",
                          padding: "15px",
                          borderRadius: "10px",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            justifyContent: "space-between",
                            alignItems: "start",
                            flexWrap: "wrap",
                            gap: "5px",
                          }}
                        >
                          <strong style={{ color: "#333" }}>
                            {evento.status}
                          </strong>
                          <span style={{ color: "#999", fontSize: "0.8rem" }}>
                            {formatarData(evento.data)}
                          </span>
                        </div>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            color: "#666",
                            fontSize: "0.9rem",
                          }}
                        >
                          {evento.descricao}
                        </p>
                        <p
                          style={{
                            margin: "5px 0 0 0",
                            color: "#999",
                            fontSize: "0.8rem",
                          }}
                        >
                          📍 {evento.local}
                        </p>
                      </div>
                    </div>
                  );
                },
              )}
            </div>
          </div>

          {/* Resumo do Pedido */}
          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "25px",
              marginTop: "20px",
              boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
            }}
          >
            <h2
              style={{
                marginTop: 0,
                color: "#333",
                fontSize: "1.2rem",
                marginBottom: "20px",
              }}
            >
              🛍️ Itens do Pedido
            </h2>

            {(pedidoSelecionado.itens || []).map(function (item) {
              return (
                <div
                  key={item.id}
                  style={{
                    display: "flex",
                    gap: "15px",
                    padding: "10px 0",
                    borderBottom: "1px solid #f0f0f0",
                  }}
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    style={{
                      width: "60px",
                      height: "60px",
                      objectFit: "cover",
                      borderRadius: "8px",
                    }}
                  />
                  <div style={{ flex: 1 }}>
                    <p
                      style={{ margin: "0", fontWeight: "bold", color: "#333" }}
                    >
                      {item.title}
                    </p>
                    <p
                      style={{
                        margin: "3px 0",
                        color: "#999",
                        fontSize: "0.85rem",
                      }}
                    >
                      Qtd: {item.quantidade}
                    </p>
                  </div>
                  <p style={{ fontWeight: "bold", color: "#008000" }}>
                    R$ {(item.price * item.quantidade).toFixed(2)}
                  </p>
                </div>
              );
            })}

            <div
              style={{
                borderTop: "2px solid #f0f0f0",
                marginTop: "15px",
                paddingTop: "15px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                <span>Subtotal</span>
                <span>R$ {pedidoSelecionado.subtotal.toFixed(2)}</span>
              </div>
              {pedidoSelecionado.desconto > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "5px",
                    color: "#2e7d32",
                    fontSize: "0.9rem",
                  }}
                >
                  <span>Desconto</span>
                  <span>- R$ {pedidoSelecionado.desconto.toFixed(2)}</span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "5px",
                  color: "#666",
                  fontSize: "0.9rem",
                }}
              >
                <span>Frete</span>
                <span>
                  {pedidoSelecionado.frete === 0
                    ? "Grátis"
                    : `R$ ${pedidoSelecionado.frete.toFixed(2)}`}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "10px",
                  paddingTop: "10px",
                  borderTop: "1px solid #e0e0e0",
                  fontWeight: "bold",
                  fontSize: "1.1rem",
                  color: "#333",
                }}
              >
                <span>Total</span>
                <span style={{ color: "#008000" }}>
                  R$ {pedidoSelecionado.total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Tela de busca/listagem de pedidos
  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        <h1 style={{ color: "#333", marginBottom: "20px" }}>
          📦 Rastrear Pedido
        </h1>

        {/* Busca por número */}
        <div
          style={{
            background: "white",
            borderRadius: "15px",
            padding: "25px",
            marginBottom: "20px",
            boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
          }}
        >
          <p style={{ color: "#666", marginTop: 0 }}>
            Digite o número do pedido para rastrear:
          </p>
          <div style={{ display: "flex", gap: "10px" }}>
            <input
              type="text"
              placeholder="Número do pedido (ex: 123456)"
              value={codigoBusca}
              onChange={function (e) {
                setCodigoBusca(e.target.value);
              }}
              onKeyDown={function (e) {
                if (e.key === "Enter") buscarPedido();
              }}
              style={{
                flex: 1,
                padding: "12px",
                border: "2px solid #e0e0e0",
                borderRadius: "10px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
            <button
              onClick={buscarPedido}
              style={{
                padding: "12px 25px",
                background: "#008000",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontWeight: "bold",
                fontSize: "1rem",
              }}
            >
              🔍 Buscar
            </button>
          </div>
          {erroBusca && (
            <p
              style={{
                color: "#d63031",
                fontSize: "0.9rem",
                marginTop: "10px",
              }}
            >
              {erroBusca}
            </p>
          )}
        </div>

        {/* Resultado da busca */}
        {pedidoEncontrado && (
          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "25px",
              boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
              cursor: "pointer",
            }}
            onClick={function () {
              selecionarPedido(pedidoEncontrado);
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "10px",
              }}
            >
              <div>
                <h3 style={{ margin: "0 0 5px 0", color: "#333" }}>
                  Pedido #{pedidoEncontrado.numero}
                </h3>
                <p style={{ margin: "0", color: "#999", fontSize: "0.9rem" }}>
                  {pedidoEncontrado.itens.length}{" "}
                  {pedidoEncontrado.itens.length === 1 ? "item" : "itens"} •{" "}
                  {formatarData(pedidoEncontrado.data)}
                </p>
              </div>
              <div
                style={{
                  background:
                    getStatusColor(pedidoEncontrado.rastreio.status) + "20",
                  color: getStatusColor(pedidoEncontrado.rastreio.status),
                  padding: "8px 15px",
                  borderRadius: "20px",
                  fontWeight: "bold",
                  fontSize: "0.85rem",
                }}
              >
                {getStatusIcon(pedidoEncontrado.rastreio.status)}{" "}
                {pedidoEncontrado.rastreio.status}
              </div>
            </div>
            <p
              style={{
                marginTop: "15px",
                color: "#008000",
                textAlign: "right",
              }}
            >
              Ver detalhes →
            </p>
          </div>
        )}

        {/* Lista de pedidos  */}
        {pedidos.length > 0 && !pedidoEncontrado && (
          <div>
            <h2
              style={{
                color: "#333",
                fontSize: "1.2rem",
                marginBottom: "15px",
              }}
            >
              Seus Pedidos
            </h2>
            {pedidos.map(function (pedido) {
              return (
                <div
                  key={pedido.id}
                  onClick={function () {
                    selecionarPedido(pedido);
                  }}
                  style={{
                    background: "white",
                    borderRadius: "15px",
                    padding: "20px",
                    marginBottom: "10px",
                    cursor: "pointer",
                    boxShadow: "0 3px 15px rgba(0,0,0,0.08)",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "10px",
                    }}
                  >
                    <div>
                      <h3
                        style={{
                          margin: "0 0 5px 0",
                          color: "#333",
                          fontSize: "1rem",
                        }}
                      >
                        Pedido #{pedido.numero}
                      </h3>
                      <p
                        style={{
                          margin: "0",
                          color: "#999",
                          fontSize: "0.85rem",
                        }}
                      >
                        {pedido.itens?.length} itens • R${" "}
                        {pedido.total.toFixed(2)} • {formatarData(pedido.data)}
                      </p>
                    </div>
                    <div
                      style={{
                        background:
                          getStatusColor(pedido.rastreio?.status) + "20",
                        color: getStatusColor(pedido.rastreio?.status),
                        padding: "6px 12px",
                        borderRadius: "15px",
                        fontWeight: "bold",
                        fontSize: "0.8rem",
                      }}
                    >
                      {getStatusIcon(pedido.rastreio?.status)}{" "}
                      {pedido.rastreio?.status}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* Estado vazio */}
        {pedidos.length === 0 && !pedidoEncontrado && (
          <div
            style={{
              textAlign: "center",
              padding: "40px",
              background: "white",
              borderRadius: "15px",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "15px" }}>📦</div>
            <h3 style={{ color: "#333" }}>Nenhum pedido encontrado</h3>
            <p style={{ color: "#666" }}>
              Faça uma compra para começar a rastrear!
            </p>
            <Link to="/loja">
              <button
                style={{
                  background: "#008000",
                  color: "white",
                  border: "none",
                  padding: "12px 25px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  marginTop: "15px",
                  fontSize: "1rem",
                }}
              >
                Ir para Loja
              </button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default Rastreio;
