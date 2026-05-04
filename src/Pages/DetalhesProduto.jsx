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
  const [mostrarRecomendacoes, setMostrarRecomendacoes] = useState(true);

  const produto = getProdutoPorId(id);

  if (!produto) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <div style={{ fontSize: "64px" }}>🔍</div>
        <h2 style={{ color: "#333" }}>Produto não encontrado</h2>
        <p style={{ color: "#666" }}>
          O produto que você procura não existe ou foi removido.
        </p>
        <Link to="/loja">
          <button
            style={{
              background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
              color: "white",
              border: "none",
              padding: "12px 30px",
              borderRadius: "25px",
              fontSize: "1rem",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            ← Voltar para Loja
          </button>
        </Link>
      </div>
    );
  }

  // Busca recomendações para cada pet
  const recomendacoesPorPet = pets
    .map(function (pet) {
      const recomendacoes = recomendarProdutos(pet, 4)
        .filter(function (p) {
          return p.id !== produto.id;
        })
        .slice(0, 2);
      return { pet: pet, produtos: recomendacoes };
    })
    .filter(function (item) {
      return item.produtos.length > 0;
    });

  function handleAddToCart() {
    adicionarAoCarrinho(produto, quantidade);
    addToast(
      `${produto.title} (${quantidade}x) adicionado ao carrinho! 🛒`,
      "success",
    );
  }

  function handleComprarAgora() {
    adicionarAoCarrinho(produto, quantidade); // ← Usa a função do contexto
    navigate("/carrinho");
  }

  const estilo = {
    container: {
      minHeight: "100vh",
      background: "#f5f5f5",
      padding: "20px",
    },
    breadcrumb: {
      maxWidth: "1200px",
      margin: "0 auto 20px",
      padding: "10px 0",
      color: "#666",
      fontSize: "0.9rem",
    },
    breadcrumbLink: {
      color: "#667eea",
      textDecoration: "none",
    },
    mainSection: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "40px",
      background: "white",
      borderRadius: "20px",
      padding: "40px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    },
    imagensContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "15px",
    },
    imagemPrincipal: {
      width: "100%",
      height: "400px",
      objectFit: "cover",
      borderRadius: "15px",
      border: "2px solid #f0f0f0",
    },
    miniaturasContainer: {
      display: "flex",
      gap: "10px",
    },
    miniatura: function (ativo) {
      return {
        width: "80px",
        height: "80px",
        objectFit: "cover",
        borderRadius: "10px",
        cursor: "pointer",
        border: ativo ? "3px solid #667eea" : "2px solid #e0e0e0",
        opacity: ativo ? 1 : 0.6,
        transition: "all 0.3s",
      };
    },
    infoContainer: {
      display: "flex",
      flexDirection: "column",
      gap: "20px",
    },
    categoria: {
      display: "inline-block",
      background: "#e8e0ff",
      color: "#5e35b1",
      padding: "5px 15px",
      borderRadius: "20px",
      fontSize: "0.85rem",
      fontWeight: "500",
    },
    titulo: {
      fontSize: "2rem",
      color: "#333",
      margin: 0,
    },
    avaliacaoContainer: {
      display: "flex",
      alignItems: "center",
      gap: "10px",
    },
    estrelas: {
      color: "#ffc107",
      fontSize: "1.2rem",
    },
    avaliacaoTexto: {
      color: "#666",
      fontSize: "0.9rem",
    },
    preco: {
      fontSize: "2.5rem",
      color: "#667eea",
      fontWeight: "bold",
      margin: 0,
    },
    precoParcelado: {
      color: "#666",
      fontSize: "0.9rem",
    },
    descricao: {
      color: "#555",
      lineHeight: "1.6",
      fontSize: "1rem",
    },
    tagsContainer: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
    },
    tag: {
      background: "#f0f0f0",
      color: "#666",
      padding: "6px 12px",
      borderRadius: "20px",
      fontSize: "0.8rem",
      display: "flex",
      alignItems: "center",
      gap: "5px",
    },
    infoGrid: {
      display: "grid",
      gridTemplateColumns: "1fr 1fr",
      gap: "15px",
      background: "#f8f9fa",
      padding: "20px",
      borderRadius: "15px",
    },
    infoItem: {
      display: "flex",
      flexDirection: "column",
      gap: "3px",
    },
    infoLabel: {
      fontSize: "0.75rem",
      color: "#999",
      textTransform: "uppercase",
      fontWeight: "500",
    },
    infoValue: {
      fontSize: "0.9rem",
      color: "#333",
      fontWeight: "500",
    },
    quantidadeContainer: {
      display: "flex",
      alignItems: "center",
      gap: "15px",
    },
    quantidadeBtn: {
      width: "35px",
      height: "35px",
      borderRadius: "50%",
      border: "2px solid #e0e0e0",
      background: "white",
      fontSize: "1.2rem",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      transition: "all 0.3s",
    },
    quantidadeInput: {
      width: "50px",
      textAlign: "center",
      border: "none",
      fontSize: "1.2rem",
      fontWeight: "bold",
      color: "#333",
    },
    botoesContainer: {
      display: "flex",
      gap: "15px",
    },
    btnCarrinho: {
      flex: 1,
      padding: "15px",
      borderRadius: "10px",
      border: "none",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      color: "white",
      transition: "transform 0.2s",
    },
    btnComprar: {
      flex: 1,
      padding: "15px",
      borderRadius: "10px",
      border: "none",
      fontSize: "1rem",
      fontWeight: "bold",
      cursor: "pointer",
      background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
      color: "white",
      transition: "transform 0.2s",
    },
  };

  return (
    <div style={estilo.container}>
      {/* Breadcrumb */}
      <div style={estilo.breadcrumb}>
        <Link to="/" style={estilo.breadcrumbLink}>
          Home
        </Link>
        {" > "}
        <Link to="/loja" style={estilo.breadcrumbLink}>
          Loja
        </Link>
        {" > "}
        <span>{produto.title}</span>
      </div>

      {/* Seção Principal */}
      <div style={estilo.mainSection}>
        {/* Coluna de Imagens */}
        <div style={estilo.imagensContainer}>
          <img
            src={produto.images[imagemSelecionada]}
            alt={produto.title}
            style={estilo.imagemPrincipal}
          />
          <div style={estilo.miniaturasContainer}>
            {produto.images.map(function (img, index) {
              return (
                <img
                  key={index}
                  src={img}
                  alt={`${produto.title} ${index + 1}`}
                  style={estilo.miniatura(imagemSelecionada === index)}
                  onClick={function () {
                    setImagemSelecionada(index);
                  }}
                  onMouseEnter={function () {
                    setImagemSelecionada(index);
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* Coluna de Informações */}
        <div style={estilo.infoContainer}>
          <span style={estilo.categoria}>
            {produto.categoria === "caes"
              ? "🐕 Cães"
              : produto.categoria === "gatos"
                ? "🐈 Gatos"
                : "🐾 Outros"}
          </span>

          <h1 style={estilo.titulo}>{produto.title}</h1>

          {/* Avaliação */}
          <div style={estilo.avaliacaoContainer}>
            <span style={estilo.estrelas}>
              {"★".repeat(Math.floor(produto.avaliacao))}
              {produto.avaliacao % 1 !== 0 ? "½" : ""}
            </span>
            <span style={estilo.avaliacaoTexto}>
              {produto.avaliacao} ({produto.numAvaliacoes} avaliações)
            </span>
            <span
              style={{
                color: "#667eea",
                fontSize: "0.85rem",
                cursor: "pointer",
              }}
            >
              | Avaliar
            </span>
          </div>

          {/* Preço */}
          <div>
            <h2 style={estilo.preco}>
              R$ {(produto.price * quantidade).toFixed(2)}
            </h2>
            <p style={estilo.precoParcelado}>
              ou 3x de R$ {(produto.price / 3).toFixed(2)} sem juros
            </p>
          </div>

          {/* Descrição */}
          <p style={estilo.descricao}>{produto.descricaoCompleta}</p>

          {/* Tags */}
          <div style={estilo.tagsContainer}>
            <span style={estilo.tag}>📏 {produto.porte}</span>
            <span style={estilo.tag}>🎂 {produto.idade}</span>
            <span style={estilo.tag}>🧱 {produto.material}</span>
            <span style={estilo.tag}>🎯 {produto.finalidade}</span>
          </div>

          {/* Comportamentos Indicados */}
          <div>
            <label
              style={{
                color: "#555",
                fontWeight: "500",
                fontSize: "0.9rem",
                display: "block",
                marginBottom: "8px",
              }}
            >
              🎭 Indicado para pets:
            </label>
            <div style={estilo.tagsContainer}>
              {produto.comportamentosIndicados.map(function (comp) {
                return (
                  <span
                    key={comp}
                    style={{
                      ...estilo.tag,
                      background: "#e8f5e9",
                      color: "#2e7d32",
                    }}
                  >
                    {comp}
                  </span>
                );
              })}
            </div>
          </div>

          {/* Contraindicações */}
          {produto.contraindicadoAlergias.length > 0 && (
            <div>
              <label
                style={{
                  color: "#d63031",
                  fontWeight: "500",
                  fontSize: "0.9rem",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                ⚠️ Contraindicado para alergias:
              </label>
              <div style={estilo.tagsContainer}>
                {produto.contraindicadoAlergias.map(function (alergia) {
                  return (
                    <span
                      key={alergia}
                      style={{
                        ...estilo.tag,
                        background: "#ffe0e0",
                        color: "#d63031",
                      }}
                    >
                      {alergia}
                    </span>
                  );
                })}
              </div>
            </div>
          )}

          {/* Informações Técnicas */}
          <div style={estilo.infoGrid}>
            <div style={estilo.infoItem}>
              <span style={estilo.infoLabel}>Dimensões</span>
              <span style={estilo.infoValue}>{produto.dimensoes}</span>
            </div>
            <div style={estilo.infoItem}>
              <span style={estilo.infoLabel}>Peso do Produto</span>
              <span style={estilo.infoValue}>{produto.pesoProduto}</span>
            </div>
            <div style={estilo.infoItem}>
              <span style={estilo.infoLabel}>Garantia</span>
              <span style={estilo.infoValue}>{produto.garantia}</span>
            </div>
            <div style={estilo.infoItem}>
              <span style={estilo.infoLabel}>Origem</span>
              <span style={estilo.infoValue}>{produto.origem}</span>
            </div>
            <div style={estilo.infoItem}>
              <span style={estilo.infoLabel}>Estoque</span>
              <span
                style={{
                  ...estilo.infoValue,
                  color:
                    produto.estoque > 10
                      ? "#2e7d32"
                      : produto.estoque > 0
                        ? "#e65100"
                        : "#d63031",
                }}
              >
                {produto.estoque > 10
                  ? "✓ Em estoque"
                  : produto.estoque > 0
                    ? `⚠️ Últimas ${produto.estoque} unidades`
                    : "✗ Fora de estoque"}
              </span>
            </div>
          </div>

          {/* Quantidade */}
          <div style={estilo.quantidadeContainer}>
            <span style={{ color: "#555", fontWeight: "500" }}>
              Quantidade:
            </span>
            <button
              style={estilo.quantidadeBtn}
              onClick={function () {
                if (quantidade > 1) setQuantidade(quantidade - 1);
              }}
            >
              −
            </button>
            <input
              type="text"
              value={quantidade}
              readOnly
              style={estilo.quantidadeInput}
            />
            <button
              style={estilo.quantidadeBtn}
              onClick={function () {
                if (quantidade < produto.estoque) setQuantidade(quantidade + 1);
              }}
            >
              +
            </button>
          </div>

          {/* Botões */}
          <div style={estilo.botoesContainer}>
            <button
              style={estilo.btnCarrinho}
              onClick={handleAddToCart}
              onMouseEnter={function (e) {
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={function (e) {
                e.target.style.transform = "translateY(0)";
              }}
            >
              🛒 Adicionar ao Carrinho
            </button>
            <button
              style={estilo.btnComprar}
              onClick={handleComprarAgora}
              onMouseEnter={function (e) {
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseLeave={function (e) {
                e.target.style.transform = "translateY(0)";
              }}
            >
              ⚡ Comprar Agora
            </button>
          </div>
        </div>
      </div>

      {/* Seção de Recomendações para seus Pets */}
      {usuario && recomendacoesPorPet.length > 0 && (
        <div
          style={{
            maxWidth: "1200px",
            margin: "40px auto",
            background: "white",
            borderRadius: "20px",
            padding: "30px",
            boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
          }}
        >
          <h2
            style={{
              color: "#333",
              marginTop: 0,
              marginBottom: "20px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
            }}
          >
            🎯 Recomendado para seus Pets
            <span
              style={{
                fontSize: "0.8rem",
                color: "#999",
                fontWeight: "normal",
              }}
            >
              (compatível com perfil)
            </span>
          </h2>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
              gap: "20px",
            }}
          >
            {recomendacoesPorPet.map(function (item) {
              return (
                <div key={item.pet.id}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      marginBottom: "15px",
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>
                      {item.pet.tipo === "cachorro"
                        ? "🐕"
                        : item.pet.tipo === "gato"
                          ? "🐈"
                          : "🐾"}
                    </span>
                    <strong style={{ color: "#333", fontSize: "0.95rem" }}>
                      Para {item.pet.nomePet}
                    </strong>
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "10px",
                    }}
                  >
                    {item.produtos.map(function (prod) {
                      return (
                        <Link
                          key={prod.id}
                          to={`/produto/${prod.id}`}
                          style={{ textDecoration: "none" }}
                        >
                          <div
                            style={{
                              display: "flex",
                              gap: "12px",
                              padding: "10px",
                              borderRadius: "10px",
                              border: "1px solid #e0e0e0",
                              transition: "all 0.3s",
                              cursor: "pointer",
                            }}
                            onMouseEnter={function (e) {
                              e.currentTarget.style.borderColor = "#667eea";
                              e.currentTarget.style.boxShadow =
                                "0 4px 15px rgba(0,0,0,0.1)";
                            }}
                            onMouseLeave={function (e) {
                              e.currentTarget.style.borderColor = "#e0e0e0";
                              e.currentTarget.style.boxShadow = "none";
                            }}
                          >
                            <img
                              src={prod.image}
                              alt={prod.title}
                              style={{
                                width: "60px",
                                height: "60px",
                                objectFit: "cover",
                                borderRadius: "8px",
                              }}
                            />
                            <div>
                              <h4
                                style={{
                                  margin: "0 0 3px 0",
                                  color: "#333",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {prod.title}
                              </h4>
                              <p
                                style={{
                                  margin: 0,
                                  color: "#667eea",
                                  fontWeight: "bold",
                                  fontSize: "0.85rem",
                                }}
                              >
                                R$ {prod.price.toFixed(2)}
                              </p>
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
