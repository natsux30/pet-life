import { Link } from "react-router-dom";
import "../Style.css";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="navbar__container">
                <Link to="/" id="navbar__logo">Pets-LifeStyle</Link>

                <ul className="navbar__menu">
                    <li className="navbar__item">
                        <Link to="/carrinho" className="navbar__links">Carrinho</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/perfil" className="navbar__links">Perfil pet</Link>
                    </li>
                    <li className="navbar__item">
                        <Link to="/links" className="navbar__links">Links</Link>
                    </li>
                    <li className="navbar__btn">
                        <Link to="/login" className="button">Login</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;