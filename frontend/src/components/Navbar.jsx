import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "../Style.css";

function Navbar() {
  const { usuario, logoutUser, getQuantidadeItens } = useApp();
  const quantidadeItens = getQuantidadeItens();
  const [menuAberto, setMenuAberto] = useState(false);

  function handleLogout() {
    logoutUser();
    setMenuAberto(false);
    window.location.href = "/";
  }
  function toggleMenu() {
    setMenuAberto(!menuAberto);
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  useEffect(() => {
    const links = document.querySelectorAll(".navbar__links, .button");
    function handleClick() {
      setMenuAberto(false);
    }
    links.forEach((link) => {
      link.addEventListener("click", handleClick);
    });
    return () => {
      links.forEach((link) => {
        link.removeEventListener("click", handleClick);
      });
    };
  }, []);

  return (
    <nav className="navbar">
      <div className="navbar__container">
        <Link to="/" id="navbar__logo" onClick={fecharMenu}>
          🐾 Pets-LifeStyle
        </Link>

        <div
          className={`navbar__toggle ${menuAberto ? "is-active" : ""}`}
          id="mobile-menu"
          onClick={toggleMenu}
        >
          <span className="bar"></span>
          <span className="bar"></span>
          <span className="bar"></span>
        </div>

        <ul className={`navbar__menu ${menuAberto ? "active" : ""}`}>
          <li className="navbar__item" key="nav-loja">
            <Link to="/loja" className="navbar__links" onClick={fecharMenu}>
              🏪 Loja
            </Link>
          </li>

          <li className="navbar__item" key="nav-carrinho">
            <Link to="/carrinho" className="navbar__links" onClick={fecharMenu}>
              🛒 Carrinho
            </Link>
          </li>

          {usuario && (
            <li className="navbar__item" key="nav-rastreio">
              <Link
                to="/rastreio"
                className="navbar__links"
                onClick={fecharMenu}
              >
                📦 Rastreio
              </Link>
            </li>
          )}

          {usuario && (
            <li className="navbar__item" key="nav-perfil">
              <Link to="/perfil" className="navbar__links" onClick={fecharMenu}>
                👤 Perfil
              </Link>
            </li>
          )}

          {usuario ? (
            <>
              <li className="navbar__item" key="nav-usuario">
                <span className="navbar__user-name">
                  Olá, {usuario?.nome?.split(" ")[0] || "Usuário"}
                </span>
              </li>
              <li className="navbar__btn" key="nav-sair">
                <button
                  onClick={handleLogout}
                  className="button button--logout"
                >
                  Sair
                </button>
              </li>
            </>
          ) : (
            <>
              <li className="navbar__btn" key="nav-login">
                <Link to="/login" className="button" onClick={fecharMenu}>
                  Login
                </Link>
              </li>
              <li className="navbar__btn" key="nav-cadastro">
                <Link
                  to="/cadastro"
                  className="button button--outline"
                  onClick={fecharMenu}
                >
                  Cadastro
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
