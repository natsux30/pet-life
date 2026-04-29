import { useState } from "react";
import "../Style.css";
export default function ProductCard({
    title,
    price,
    image,
    description,
    onAddToCart
}) {
    const [loading, setLoading] = useState(false);

    function handleBuy() {
        setLoading(true);

        setTimeout(() => {
            onAddToCart?.();
            setLoading(false);
        }, 800);
    }

    return (
        <div className="card">
            <img src={image} alt={title} className="card-img" />

            <div className="card-body">
                <h3 className="card-title">{title}</h3>

                <p className="card-description">{description}</p>

                <span className="card-price">R$ {price}</span>

                <button
                    className="card-button"
                    onClick={handleBuy}
                    disabled={loading}
                >
                    {loading ? "Adicionando..." : "Adicionar ao carrinho"}
                </button>
            </div>
        </div>
    );
}