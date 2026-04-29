import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ProductCard from "./components/Card";
import Home from "./Pages/Home";
import Carrinho from "./Pages/Carrinho";
import Perfil from "./Pages/Perfil";
import Links from "./Pages/Links";
import Login from "./Pages/Login";
import './Style.css';

const container = {
    display: "flex",
    gap: "20px",
    padding: "20px",
    flexWrap: "wrap"
};

function App() {
    const products = [
        {
            id: 1,
            title: "Headset Gamer",
            price: 299,
            image: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcTA5HKP1zRoPAYUNzEIK8U6MlGV2Ql2AeM5ctgxP4v3TodElh_Tuz7chTwXf0t7W1_AYDD-ejSYScC4B3SyIDqw1bQRiXld1YUEApgiaw5XIRnyosiT4aQx",
            description: "Som imersivo e microfone de alta qualidade"
        },
        {
            id: 2,
            title: "Teclado Mecânico",
            price: 450,
            image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQsgSLwTjk-OBSFN3MjPNRXpG-Lu_Jw-yhoapXydZwbFflRWLu9W_sNNk9vutDTMLfntYEuxMmYryvaCqN5I71n72BoV5QAHB-WcsXMtRfq9yb38GE-LgvbPQ",
            description: "Switch azul com iluminação RGB"
        },
        {
            id: 3,
            title: "Teclado Mecânicox",
            price: 450,
            image: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcQsgSLwTjk-OBSFN3MjPNRXpG-Lu_Jw-yhoapXydZwbFflRWLu9W_sNNk9vutDTMLfntYEuxMmYryvaCqN5I71n72BoV5QAHB-WcsXMtRfq9yb38GE-LgvbPQ",
            description: "Switch azul com iluminação RGB"
        }
    ];

    function handleAddToCart(product) {
        console.log("Adicionado:", product);
    }

    return (
        <BrowserRouter>
            <Navbar />

            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/carrinho" element={<Carrinho />} />
                <Route path="/perfil" element={<Perfil />} />
                <Route path="/links" element={<Links />} />
                <Route path="/login" element={<Login />} />
            </Routes>

            <div style={container}>
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
        </BrowserRouter>
    );
}

export default App;