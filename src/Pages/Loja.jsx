import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import ProductCard from "../components/Card";
import { useToast } from "../components/Toast";
import {
  todosProdutos,
  categorias,
  portes,
  idades,
  materiais,
  finalidades,
  getTodasSugestoes,
  recomendarProdutos,
} from "../data/produtos";

function Loja() {
  const appContext = useApp();
  const adicionarAoCarrinho = appContext.adicionarAoCarrinho;
  const pets = appContext.pets;
  const { addToast } = useToast();
  const [busca, setBusca] = useState("");
  const [sugestoes, setSugestoes] = useState([]);
  const [mostrarSugestoes, setMostrarSugestoes] = useState(false);
  const [filtrosAbertos, setFiltrosAbertos] = useState(false);
  const inputRef = useRef(null);
  const sugestoesRef = useRef(null);

  function handleAddToCart(product) {
    console.log("Context:", appContext);
    console.log("adicionarAoCarrinho:", adicionarAoCarrinho);

    if (typeof adicionarAoCarrinho === "function") {
      adicionarAoCarrinho(product, 1);
      addToast(`${product.title} adicionado ao carrinho! 🛒`, "success");
    } else {
      console.error("adicionarAoCarrinho não é uma função!");
    }
  }
  // Estados dos filtros
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("todos");
  const [porteSelecionado, setPorteSelecionado] = useState("todos");
  const [idadeSelecionada, setIdadeSelecionada] = useState("todos");
  const [materialSelecionado, setMaterialSelecionado] = useState("todos");
  const [finalidadeSelecionada, setFinalidadeSelecionada] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("relevancia");
  const [precoMin, setPrecoMin] = useState("");
  const [precoMax, setPrecoMax] = useState("");

  // Lista de sugestões baseada nos produtos
  const todasSugestoes = getTodasSugestoes();

  function handleBuscaChange(e) {
    const valor = e.target.value;
    setBusca(valor);

    if (valor.length > 0) {
      const filtradas = todasSugestoes.filter(function (sugestao) {
        return sugestao.toLowerCase().includes(valor.toLowerCase());
      });
      setSugestoes(filtradas.slice(0, 5));
      setMostrarSugestoes(true);
    } else {
      setSugestoes([]);
      setMostrarSugestoes(false);
    }
  }

  function selecionarSugestao(sugestao) {
    setBusca(sugestao);
    setMostrarSugestoes(false);
  }

  function limparFiltros() {
    setBusca("");
    setCategoriaSelecionada("todos");
    setPorteSelecionado("todos");
    setIdadeSelecionada("todos");
    setMaterialSelecionado("todos");
    setFinalidadeSelecionada("todos");
    setPrecoMin("");
    setPrecoMax("");
    setOrdenacao("relevancia");
  }

  // Fecha sugestões ao clicar fora
  useEffect(function () {
    function handleClickFora(e) {
      if (
        sugestoesRef.current &&
        !sugestoesRef.current.contains(e.target) &&
        inputRef.current &&
        !inputRef.current.contains(e.target)
      ) {
        setMostrarSugestoes(false);
      }
    }
    document.addEventListener("mousedown", handleClickFora);
    return function () {
      document.removeEventListener("mousedown", handleClickFora);
    };
  }, []);

  // Filtra os produtos
  const produtosFiltrados = todosProdutos
    .filter(function (produto) {
      const matchCategoria =
        categoriaSelecionada === "todos" ||
        produto.categoria === categoriaSelecionada;
      const matchPorte =
        porteSelecionado === "todos" || produto.porte === porteSelecionado;
      const matchIdade =
        idadeSelecionada === "todos" || produto.idade === idadeSelecionada;
      const matchMaterial =
        materialSelecionado === "todos" ||
        produto.material === materialSelecionado;
      const matchFinalidade =
        finalidadeSelecionada === "todos" ||
        produto.finalidade === finalidadeSelecionada;
      const matchPrecoMin = !precoMin || produto.price >= Number(precoMin);
      const matchPrecoMax = !precoMax || produto.price <= Number(precoMax);

      const matchBusca =
        !busca ||
        produto.title.toLowerCase().includes(busca.toLowerCase()) ||
        produto.description.toLowerCase().includes(busca.toLowerCase()) ||
        produto.palavrasChave.some(function (palavra) {
          return palavra.toLowerCase().includes(busca.toLowerCase());
        });

      return (
        matchCategoria &&
        matchPorte &&
        matchIdade &&
        matchMaterial &&
        matchFinalidade &&
        matchPrecoMin &&
        matchPrecoMax &&
        matchBusca
      );
    })
    .sort(function (a, b) {
      if (ordenacao === "menor-preco") return a.price - b.price;
      if (ordenacao === "maior-preco") return b.price - a.price;
      if (ordenacao === "nome") return a.title.localeCompare(b.title);
      if (ordenacao === "destaque") return b.destaque ? 1 : -1;
      return 0;
    });

  const filtrosAtivos =
    (categoriaSelecionada !== "todos" ? 1 : 0) +
    (porteSelecionado !== "todos" ? 1 : 0) +
    (idadeSelecionada !== "todos" ? 1 : 0) +
    (materialSelecionado !== "todos" ? 1 : 0) +
    (finalidadeSelecionada !== "todos" ? 1 : 0) +
    (precoMin ? 1 : 0) +
    (precoMax ? 1 : 0);

  const estilo = {
    container: {
      background: "#f5f5f5",
      minHeight: "100vh",
    },
    header: {
      background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
      padding: "40px 20px",
      textAlign: "center",
      color: "white",
    },
    content: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: "20px",
    },
    cardBranco: {
      background: "white",
      borderRadius: "15px",
      padding: "20px",
      marginBottom: "20px",
      boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
    },
    inputBusca: {
      width: "100%",
      padding: "15px 15px 15px 45px",
      border: "2px solid #e0e0e0",
      borderRadius: "10px",
      fontSize: "1rem",
      boxSizing: "border-box",
      transition: "border 0.3s",
    },
    btnCategoria: function (ativo) {
      return {
        padding: "10px 20px",
        borderRadius: "25px",
        border: ativo ? "2px solid #667eea" : "2px solid #e0e0e0",
        background: ativo ? "#667eea" : "white",
        color: ativo ? "white" : "#333",
        cursor: "pointer",
        fontSize: "0.9rem",
        transition: "all 0.3s",
        fontWeight: ativo ? "bold" : "normal",
      };
    },
    btnFiltro: function (ativo) {
      return {
        padding: "8px 15px",
        borderRadius: "20px",
        border: ativo ? "2px solid #667eea" : "1px solid #e0e0e0",
        background: ativo ? "#f0f0ff" : "white",
        color: ativo ? "#667eea" : "#666",
        cursor: "pointer",
        fontSize: "0.85rem",
        transition: "all 0.3s",
      };
    },
    select: {
      padding: "10px 15px",
      borderRadius: "10px",
      border: "2px solid #e0e0e0",
      fontSize: "0.9rem",
      cursor: "pointer",
      background: "white",
    },
    inputPreco: {
      padding: "10px",
      borderRadius: "10px",
      border: "2px solid #e0e0e0",
      fontSize: "0.9rem",
      width: "100px",
      boxSizing: "border-box",
    },
    gridProdutos: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
      gap: "20px",
    },
    sugestoesContainer: {
      position: "absolute",
      top: "100%",
      left: 0,
      right: 0,
      background: "white",
      borderRadius: "10px",
      boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
      zIndex: 100,
      marginTop: "5px",
      overflow: "hidden",
    },
    sugestaoItem: {
      padding: "12px 20px",
      cursor: "pointer",
      borderBottom: "1px solid #f0f0f0",
      transition: "background 0.2s",
      fontSize: "0.9rem",
      color: "#333",
    },
  };

  return (
    <div style={estilo.container}>
      {/* Header da Loja */}
      <div style={estilo.header}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "10px" }}>
          🏪 Nossa Loja
        </h1>
        <p style={{ fontSize: "1.1rem", opacity: "0.9" }}>
          Encontre o brinquedo perfeito para seu pet
        </p>
      </div>

      <div style={estilo.content}>
        {/* Barra de Busca Inteligente */}
        <div style={estilo.cardBranco}>
          <div style={{ position: "relative" }} ref={sugestoesRef}>
            <span
              style={{
                position: "absolute",
                left: "15px",
                top: "50%",
                transform: "translateY(-50%)",
                fontSize: "20px",
                zIndex: 1,
              }}
            >
              🔍
            </span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Buscar por nome, material, finalidade..."
              value={busca}
              onChange={handleBuscaChange}
              onFocus={function () {
                if (busca.length > 0) setMostrarSugestoes(true);
              }}
              style={estilo.inputBusca}
            />

            {/* Sugestões automáticas */}
            {mostrarSugestoes && sugestoes.length > 0 && (
              <div style={estilo.sugestoesContainer}>
                {sugestoes.map(function (sugestao, index) {
                  return (
                    <div
                      key={index}
                      onClick={function () {
                        selecionarSugestao(sugestao);
                      }}
                      style={estilo.sugestaoItem}
                      onMouseEnter={function (e) {
                        e.target.style.background = "#f5f5ff";
                      }}
                      onMouseLeave={function (e) {
                        e.target.style.background = "white";
                      }}
                    >
                      🔍 {sugestao}
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Categorias */}
          <div
            style={{
              display: "flex",
              gap: "10px",
              flexWrap: "wrap",
              marginTop: "20px",
              marginBottom: "15px",
            }}
          >
            {categorias.map(function (cat) {
              return (
                <button
                  key={cat.id}
                  onClick={function () {
                    setCategoriaSelecionada(cat.id);
                  }}
                  style={estilo.btnCategoria(categoriaSelecionada === cat.id)}
                >
                  {cat.icone} {cat.nome}
                </button>
              );
            })}
          </div>

          {/* Botão para abrir/fechar filtros avançados */}
          <button
            onClick={function () {
              setFiltrosAbertos(!filtrosAbertos);
            }}
            style={{
              background: filtrosAbertos ? "#667eea" : "#f0f0f0",
              color: filtrosAbertos ? "white" : "#333",
              border: "none",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "0.9rem",
              fontWeight: "bold",
              transition: "all 0.3s",
            }}
          >
            ⚙️ Filtros Avançados {filtrosAtivos > 0 ? `(${filtrosAtivos})` : ""}
            {filtrosAbertos ? " ▲" : " ▼"}
          </button>
        </div>

        {/* Filtros Avançados */}
        {filtrosAbertos && (
          <div style={estilo.cardBranco}>
            <h3 style={{ marginTop: 0, color: "#333", marginBottom: "20px" }}>
              ⚙️ Filtros Avançados
            </h3>

            {/* Porte */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  fontWeight: "bold",
                  color: "#555",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                📏 Porte do Pet
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {portes.map(function (p) {
                  return (
                    <button
                      key={p.id}
                      onClick={function () {
                        setPorteSelecionado(p.id);
                      }}
                      style={estilo.btnFiltro(porteSelecionado === p.id)}
                    >
                      {p.nome}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Idade */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  fontWeight: "bold",
                  color: "#555",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                🎂 Idade do Pet
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {idades.map(function (i) {
                  return (
                    <button
                      key={i.id}
                      onClick={function () {
                        setIdadeSelecionada(i.id);
                      }}
                      style={estilo.btnFiltro(idadeSelecionada === i.id)}
                    >
                      {i.nome}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Material */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  fontWeight: "bold",
                  color: "#555",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                🧱 Material
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {materiais.map(function (m) {
                  return (
                    <button
                      key={m.id}
                      onClick={function () {
                        setMaterialSelecionado(m.id);
                      }}
                      style={estilo.btnFiltro(materialSelecionado === m.id)}
                    >
                      {m.nome}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Finalidade */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  fontWeight: "bold",
                  color: "#555",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                🎯 Finalidade
              </label>
              <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                {finalidades.map(function (f) {
                  return (
                    <button
                      key={f.id}
                      onClick={function () {
                        setFinalidadeSelecionada(f.id);
                      }}
                      style={estilo.btnFiltro(finalidadeSelecionada === f.id)}
                    >
                      {f.nome}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Faixa de Preço */}
            <div style={{ marginBottom: "15px" }}>
              <label
                style={{
                  fontWeight: "bold",
                  color: "#555",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                💰 Faixa de Preço
              </label>
              <div
                style={{ display: "flex", gap: "10px", alignItems: "center" }}
              >
                <span>R$</span>
                <input
                  type="number"
                  placeholder="Min"
                  value={precoMin}
                  onChange={function (e) {
                    setPrecoMin(e.target.value);
                  }}
                  style={estilo.inputPreco}
                />
                <span>até</span>
                <span>R$</span>
                <input
                  type="number"
                  placeholder="Max"
                  value={precoMax}
                  onChange={function (e) {
                    setPrecoMax(e.target.value);
                  }}
                  style={estilo.inputPreco}
                />
              </div>
            </div>

            {/* Botão Limpar Filtros */}
            <button
              onClick={limparFiltros}
              style={{
                background: "#ff4757",
                color: "white",
                border: "none",
                padding: "10px 20px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              🗑️ Limpar Todos os Filtros
            </button>
          </div>
        )}

        {/* Ordenação e Contagem */}
        <div
          style={{
            ...estilo.cardBranco,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "10px",
          }}
        >
          <div style={{ color: "#666", fontSize: "0.9rem" }}>
            <strong>{produtosFiltrados.length}</strong> produto(s) encontrado(s)
          </div>
          <select
            value={ordenacao}
            onChange={function (e) {
              setOrdenacao(e.target.value);
            }}
            style={estilo.select}
          >
            <option value="relevancia">Ordenar: Relevância</option>
            <option value="destaque">Ordenar: Destaque</option>
            <option value="menor-preco">Menor Preço</option>
            <option value="maior-preco">Maior Preço</option>
            <option value="nome">Nome A-Z</option>
          </select>
        </div>

        {/* ========== SEÇÃO DE RECOMENDAÇÕES ========== */}
        {pets.length > 0 && (
          <div
            style={{
              background: "linear-gradient(135deg, #fff5f5 0%, #f0f0ff 100%)",
              borderRadius: "20px",
              padding: "30px",
              marginBottom: "30px",
              border: "2px solid #e0e0ff",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div>
                <h2
                  style={{
                    margin: "0 0 5px 0",
                    color: "#333",
                    fontSize: "1.5rem",
                  }}
                >
                  🎯 Recomendado para seus Pets
                </h2>
                <p style={{ margin: 0, color: "#666", fontSize: "0.9rem" }}>
                  Selecionamos produtos ideais para{" "}
                  {pets.length > 1 ? "seus pets" : "seu pet"}
                  com base no perfil e comportamento
                </p>
              </div>
              <Link
                to="/perfil"
                style={{
                  color: "#667eea",
                  textDecoration: "none",
                  fontSize: "0.9rem",
                  fontWeight: "500",
                }}
              >
                Gerenciar Pets →
              </Link>
            </div>

            {/* Cards dos Pets com Recomendações */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
                gap: "20px",
              }}
            >
              {pets.map(function (pet) {
                // Lista de alergias do pet
                const alergiasPet = pet.alergias
                  ? pet.alergias.split(", ").map(function (a) {
                      return a.trim().toLowerCase();
                    })
                  : [];

                // Lógica de recomendação baseada no perfil do pet
                const recomendacoes = recomendarProdutos(pet, 2);

                const tipoEmoji = {
                  cachorro: "🐕",
                  gato: "🐈",
                  ave: "🐦",
                  peixe: "🐟",
                  coelho: "🐰",
                  hamster: "🐹",
                  outro: "🐾",
                };

                return (
                  <div
                    key={pet.id}
                    style={{
                      background: "white",
                      borderRadius: "15px",
                      padding: "20px",
                      boxShadow: "0 5px 15px rgba(0,0,0,0.08)",
                    }}
                  >
                    {/* Info do Pet */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "10px",
                        marginBottom: "15px",
                        paddingBottom: "15px",
                        borderBottom: "2px solid #f0f0f0",
                      }}
                    >
                      <div
                        style={{
                          width: "45px",
                          height: "45px",
                          borderRadius: "50%",
                          background:
                            "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "22px",
                        }}
                      >
                        {tipoEmoji[pet.tipo] || "🐾"}
                      </div>
                      <div>
                        <strong style={{ color: "#333", fontSize: "1rem" }}>
                          Para {pet.nomePet}
                        </strong>
                        <p
                          style={{
                            margin: "3px 0 0 0",
                            color: "#999",
                            fontSize: "0.8rem",
                          }}
                        >
                          {pet.raca} • {pet.porte} • {pet.idade}{" "}
                          {pet.idade > 1 ? "anos" : "ano"}
                        </p>
                      </div>
                    </div>

                    {/* Badge de comportamento */}
                    {pet.comportamento && (
                      <div
                        style={{
                          background: "#e8e0ff",
                          color: "#5e35b1",
                          padding: "5px 10px",
                          borderRadius: "12px",
                          fontSize: "0.75rem",
                          display: "inline-block",
                          marginBottom: "10px",
                        }}
                      >
                        🎭 {pet.comportamento}
                      </div>
                    )}

                    {/* Alergias */}
                    {pet.alergias && (
                      <div
                        style={{
                          display: "flex",
                          gap: "4px",
                          flexWrap: "wrap",
                          marginBottom: "10px",
                        }}
                      >
                        {pet.alergias.split(", ").map(function (alergia) {
                          return (
                            <span
                              key={alergia}
                              style={{
                                background: "#ffe0e0",
                                color: "#d63031",
                                padding: "2px 8px",
                                borderRadius: "10px",
                                fontSize: "0.65rem",
                              }}
                            >
                              ⚠️ {alergia}
                            </span>
                          );
                        })}
                      </div>
                    )}

                    {/* Produtos Recomendados */}
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "10px",
                      }}
                    >
                      {recomendacoes.map(function (produto) {
                        return (
                          <div
                            key={produto.id}
                            style={{
                              border: "1px solid #e0e0e0",
                              borderRadius: "10px",
                              padding: "10px",
                              textAlign: "center",
                              cursor: "pointer",
                              transition: "all 0.3s",
                              background: "white",
                            }}
                            onMouseEnter={function (e) {
                              e.currentTarget.style.transform =
                                "translateY(-3px)";
                              e.currentTarget.style.boxShadow =
                                "0 8px 25px rgba(0,0,0,0.15)";
                              e.currentTarget.style.borderColor = "#667eea";
                            }}
                            onMouseLeave={function (e) {
                              e.currentTarget.style.transform = "translateY(0)";
                              e.currentTarget.style.boxShadow = "none";
                              e.currentTarget.style.borderColor = "#e0e0e0";
                            }}
                          >
                            <img
                              src={produto.image}
                              alt={produto.title}
                              style={{
                                width: "100%",
                                height: "100px",
                                objectFit: "cover",
                                borderRadius: "8px",
                                marginBottom: "8px",
                              }}
                            />
                            <h4
                              style={{
                                margin: "0 0 5px 0",
                                fontSize: "0.8rem",
                                color: "#333",
                              }}
                            >
                              {produto.title}
                            </h4>

                            {/* Badge de comportamento do produto */}
                            <div style={{ marginBottom: "5px" }}>
                              {produto.comportamentosIndicados
                                .slice(0, 2)
                                .map(function (comp) {
                                  const isMatch = pet.comportamento === comp;
                                  return (
                                    <span
                                      key={comp}
                                      style={{
                                        background: isMatch
                                          ? "#e8f5e9"
                                          : "#f5f5f5",
                                        color: isMatch ? "#2e7d32" : "#999",
                                        padding: "2px 6px",
                                        borderRadius: "8px",
                                        fontSize: "0.6rem",
                                        marginRight: "2px",
                                      }}
                                    >
                                      {isMatch ? "✓ " : ""}
                                      {comp}
                                    </span>
                                  );
                                })}
                            </div>

                            <p
                              style={{
                                margin: "0 0 8px 0",
                                color: "#667eea",
                                fontWeight: "bold",
                                fontSize: "0.9rem",
                              }}
                            >
                              R$ {produto.price.toFixed(2)}
                            </p>
                            <button
                              onClick={function (e) {
                                e.stopPropagation();
                                handleAddToCart(produto);
                              }}
                              style={{
                                background:
                                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                                color: "white",
                                border: "none",
                                padding: "6px 12px",
                                borderRadius: "15px",
                                fontSize: "0.75rem",
                                cursor: "pointer",
                                width: "100%",
                              }}
                            >
                              + Carrinho
                            </button>
                          </div>
                        );
                      })}
                    </div>

                    {/* Tags de compatibilidade */}
                    <div
                      style={{
                        marginTop: "10px",
                        display: "flex",
                        gap: "5px",
                        flexWrap: "wrap",
                      }}
                    >
                      {pet.porte && (
                        <span
                          style={{
                            background: "#e8f5e9",
                            color: "#2e7d32",
                            padding: "3px 8px",
                            borderRadius: "12px",
                            fontSize: "0.7rem",
                          }}
                        >
                          ✓ Porte {pet.porte}
                        </span>
                      )}
                      {pet.comportamento && (
                        <span
                          style={{
                            background: "#e8e0ff",
                            color: "#5e35b1",
                            padding: "3px 8px",
                            borderRadius: "12px",
                            fontSize: "0.7rem",
                          }}
                        >
                          🎭 {pet.comportamento}
                        </span>
                      )}
                      {alergiasPet.length > 0 && (
                        <span
                          style={{
                            background: "#fff3e0",
                            color: "#e65100",
                            padding: "3px 8px",
                            borderRadius: "12px",
                            fontSize: "0.7rem",
                          }}
                        >
                          🛡️ Filtrado por alergias
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
        {/* Banner para cadastrar pet (se não tiver pets) */}
        {pets.length === 0 && (
          <div
            style={{
              background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
              borderRadius: "20px",
              padding: "30px",
              marginBottom: "30px",
              textAlign: "center",
              color: "white",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>🐾</div>
            <h3 style={{ margin: "0 0 10px 0", fontSize: "1.3rem" }}>
              Cadastre seu Pet para Receber Recomendações!
            </h3>
            <p style={{ marginBottom: "20px", opacity: "0.9" }}>
              Assim podemos sugerir os melhores produtos para o perfil do seu
              amiguinho.
            </p>
            <Link to="/cadastro-pet">
              <button
                style={{
                  background: "white",
                  color: "#f5576c",
                  border: "none",
                  padding: "12px 30px",
                  borderRadius: "25px",
                  fontSize: "1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                }}
              >
                Cadastrar Pet Agora →
              </button>
            </Link>
          </div>
        )}

        {/* Grid de Produtos */}
        {produtosFiltrados.length > 0 ? (
          <div style={estilo.gridProdutos}>
            {produtosFiltrados.map(function (produto) {
              return (
                <ProductCard
                  key={produto.id}
                  id={produto.id}
                  title={produto.title}
                  price={produto.price}
                  image={produto.image}
                  description={produto.description}
                  onAddToCart={function () {
                    handleAddToCart(produto);
                  }} // ← ASSIM
                />
              );
            })}
          </div>
        ) : (
          <div
            style={{
              ...estilo.cardBranco,
              textAlign: "center",
              padding: "60px 20px",
            }}
          >
            <div style={{ fontSize: "64px", marginBottom: "20px" }}>🔍</div>
            <h3 style={{ color: "#333", marginBottom: "10px" }}>
              Nenhum produto encontrado
            </h3>
            <p style={{ color: "#666" }}>
              Tente buscar com outros termos ou limpar os filtros
            </p>
            <button
              onClick={limparFiltros}
              style={{
                background: "#667eea",
                color: "white",
                border: "none",
                padding: "10px 25px",
                borderRadius: "25px",
                cursor: "pointer",
                marginTop: "15px",
                fontSize: "0.9rem",
                fontWeight: "bold",
              }}
            >
              🗑️ Limpar Filtros
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default Loja;
