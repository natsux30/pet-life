import React from "react";
import { useApp } from "../context/AppContext";
import { todosProdutos } from "../data/produtos";

function TesteCarrinho() {
  const {
    carrinho,
    adicionarAoCarrinho,
    getQuantidadeItens,
    getTotalCarrinho,
  } = useApp();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Teste do Carrinho</h1>

      <div style={{ marginBottom: "20px" }}>
        <h2>Carrinho Atual:</h2>
        <p>Itens: {getQuantidadeItens()}</p>
        <p>Total: R$ {getTotalCarrinho().toFixed(2)}</p>
        <pre
          style={{
            background: "#f0f0f0",
            padding: "15px",
            borderRadius: "10px",
          }}
        >
          {JSON.stringify(carrinho, null, 2)}
        </pre>
      </div>

      <div>
        <h2>Adicionar Produto de Teste:</h2>
        {todosProdutos.slice(0, 3).map(function (produto) {
          return (
            <button
              key={produto.id}
              onClick={function () {
                adicionarAoCarrinho(produto, 1);
                console.log("Adicionado:", produto.title);
                console.log("Carrinho atual:", carrinho);
              }}
              style={{
                display: "block",
                margin: "10px 0",
                padding: "15px 25px",
                background: "#667eea",
                color: "white",
                border: "none",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Adicionar: {produto.title} - R$ {produto.price.toFixed(2)}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default TesteCarrinho;
