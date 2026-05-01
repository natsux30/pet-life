import "../Style.css";
import Formulario from "../Pages/Form";
import Cg from "../components/Cg";
import ProductCard from "../components/Card";

function Home() {
  const products = [
    {
      id: 1,
      title: "Headset Gamer",
      price: 299,
      image:
        "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTA5HKP1zRoPAYUNzEIK8U6MlGV2Ql2AeM5ctgxP4v3TodElh_Tuz7chTwXf0t7W1_AYDD-ejSYScC4B3SyIDqw1bQRiXld1YUEApgiaw5XIRnyosiT4aQx",
      description: "Som imersivo e microfone de alta qualidade",
    },
    {
      id: 2,
      title: "Teclado Mecânico",
      price: 450,
      image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQsgSLwTjk-OBSFN3MjPNRXpG-Lu_Jw-yhoapXydZwbFflRWLu9W_sNNk9vutDTMLfntYEuxMmYryvaCqN5I71n72BoV5QAHB-WcsXMtRfq9yb38GE-LgvbPQ",
      description: "Switch azul com iluminação RGB",
    },
    {
      id: 3,
      title: "Teclado Mecânicox",
      price: 450,
      image:
        "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQsgSLwTjk-OBSFN3MjPNRXpG-Lu_Jw-yhoapXydZwbFflRWLu9W_sNNk9vutDTMLfntYEuxMmYryvaCqN5I71n72BoV5QAHB-WcsXMtRfq9yb38GE-LgvbPQ",
      description: "Switch azul com iluminação RGB",
    },
  ];

  function handleAddToCart(product) {
    console.log("Adicionado:", product);
  }

  const containerStyle = {
    display: "flex",
    gap: "20px",
    padding: "20px",
    flexWrap: "wrap",
  };

  return (
    <div className="main">
      <Cg />
      <div className="main__container">
        <div className="main__content">
          <h1>
            Veja nossos produtos{" "}
            <span className="text-highlight">
              Ou crie o perfil do seu pet
            </span>
          </h1>
          <button className="main__btn">Produtos</button>
        </div>
        <div className="main__img--container">
          <img src="/gif/vid1.gif" alt="pet" id="main__img" />
        </div>
      </div>

      {/* PRODUTOS AQUI */}
      <div style={containerStyle}>
        {products.map((product) => (
          <ProductCard
            key={product.id}
            title={product.title}
            price={product.price}
            image={product.image}
            description={product.description}
            onAddToCart={() => handleAddToCart(product)}
          />
        ))}
      </div>
    </div>
  );
}

export default Home;