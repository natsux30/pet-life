import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Perfil() {
  const { usuario, pets, removerPet, logoutUser } = useApp();
  const navigate = useNavigate();
  const [petParaRemover, setPetParaRemover] = useState(null);

  useEffect(() => {
    if (usuario) {
      carregarPetsAPI();
    }
  }, [usuario]);

  // Se não houver usuário, mostra tela bloqueada
  if (!usuario) {
    return (
      <div className="perfil-bloqueado">
        <div className="perfil-bloqueado-card">
          <div className="perfil-bloqueado-icone">🔒</div>
          <h2 className="perfil-bloqueado-titulo">
            Faça login para ver seu perfil
          </h2>
          <Link to="/login">
            <button className="perfil-bloqueado-btn">Ir para Login</button>
          </Link>
        </div>
      </div>
    );
  }

  function confirmarRemocao(petId) {
    setPetParaRemover(petId);
  }

  function executarRemocao() {
    removerPet(petParaRemover);
    setPetParaRemover(null);
  }

  function getTipoPetEmoji(tipo) {
    const emojis = {
      cachorro: "🐕",
      gato: "🐈",
      ave: "🐦",
      peixe: "🐟",
      coelho: "🐰",
      hamster: "🐹",
      outro: "🐾",
    };
    return emojis[tipo] || "🐾";
  }

  async function carregarPetsAPI() {
    const token = localStorage.getItem("token");
    const res = await fetch("http://localhost:5000/api/pets", {
      headers: { Authorization: `Bearer ${token}` },
    });
    const data = await res.json();
    if (data.pets) {
      // Atualiza o estado de pets
    }
  }

  function handleSair() {
    logoutUser();
    window.location.href = "/";
  }

  return (
    <div className="perfil-container">
      <div className="perfil-wrapper">
        <div className="perfil-header">
          <div className="perfil-header-info">
            <h1 className="perfil-nome">👤 {usuario.nome}</h1>
            <p className="perfil-membro-desde">
              Membro desde {usuario.dataCadastro}
            </p>
          </div>
          <button className="perfil-sair-btn" onClick={handleSair}>
            Sair
          </button>
        </div>

        <div className="perfil-grid">
          <div className="perfil-card">
            <h2 className="perfil-card-titulo">📋 Dados Pessoais</h2>
            <div className="perfil-dados">
              <div>
                <label className="perfil-dado-label">Email</label>
                <p className="perfil-dado-valor">📧 {usuario.email}</p>
              </div>
              {usuario.telefone && (
                <div>
                  <label className="perfil-dado-label">Telefone</label>
                  <p className="perfil-dado-valor">📱 {usuario.telefone}</p>
                </div>
              )}
              {usuario.endereco && (
                <div>
                  <label className="perfil-dado-label">Endereço</label>
                  <p className="perfil-dado-endereco">
                    📍 {usuario.endereco.rua}, {usuario.endereco.numero}
                    {usuario.endereco.complemento
                      ? " - " + usuario.endereco.complemento
                      : ""}
                  </p>
                  <p className="perfil-dado-cep">CEP: {usuario.endereco.cep}</p>
                </div>
              )}
            </div>
            <Link to="/links">
              <button className="perfil-editar-btn">Editar Perfil</button>
            </Link>
          </div>

          <div className="perfil-card">
            <div className="perfil-pets-header">
              <h2 className="perfil-pets-titulo">🐾 Meus Pets</h2>
              <Link to="/cadastro-pet">
                <button className="perfil-novo-pet-btn">+ Novo Pet</button>
              </Link>
            </div>

            {pets.length === 0 ? (
              <div className="perfil-pets-vazio">
                <div className="perfil-pets-vazio-icone">🐱</div>
                <p className="perfil-pets-vazio-texto">
                  Nenhum pet cadastrado ainda
                </p>
                <Link to="/cadastro-pet">
                  <button
                    className="perfil-novo-pet-btn"
                    style={{ marginTop: "10px", padding: "10px 25px" }}
                  >
                    Cadastrar Pet
                  </button>
                </Link>
              </div>
            ) : (
              <div className="perfil-pets-lista">
                {pets.map(function (pet) {
                  return (
                    <div key={pet.id} className="perfil-pet-card">
                      <div className="perfil-pet-card-inner">
                        <div className="perfil-pet-info">
                          <div className="perfil-pet-avatar">
                            {getTipoPetEmoji(pet.tipo)}
                          </div>
                          <div>
                            <h3 className="perfil-pet-nome">{pet.nomePet}</h3>
                            <p className="perfil-pet-raca">
                              {pet.raca} • {pet.porte}
                            </p>
                            <p className="perfil-pet-detalhes">
                              🎂 {pet.idade} anos • ⚖️ {pet.peso}kg
                            </p>
                            {pet.alergias && (
                              <p className="perfil-pet-alergias">
                                ⚠️ Alergias: {pet.alergias}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          className="perfil-pet-remover-btn"
                          onClick={function () {
                            confirmarRemocao(pet.id);
                          }}
                        >
                          🗑️
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>

      {petParaRemover && (
        <div className="perfil-modal-overlay">
          <div className="perfil-modal">
            <div className="perfil-modal-icone">😢</div>
            <h3 className="perfil-modal-titulo">Remover Pet</h3>
            <p className="perfil-modal-texto">
              Tem certeza que deseja remover este pet?
            </p>
            <div className="perfil-modal-botoes">
              <button
                className="perfil-modal-cancelar"
                onClick={function () {
                  setPetParaRemover(null);
                }}
              >
                Cancelar
              </button>
              <button
                className="perfil-modal-remover"
                onClick={executarRemocao}
              >
                Remover
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Perfil;
