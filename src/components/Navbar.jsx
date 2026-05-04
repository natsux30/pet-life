import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import "../Style.css";

function Navbar() {
  const { usuario, logoutUser } = useApp();
  const [menuAberto, setMenuAberto] = useState(false);

  function handleLogout() {
    logoutUser();
    setMenuAberto(false);
  }

  function toggleMenu() {
    setMenuAberto(!menuAberto);
  }

  function fecharMenu() {
    setMenuAberto(false);
  }

  // Fecha o menu ao clicar em um link
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

        {/* Menu mobile toggle */}
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
          {/* Botão Loja */}
          <li className="navbar__item">
            <Link to="/loja" className="navbar__links" onClick={fecharMenu}>
              🏪 Loja
            </Link>
          </li>
          {/* Carrinho */}
          <li className="navbar__item">
            <Link to="/carrinho" className="navbar__links" onClick={fecharMenu}>
              🛒 Carrinho
            </Link>
          </li>

          {/* Perfil (só aparece se estiver logado) */}
          {usuario && (
            <li className="navbar__item">
              <Link to="/perfil" className="navbar__links" onClick={fecharMenu}>
                👤 Perfil
              </Link>
            </li>
          )}

          {/* Login ou Logout/Nome do usuário */}
          {usuario ? (
            <>
              <li className="navbar__item">
                <span className="navbar__user-name">
                  Olá, {usuario.nome.split(" ")[0]}
                </span>
              </li>
              <li className="navbar__btn">
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
              <li className="navbar__btn">
                <Link to="/login" className="button" onClick={fecharMenu}>
                  Login
                </Link>
              </li>
              <li className="navbar__btn">
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
