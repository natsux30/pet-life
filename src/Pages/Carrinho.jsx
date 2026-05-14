import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

function Carrinho() {
  const navigate = useNavigate();
  const {
    usuario,
    carrinho,
    removerDoCarrinho,
    atualizarQuantidade,
    limparCarrinho,
    getSubtotal,
    getFrete,
    getTotal,
    getQuantidadeItens,
    cupom,
    desconto,
    cupomAplicado,
    aplicarCupom,
    removerCupom,
  } = useApp();
  const { addToast } = useToast();
  const [itemRemovendo, setItemRemovendo] = useState(null);
  const [cep, setCep] = useState("");
  const [cupomInput, setCupomInput] = useState("");
  const totalComDesconto = getTotal() - desconto;

  function handleRemover(produtoId) { setItemRemovendo(produtoId); }
  function confirmarRemocao() { removerDoCarrinho(itemRemovendo); setItemRemovendo(null); }
  function handleQuantidade(produtoId, novaQuantidade) { if (novaQuantidade > 0 && novaQuantidade <= 99) atualizarQuantidade(produtoId, novaQuantidade); }

  function handleAplicarCupom() {
    if (!cupomInput.trim()) { addToast("⚠️ Digite um código de cupom", "warning"); return; }
    const resultado = aplicarCupom(cupomInput, getSubtotal(), getFrete());
    if (resultado.sucesso) { addToast(`🎉 ${resultado.mensagem}`, "success"); }
    else { addToast(`❌ ${resultado.mensagem}`, "error"); }
  }

  function handleRemoverCupom() { removerCupom(); setCupomInput(""); addToast("Cupom removido", "info"); }

  function handleFinalizarCompra() {
    if (!usuario) { addToast("🔒 Faça login para finalizar a compra", "warning"); navigate("/login"); return; }
    navigate("/checkout");
  }

  function formatarCEP(value) { const numbers = value.replace(/\D/g, ""); if (numbers.length <= 5) return numbers; return numbers.replace(/(\d{5})(\d{0,3})/, "$1-$2"); }

  // Carrinho vazio
  if (carrinho.length === 0) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5", padding: "20px" }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>🛒</div>
          <h1 style={{ color: "#333", marginBottom: "10px" }}>Seu carrinho está vazio</h1>
          <p style={{ color: "#666", marginBottom: "30px" }}>Que tal explorar nossos produtos?</p>
          <Link to="/loja">
            <button style={{ background: "#008000", color: "white", border: "none", padding: "15px 40px", borderRadius: "30px", fontSize: "1.1rem", fontWeight: "bold", cursor: "pointer" }}>Ir para Loja</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="carrinho-container">
      <div className="carrinho-wrapper">
        
        {/* Cabeçalho */}
        <div className="carrinho-header">
          <h1 className="carrinho-titulo">🛒 Carrinho ({getQuantidadeItens()} {getQuantidadeItens() === 1 ? "item" : "itens"})</h1>
          <button onClick={function () { if (window.confirm("Tem certeza que deseja limpar o carrinho?")) limparCarrinho(); }} className="carrinho-limpar-btn">🗑️ Limpar Carrinho</button>
        </div>

        <div className="carrinho-grid">
          
          {/* Lista de Itens */}
          <div className="carrinho-itens">
            {carrinho.map(function (item) {
              return (
                <div key={item.id} className="carrinho-item">
                  <Link to={`/produto/${item.id}`}>
                    <img src={item.image} alt={item.title} className="carrinho-item-img" />
                  </Link>
                  <div className="carrinho-item-info">
                    <Link to={`/produto/${item.id}`} className="carrinho-item-titulo"><h3>{item.title}</h3></Link>
                    <p className="carrinho-item-preco">R$ {item.price.toFixed(2)}</p>
                    <div className="carrinho-qtd">
                      <span className="carrinho-qtd-label">Qtd:</span>
                      <div className="carrinho-qtd-botoes">
                        <button className="carrinho-qtd-btn" onClick={function () { handleQuantidade(item.id, item.quantidade - 1); }}>−</button>
                        <span className="carrinho-qtd-valor">{item.quantidade}</span>
                        <button className="carrinho-qtd-btn" onClick={function () { handleQuantidade(item.id, item.quantidade + 1); }}>+</button>
                      </div>
                    </div>
                    <p className="carrinho-item-subtotal">Subtotal: R$ {(item.price * item.quantidade).toFixed(2)}</p>
                  </div>
                  <button className="carrinho-remover-btn" onClick={function () { handleRemover(item.id); }} title="Remover item">🗑️</button>
                </div>
              );
            })}
          </div>

          {/* Resumo */}
          <div>
            <div className="carrinho-resumo">
              <h2 className="carrinho-resumo-titulo">📋 Resumo do Pedido</h2>
              
              <div className="carrinho-campo">
                <label className="carrinho-label">Calcular Frete</label>
                <div className="carrinho-input-group">
                  <input type="text" placeholder="00000-000" value={formatarCEP(cep)} onChange={function (e) { setCep(e.target.value.replace(/\D/g, "")); }} maxLength={9} className="carrinho-input" />
                  <button className="carrinho-input-ok">OK</button>
                </div>
              </div>

              <div className="carrinho-campo">
                <label className="carrinho-label">Cupom de Desconto</label>
                <div className="carrinho-input-group">
                  <input type="text" placeholder="Digite o cupom" value={cupomInput} onChange={function (e) { setCupomInput(e.target.value.toUpperCase()); }} disabled={cupomAplicado} className="carrinho-input" style={{ borderColor: cupomAplicado ? "#2e7d32" : "#e0e0e0", background: cupomAplicado ? "#e8f5e9" : "white" }} />
                  {!cupomAplicado ? (
                    <button onClick={handleAplicarCupom} className="carrinho-aplicar-btn">Aplicar</button>
                  ) : (
                    <button onClick={handleRemoverCupom} className="carrinho-remover-cupom-btn">✕</button>
                  )}
                </div>
                <p className="carrinho-cupons-dica">Cupons: PET10, PET20, BOASVINDAS, FRETEGRATIS</p>
              </div>

              <div className="carrinho-valores">
                <div className="carrinho-linha"><span>Subtotal</span><span>R$ {getSubtotal().toFixed(2)}</span></div>
                {desconto > 0 && (
                  <div className="carrinho-linha-desconto"><span>Desconto ({cupom})</span><span>- R$ {desconto.toFixed(2)}</span></div>
                )}
                <div className="carrinho-linha"><span>Frete</span><span style={{ color: getFrete() === 0 ? "#2e7d32" : "#666" }}>{getFrete() === 0 ? "Grátis" : `R$ ${getFrete().toFixed(2)}`}</span></div>
                <div className="carrinho-linha-total"><span>Total</span><span className="carrinho-total-valor">R$ {totalComDesconto.toFixed(2)}</span></div>
                {getSubtotal() < 99 && getSubtotal() > 0 && <p className="carrinho-frete-gratis-aviso">Faltam R$ {(99 - getSubtotal()).toFixed(2)} para frete grátis</p>}
              </div>

              <button className="carrinho-finalizar-btn" onClick={handleFinalizarCompra}>Finalizar Compra</button>
              <Link to="/loja"><button className="carrinho-continuar-btn">Continuar Comprando</button></Link>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {itemRemovendo && (
        <div className="carrinho-modal-overlay">
          <div className="carrinho-modal">
            <div className="carrinho-modal-icone">🗑️</div>
            <h3>Remover Item</h3>
            <p style={{ color: "#666", marginBottom: "20px" }}>Tem certeza que deseja remover este item?</p>
            <div className="carrinho-modal-botoes">
              <button className="carrinho-modal-cancelar" onClick={function () { setItemRemovendo(null); }}>Cancelar</button>
              <button className="carrinho-modal-remover" onClick={confirmarRemocao}>Remover</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Carrinho;