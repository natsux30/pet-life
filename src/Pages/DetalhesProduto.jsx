import React, { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { getProdutoPorId, recomendarProdutos } from "../data/produtos";
import { useToast } from "../components/Toast";

function DetalhesProduto() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { pets, usuario, adicionarAoCarrinho } = useApp();
  const { addToast } = useToast();

  const [imagemSelecionada, setImagemSelecionada] = useState(0);
  const [quantidade, setQuantidade] = useState(1);

  const produto = getProdutoPorId(id);

  if (!produto) {
    return (
      <div className="detalhes-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', gap: '20px' }}>
        <div style={{ fontSize: "64px" }}>🔍</div>
        <h2 style={{ color: "#333" }}>Produto não encontrado</h2>
        <p style={{ color: "#666" }}>O produto que você procura não existe ou foi removido.</p>
        <Link to="/loja">
          <button style={{ background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)", color: "white", border: "none", padding: "12px 30px", borderRadius: "25px", fontSize: "1rem", cursor: "pointer", fontWeight: "bold" }}>
            ← Voltar para Loja
          </button>
        </Link>
      </div>
    );
  }

  const recomendacoesPorPet = pets
    .map(function (pet) {
      const recomendacoes = recomendarProdutos(pet, 4)
        .filter(function (p) { return p.id !== produto.id; })
        .slice(0, 2);
      return { pet, produtos: recomendacoes };
    })
    .filter(function (item) { return item.produtos.length > 0; });

  function handleAddToCart() {
    adicionarAoCarrinho(produto, quantidade);
    addToast(`${produto.title} (${quantidade}x) adicionado ao carrinho! 🛒`, "success");
  }

  function handleComprarAgora() {
    adicionarAoCarrinho(produto, quantidade);
    navigate("/carrinho");
  }

  return (
    <div className="detalhes-container">
      
      {/* Breadcrumb */}
      <div className="detalhes-breadcrumb">
        <Link to="/" style={{ color: "#667eea", textDecoration: "none" }}>Home</Link>
        {" > "}
        <Link to="/loja" style={{ color: "#667eea", textDecoration: "none" }}>Loja</Link>
        {" > "}
        <span>{produto.title}</span>
      </div>

      {/* Seção Principal */}
      <div className="detalhes-main">
        
        {/* Coluna de Imagens */}
        <div>
          <img
            src={produto.images[imagemSelecionada]}
            alt={produto.title}
            className="detalhes-imagem-principal"
          />
          <div className="detalhes-miniaturas">
            {produto.images.map(function (img, index) {
              return (
                <img
                  key={index}
                  src={img}
                  alt={`${produto.title} ${index + 1}`}
                  className={`detalhes-miniatura ${imagemSelecionada === index ? 'ativa' : ''}`}
                  onClick={function () { setImagemSelecionada(index); }}
                  onMouseEnter={function () { setImagemSelecionada(index); }}
                />
              );
            })}
          </div>
        </div>

        {/* Coluna de Informações */}
        <div className="detalhes-info">
          
          {/* Categoria */}
          <span style={{
            display: "inline-block",
            background: "#e8e0ff",
            color: "#5e35b1",
            padding: "5px 15px",
            borderRadius: "20px",
            fontSize: "0.85rem",
            fontWeight: "500",
            width: "fit-content"
          }}>
            {produto.categoria === "caes" ? "🐕 Cães" : produto.categoria === "gatos" ? "🐈 Gatos" : "🐾 Outros"}
          </span>

          <h1 style={{ fontSize: "2rem", color: "#333", margin: 0 }}>{produto.title}</h1>

          {/* Avaliação */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ color: "#ffc107", fontSize: "1.2rem" }}>
              {"★".repeat(Math.floor(produto.avaliacao))}
              {produto.avaliacao % 1 !== 0 ? "½" : ""}
            </span>
            <span style={{ color: "#666", fontSize: "0.9rem" }}>
              {produto.avaliacao} ({produto.numAvaliacoes} avaliações)
            </span>
          </div>

          {/* Preço */}
          <div>
            <h2 style={{ fontSize: "2.5rem", color: "#008000", fontWeight: "bold", margin: 0 }}>
              R$ {(produto.price * quantidade).toFixed(2)}
            </h2>
            <p style={{ color: "#666", fontSize: "0.9rem", margin: "5px 0 0 0" }}>
              ou 3x de R$ {(produto.price / 3).toFixed(2)} sem juros
            </p>
          </div>

          {/* Descrição */}
          <p style={{ color: "#555", lineHeight: "1.6", fontSize: "1rem" }}>
            {produto.descricaoCompleta}
          </p>

          {/* Tags */}
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <span className="tag">📏 {produto.porte}</span>
            <span className="tag">🎂 {produto.idade}</span>
            <span className="tag">🧱 {produto.material}</span>
            <span className="tag">🎯 {produto.finalidade}</span>
          </div>

          {/* Comportamentos Indicados */}
          <div>
            <label style={{ color: "#555", fontWeight: "500", fontSize: "0.9rem", display: "block", marginBottom: "8px" }}>
              🎭 Indicado para pets:
            </label>
            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              {produto.comportamentosIndicados.map(function (comp) {
                return (
                  <span key={comp} className="tag" style={{ background: "#e8f5e9", color: "#2e7d32" }}>
                    {comp}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Contraindicações */}
          {produto.contraindicadoAlergias.length > 0 && (
            <div>
              <label style={{ color: "#d63031", fontWeight: "500", fontSize: "0.9rem", display: "block", marginBottom: "8px" }}>
                ⚠️ Contraindicado para alergias:
              </label>
              <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                {produto.contraindicadoAlergias.map(function (alergia) {
                  return (
                    <span key={alergia} className="tag" style={{ background: "#ffe0e0", color: "#d63031" }}>
                      {alergia}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Informações Técnicas */}
          <div className="info-grid">
            <div className="info-item"><span className="info-label">Dimensões</span><span className="info-value">{produto.dimensoes}</span></div>
            <div className="info-item"><span className="info-label">Peso do Produto</span><span className="info-value">{produto.pesoProduto}</span></div>
            <div className="info-item"><span className="info-label">Garantia</span><span className="info-value">{produto.garantia}</span></div>
            <div className="info-item"><span className="info-label">Origem</span><span className="info-value">{produto.origem}</span></div>
            <div className="info-item">
              <span className="info-label">Estoque</span>
              <span className="info-value" style={{
                color: produto.estoque > 10 ? "#2e7d32" : produto.estoque > 0 ? "#e65100" : "#d63031"
              }}>
                {produto.estoque > 10 ? "✓ Em estoque" : produto.estoque > 0 ? `⚠️ Últimas ${produto.estoque} unidades` : "✗ Fora de estoque"}
              </span>
            </div>
          </div>

          {/* Quantidade */}
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ color: "#555", fontWeight: "500" }}>Quantidade:</span>
            <button className="qtd-btn" onClick={function () { if (quantidade > 1) setQuantidade(quantidade - 1); }}>−</button>
            <input type="text" value={quantidade} readOnly className="qtd-input" />
            <button className="qtd-btn" onClick={function () { if (quantidade < produto.estoque) setQuantidade(quantidade + 1); }}>+</button>
          </div>

          {/* Botões */}
          <div className="botoes-container">
            <button className="btn-carrinho" onClick={handleAddToCart}>
              🛒 Adicionar ao Carrinho
            </button>
            <button className="btn-comprar" onClick={handleComprarAgora}>
              Comprar Agora
            </button>
          </div>

        </div>
      </div>

      {/* Recomendações */}
      {usuario && recomendacoesPorPet.length > 0 && (
        <div className="detalhes-recomendacoes">
          <h2 style={{ color: "#333", marginTop: 0, marginBottom: "20px" }}>
            🎯 Recomendado para seus Pets
          </h2>
          <div className="detalhes-recomendacoes-grid">
            {recomendacoesPorPet.map(function (item) {
              return (
                <div key={item.pet.id}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px" }}>
                    <span style={{ fontSize: "24px" }}>
                      {item.pet.tipo === "cachorro" ? "🐕" : item.pet.tipo === "gato" ? "🐈" : "🐾"}
                    </span>
                    <strong style={{ color: "#333", fontSize: "0.95rem" }}>Para {item.pet.nomePet}</strong>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    {item.produtos.map(function (prod) {
                      return (
                        <Link key={prod.id} to={`/produto/${prod.id}`} style={{ textDecoration: "none" }}>
                          <div className="recomendacao-item">
                            <img src={prod.image} alt={prod.title} style={{ width: "60px", height: "60px", objectFit: "cover", borderRadius: "8px" }} />
                            <div>
                              <h4 style={{ margin: "0 0 3px 0", color: "#333", fontSize: "0.9rem" }}>{prod.title}</h4>
                              <p style={{ margin: 0, color: "#667eea", fontWeight: "bold", fontSize: "0.85rem" }}>R$ {prod.price.toFixed(2)}</p>
                            </div>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}

export default DetalhesProduto;