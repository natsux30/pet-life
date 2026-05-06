import { todosProdutos } from "../data/produtos";
import React from "react";
import { Link } from "react-router-dom";
import ProductCard from "../components/Card";
import Cg from "../components/Cg";
import "../Style.css";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";

function Home() {
  const { adicionarAoCarrinho } = useApp();
  const { addToast } = useToast();
  function handleAddToCart(product) {
    adicionarAoCarrinho(product, 1);
    addToast(`${product.title} adicionado ao carrinho! 🛒`, "success");
  }
  const products = [
    {
    id: 6,
    title: "Torre de Atividades",
    price: 129.9,
    image:
      "https://images.pexels.com/photos/10117705/pexels-photo-10117705.jpeg",
    images: [
      "https://images.pexels.com/photos/10117705/pexels-photo-10117705.jpeg",
      "https://images.pexels.com/photos/7725617/pexels-photo-7725617.jpeg",
      "https://images.pexels.com/photos/7725966/pexels-photo-7725966.jpeg",
    ],
    description:
      "Torre com múltiplas atividades e esconderijos. Ideal para gatos curiosos e exploradores.",
    descricaoCompleta:
      "A Torre de Atividades foi projetada para estimular a inteligência do seu gato. Com esconderijos, plataformas em diferentes alturas, brinquedos pendurados e arranhadores, seu felino nunca vai ficar entediado. Ideal para apartamentos e casas com pouco espaço.",
    categoria: "gatos",
    porte: "medio",
    idade: "filhote",
    material: "madeira",
    finalidade: "escalar",
    comportamentosIndicados: [
      "Curioso",
      "Energético",
      "Independente",
      "Brincalhão",
    ],
    contraindicadoAlergias: ["Madeira", "Ácaros"],
    destaque: true,
    estoque: 5,
    avaliacao: 4.7,
    numAvaliacoes: 42,
    dimensoes: "60cm x 40cm x 80cm",
    pesoProduto: "12kg",
    garantia: "6 meses",
    origem: "Brasil",
    palavrasChave: [
      "torre",
      "atividades",
      "gato",
      "escalar",
      "madeira",
      "explorar",
    ],
  },
  {
    id: 7,
    title: "Corda de Algodão Trançada",
    price: 19.9,
    image:
      "https://images.pexels.com/photos/14534161/pexels-photo-14534161.jpeg",
    images: [
      "https://images.pexels.com/photos/14534161/pexels-photo-14534161.jpeg",
      "https://images.pexels.com/photos/36053854/pexels-photo-36053854.jpeg",
      "https://images.pexels.com/photos/18478445/pexels-photo-18478445.jpeg",
    ],
    description:
      "Corda resistente de algodão natural. Perfeita para cães sociáveis que adoram brincar junto.",
    descricaoCompleta:
      "A Corda de Algodão Trançada é o brinquedo ideal para brincadeiras de cabo de guerra. Feita com algodão 100% natural, é macia para a boca do pet mas resistente o suficiente para suportar puxões fortes. Ajuda a fortalecer a mandíbula e cria momentos de diversão entre você e seu cão.",
    categoria: "caes",
    porte: "grande",
    idade: "adulto",
    material: "algodao",
    finalidade: "exercicio",
    comportamentosIndicados: [
      "Brincalhão",
      "Energético",
      "Sociável",
      "Agitado",
    ],
    contraindicadoAlergias: ["Algodão", "Poeira"],
    destaque: false,
    estoque: 40,
    avaliacao: 4.4,
    numAvaliacoes: 63,
    dimensoes: "30cm de comprimento",
    pesoProduto: "300g",
    garantia: "1 mês",
    origem: "Brasil",
    palavrasChave: ["corda", "algodão", "cabo", "guerra", "puxar", "natural"],
  },
  {
    id: 10,
    title: "Bolinha com Catnip Orgânico",
    price: 12.9,
    image: "https://images.pexels.com/photos/35576973/pexels-photo-35576973.jpeg",
    images: [
      "https://images.pexels.com/photos/35576973/pexels-photo-35576973.jpeg",
      "https://images.pexels.com/photos/20273025/pexels-photo-20273025.jpeg",
      "https://images.pexels.com/photos/30678900/pexels-photo-30678900.jpeg",
    ],
    description:
      "Bolinha de tecido natural com catnip orgânico. Segura e atóxica para gatos sensíveis.",
    descricaoCompleta:
      "A Bolinha com Catnip Orgânico é feita com tecido 100% natural e recheada com catnip orgânico certificado. É a opção mais segura para gatos com sensibilidades ou alergias. O formato de bolinha estimula o instinto de perseguição e pode ser usada tanto para brincadeiras solo quanto interativas.",
    categoria: "gatos",
    porte: "pequeno",
    idade: "idoso",
    material: "tecido",
    finalidade: "cacar",
    comportamentosIndicados: ["Tímido", "Calmo", "Medroso", "Sociável"],
    contraindicadoAlergias: ["Pelúcia sintética"],
    destaque: false,
    estoque: 45,
    avaliacao: 4.4,
    numAvaliacoes: 29,
    dimensoes: "Diâmetro 4cm",
    pesoProduto: "20g",
    garantia: "Sem garantia",
    origem: "Brasil",
    palavrasChave: [
      "bolinha",
      "catnip",
      "orgânico",
      "gato",
      "natural",
      "atóxico",
    ],
  },
  {
    id: 11,
    title: "Frisbee Flexível",
    price: 39.9,
    image: "https://images.pexels.com/photos/4459795/pexels-photo-4459795.png",
    images: [
      "https://images.pexels.com/photos/4459795/pexels-photo-4459795.png",
      "https://images.pexels.com/photos/16730620/pexels-photo-16730620.jpeg",
    ],
    description:
      "Frisbee flexível e seguro. Ideal para cães ativos que adoram correr e buscar.",
    descricaoCompleta:
      "O Frisbee Flexível foi desenvolvido especialmente para cães. Com bordas macias que não machucam a boca do pet, é perfeito para brincadeiras ao ar livre. O material flexível absorve impactos e volta ao formato original. Disponível em cores vibrantes fáceis de localizar na grama.",
    categoria: "caes",
    porte: "grande",
    idade: "adulto",
    material: "borracha",
    finalidade: "exercicio",
    comportamentosIndicados: [
      "Agitado",
      "Brincalhão",
      "Energético",
      "Protetor",
    ],
    contraindicadoAlergias: ["Borracha", "Látex"],
    destaque: false,
    estoque: 35,
    avaliacao: 4.7,
    numAvaliacoes: 54,
    dimensoes: "Diâmetro 25cm",
    pesoProduto: "180g",
    garantia: "2 meses",
    origem: "Brasil",
    palavrasChave: [
      "frisbee",
      "disco",
      "flexível",
      "cachorro",
      "lançar",
      "correr",
    ],
  },
  ];

  const beneficios = [
    {
      icone: "🚚",
      titulo: "Frete Grátis",
      descricao: "Nas compras acima de R$ 99",
    },
    {
      icone: "🔒",
      titulo: "Pagamento Seguro",
      descricao: "Ambiente 100% seguro",
    },
    {
      icone: "🎯",
      titulo: "Produtos Premium",
      descricao: "Qualidade garantida",
    },
    {
      icone: "💝",
      titulo: "Seu Pet Feliz",
      descricao: "Satisfação garantida",
    },
  ];

  const depoimentos = [
    {
      nome: "Maria Silva",
      pet: "🐕 Rex",
      texto: "Meu cachorro ama os brinquedos! Entrega super rápida.",
      estrelas: 5,
    },
    {
      nome: "João Santos",
      pet: "🐈 Mia",
      texto: "O arranhador é excelente qualidade. Minha gata aprovou!",
      estrelas: 5,
    },
    {
      nome: "Ana Costa",
      pet: "🐰 Bob",
      texto: "Variedade incrível de produtos. Recomendo muito!",
      estrelas: 4,
    },
  ];

  const containerStyle = {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "30px",
    padding: "40px 20px",
    maxWidth: "1200px",
    margin: "0 auto",
  };

  return (
    <div>
      {/* ========== HERO SECTION ========== */}
      <div
        style={{
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "800px", margin: "0 auto" }}>
          <h1
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              marginBottom: "20px",
              fontWeight: "bold",
            }}
          >
            🐾 Pets-LifeStyle
          </h1>
          <p
            style={{
              fontSize: "clamp(1rem, 3vw, 1.5rem)",
              marginBottom: "30px",
              opacity: "0.9",
            }}
          >
            Os melhores brinquedos para seu melhor amigo!
            <br />
            Produtos premium com amor e diversão garantida.
          </p>
          <div
            style={{
              display: "flex",
              gap: "15px",
              justifyContent: "center",
              flexWrap: "wrap",
            }}
          >
            <Link to="/cadastro">
              <button
                style={{
                  background: "white",
                  color: "#667eea",
                  border: "none",
                  padding: "15px 35px",
                  borderRadius: "50px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
              >
                Criar Conta Grátis
              </button>
            </Link>
            <a href="/loja">
              <button
                style={{
                  background: "transparent",
                  color: "white",
                  border: "2px solid white",
                  padding: "15px 35px",
                  borderRadius: "50px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: "pointer",
                  transition: "transform 0.3s",
                }}
              >
                Ver Produtos
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* ========== BENEFÍCIOS ========== */}
      <div
        style={{
          background: "#f8f9fa",
          padding: "60px 20px",
        }}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "30px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {beneficios.map(function (beneficio, index) {
            return (
              <div
                key={index}
                style={{
                  textAlign: "center",
                  padding: "30px 20px",
                  background: "white",
                  borderRadius: "15px",
                  boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
                  transition: "transform 0.3s",
                }}
              >
                <div style={{ fontSize: "3rem", marginBottom: "15px" }}>
                  {beneficio.icone}
                </div>
                <h3 style={{ color: "#333", marginBottom: "10px" }}>
                  {beneficio.titulo}
                </h3>
                <p style={{ color: "#666", fontSize: "0.9rem" }}>
                  {beneficio.descricao}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========== PRODUTOS EM DESTAQUE ========== */}
      <div
        id="produtos"
        style={{
          padding: "60px 20px",
          background: "white",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              color: "#333",
              marginBottom: "10px",
            }}
          >
            🌟 Produtos em Destaque
          </h2>
          <p style={{ color: "#666", fontSize: "1.1rem" }}>
            Confira nossa seleção especial para seu pet
          </p>
        </div>

        <div style={containerStyle}>
          {products.map(function (product) {
            return (
              <ProductCard
                key={product.id}
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                description={product.description}
                onAddToCart={function () {
                  handleAddToCart(product);
                }} // ← ASSIM
              />
            );
          })}
        </div>

        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <Link to="/links">
            <button
              style={{
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "15px 40px",
                borderRadius: "50px",
                fontSize: "1.1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Ver Todos os Produtos →
            </button>
          </Link>
        </div>
      </div>

      {/* ========== DEPOIMENTOS ========== */}
      <div
        style={{
          background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
          padding: "60px 20px",
          color: "white",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "50px" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              marginBottom: "10px",
            }}
          >
            💬 O que dizem nossos clientes
          </h2>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "30px",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          {depoimentos.map(function (depoimento, index) {
            return (
              <div
                key={index}
                style={{
                  background: "rgba(255,255,255,0.1)",
                  backdropFilter: "blur(10px)",
                  padding: "30px",
                  borderRadius: "15px",
                  border: "1px solid rgba(255,255,255,0.2)",
                }}
              >
                <div style={{ fontSize: "2rem", marginBottom: "10px" }}>
                  {"⭐".repeat(depoimento.estrelas)}
                </div>
                <p
                  style={{
                    fontSize: "1rem",
                    lineHeight: "1.6",
                    marginBottom: "20px",
                    fontStyle: "italic",
                  }}
                >
                  "{depoimento.texto}"
                </p>
                <div>
                  <strong>{depoimento.nome}</strong>
                  <span style={{ marginLeft: "10px" }}>{depoimento.pet}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========== CTA FINAL ========== */}
      <div
        style={{
          background: "#131313",
          padding: "80px 20px",
          textAlign: "center",
          color: "white",
        }}
      >
        <div style={{ maxWidth: "600px", margin: "0 auto" }}>
          <h2
            style={{
              fontSize: "clamp(1.5rem, 4vw, 2.5rem)",
              marginBottom: "20px",
            }}
          >
            🎉 Pronto para mimar seu pet?
          </h2>
          <p
            style={{
              fontSize: "1.1rem",
              marginBottom: "30px",
              opacity: "0.8",
            }}
          >
            Cadastre-se agora e ganhe 10% de desconto na primeira compra!
          </p>
          <Link to="/cadastro">
            <button
              style={{
                background:
                  "linear-gradient(to right, #ff0844 0%, #ffb199 100%)",
                color: "white",
                border: "none",
                padding: "15px 50px",
                borderRadius: "50px",
                fontSize: "1.2rem",
                fontWeight: "bold",
                cursor: "pointer",
                transition: "transform 0.3s",
              }}
            >
              Quero meu desconto! 🎁
            </button>
          </Link>
        </div>
      </div>

      {/* ========== FOOTER SIMPLES ========== */}
      <footer
        style={{
          background: "#0a0a0a",
          color: "#999",
          padding: "30px 20px",
          textAlign: "center",
          fontSize: "0.9rem",
        }}
      >
        <p>© 2024 Pets-LifeStyle - Todos os direitos reservados</p>
        <p style={{ marginTop: "10px" }}>Feito com ❤️ para pets felizes</p>
      </footer>
    </div>
  );
}

export default Home;
