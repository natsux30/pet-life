import { useState } from "react";
import { Link } from 'react-router-dom';
import "../Style.css";

export default function ProductCard({
    id,
    title,
    price,
    image,
    description,
    onAddToCart
}) {
    const [loading, setLoading] = useState(false);

    function handleBuy(e) {
        e.preventDefault();
        e.stopPropagation();
        setLoading(true);

        setTimeout(() => {
            if (onAddToCart) {
                onAddToCart(); // ← Chama a função passada como prop
            }
            setLoading(false);
        }, 800);
    }

    return (
        <Link 
            to={`/produto/${id}`}
            style={{ textDecoration: 'none', color: 'inherit' }}
        >
            <div className="card">
                <img src={image} alt={title} className="card-img" />
                <div className="card-body">
                    <h3 className="card-title">{title}</h3>
                    <p className="card-description">{description}</p>
                    <span className="card-price">R$ {price.toFixed(2)}</span>
                    <button
                        className="card-button"
                        onClick={handleBuy}
                        disabled={loading}
                    >
                        {loading ? "Adicionando..." : "Adicionar ao carrinho"}
                    </button>
                </div>
            </div>
        </Link>
    );
}