import React from 'react';
import { Link } from 'react-router-dom';
import ProductCard from '../components/Card';
import Cg from '../components/Cg';
import '../Style.css';

function Home() {
  const products = [
    {
      id: 1,
      title: "Brinquedo Mordedor",
      price: 29.90,
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=300",
      description: "Brinquedo resistente para cães",
    },
    {
      id: 2,
      title: "Arranhador para Gatos",
      price: 89.90,
      image: "https://images.unsplash.com/photo-1545249390-6bdfa286032f?w=300",
      description: "Arranhador com 3 níveis",
    },
    {
      id: 3,
      title: "Bola Interativa",
      price: 45.90,
      image: "https://images.unsplash.com/photo-1535298941396-316d79d0e7fa?w=300",
      description: "Bola com guizo para pets",
    },
    {
      id: 4,
      title: "Ratinho de Pelúcia",
      price: 15.90,
      image: "https://images.unsplash.com/photo-1526336024174-e58f5cdd8e13?w=300",
      description: "Ratinho com catnip para gatos",
    },
  ];

  const beneficios = [
    {
      icone: '🚚',
      titulo: 'Frete Grátis',
      descricao: 'Nas compras acima de R$ 99'
    },
    {
      icone: '🔒',
      titulo: 'Pagamento Seguro',
      descricao: 'Ambiente 100% seguro'
    },
    {
      icone: '🎯',
      titulo: 'Produtos Premium',
      descricao: 'Qualidade garantida'
    },
    {
      icone: '💝',
      titulo: 'Seu Pet Feliz',
      descricao: 'Satisfação garantida'
    }
  ];

  const depoimentos = [
    {
      nome: 'Maria Silva',
      pet: '🐕 Rex',
      texto: 'Meu cachorro ama os brinquedos! Entrega super rápida.',
      estrelas: 5
    },
    {
      nome: 'João Santos',
      pet: '🐈 Mia',
      texto: 'O arranhador é excelente qualidade. Minha gata aprovou!',
      estrelas: 5
    },
    {
      nome: 'Ana Costa',
      pet: '🐰 Bob',
      texto: 'Variedade incrível de produtos. Recomendo muito!',
      estrelas: 4
    }
  ];

  function handleAddToCart(product) {
    console.log('Produto adicionado:', product);
    alert(`${product.title} adicionado ao carrinho! 🛒`);
  }

  const containerStyle = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '30px',
    padding: '40px 20px',
    maxWidth: '1200px',
    margin: '0 auto'
  };

  return (
    <div>
      {/* ========== HERO SECTION ========== */}
      <div style={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        padding: '80px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: 'clamp(2rem, 5vw, 3.5rem)',
            marginBottom: '20px',
            fontWeight: 'bold'
          }}>
            🐾 Pets-LifeStyle
          </h1>
          <p style={{
            fontSize: 'clamp(1rem, 3vw, 1.5rem)',
            marginBottom: '30px',
            opacity: '0.9'
          }}>
            Os melhores brinquedos para seu melhor amigo!
            <br />
            Produtos premium com amor e diversão garantida.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/cadastro">
              <button style={{
                background: 'white',
                color: '#667eea',
                border: 'none',
                padding: '15px 35px',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}>
                Criar Conta Grátis
              </button>
            </Link>
            <a href="/loja">
              <button style={{
                background: 'transparent',
                color: 'white',
                border: '2px solid white',
                padding: '15px 35px',
                borderRadius: '50px',
                fontSize: '1.1rem',
                fontWeight: 'bold',
                cursor: 'pointer',
                transition: 'transform 0.3s'
              }}>
                Ver Produtos
              </button>
            </a>
          </div>
        </div>
      </div>

      {/* ========== BENEFÍCIOS ========== */}
      <div style={{
        background: '#f8f9fa',
        padding: '60px 20px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {beneficios.map(function(beneficio, index) {
            return (
              <div key={index} style={{
                textAlign: 'center',
                padding: '30px 20px',
                background: 'white',
                borderRadius: '15px',
                boxShadow: '0 5px 20px rgba(0,0,0,0.1)',
                transition: 'transform 0.3s'
              }}>
                <div style={{ fontSize: '3rem', marginBottom: '15px' }}>
                  {beneficio.icone}
                </div>
                <h3 style={{ color: '#333', marginBottom: '10px' }}>
                  {beneficio.titulo}
                </h3>
                <p style={{ color: '#666', fontSize: '0.9rem' }}>
                  {beneficio.descricao}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========== PRODUTOS EM DESTAQUE ========== */}
      <div id="produtos" style={{
        padding: '60px 20px',
        background: 'white'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            color: '#333',
            marginBottom: '10px'
          }}>
            🌟 Produtos em Destaque
          </h2>
          <p style={{ color: '#666', fontSize: '1.1rem' }}>
            Confira nossa seleção especial para seu pet
          </p>
        </div>

        <div style={containerStyle}>
          {products.map(function(product) {
            return (
              <ProductCard
                key={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                description={product.description}
                onAddToCart={function() { handleAddToCart(product); }}
              />
            );
          })}
        </div>

        <div style={{ textAlign: 'center', marginTop: '40px' }}>
          <Link to="/links">
            <button style={{
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 40px',
              borderRadius: '50px',
              fontSize: '1.1rem',
              fontWeight: 'bold',
              cursor: 'pointer'
            }}>
              Ver Todos os Produtos →
            </button>
          </Link>
        </div>
      </div>

      {/* ========== DEPOIMENTOS ========== */}
      <div style={{
        background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
        padding: '60px 20px',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '50px' }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '10px'
          }}>
            💬 O que dizem nossos clientes
          </h2>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '30px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {depoimentos.map(function(depoimento, index) {
            return (
              <div key={index} style={{
                background: 'rgba(255,255,255,0.1)',
                backdropFilter: 'blur(10px)',
                padding: '30px',
                borderRadius: '15px',
                border: '1px solid rgba(255,255,255,0.2)'
              }}>
                <div style={{ fontSize: '2rem', marginBottom: '10px' }}>
                  {'⭐'.repeat(depoimento.estrelas)}
                </div>
                <p style={{
                  fontSize: '1rem',
                  lineHeight: '1.6',
                  marginBottom: '20px',
                  fontStyle: 'italic'
                }}>
                  "{depoimento.texto}"
                </p>
                <div>
                  <strong>{depoimento.nome}</strong>
                  <span style={{ marginLeft: '10px' }}>{depoimento.pet}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ========== CTA FINAL ========== */}
      <div style={{
        background: '#131313',
        padding: '80px 20px',
        textAlign: 'center',
        color: 'white'
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.5rem, 4vw, 2.5rem)',
            marginBottom: '20px'
          }}>
            🎉 Pronto para mimar seu pet?
          </h2>
          <p style={{
            fontSize: '1.1rem',
            marginBottom: '30px',
            opacity: '0.8'
          }}>
            Cadastre-se agora e ganhe 10% de desconto na primeira compra!
          </p>
          <Link to="/cadastro">
            <button style={{
              background: 'linear-gradient(to right, #ff0844 0%, #ffb199 100%)',
              color: 'white',
              border: 'none',
              padding: '15px 50px',
              borderRadius: '50px',
              fontSize: '1.2rem',
              fontWeight: 'bold',
              cursor: 'pointer',
              transition: 'transform 0.3s'
            }}>
              Quero meu desconto! 🎁
            </button>
          </Link>
        </div>
      </div>

      {/* ========== FOOTER SIMPLES ========== */}
      <footer style={{
        background: '#0a0a0a',
        color: '#999',
        padding: '30px 20px',
        textAlign: 'center',
        fontSize: '0.9rem'
      }}>
        <p>© 2024 Pets-LifeStyle - Todos os direitos reservados</p>
        <p style={{ marginTop: '10px' }}>Feito com ❤️ para pets felizes</p>
      </footer>
    </div>
  );
}

export default Home;