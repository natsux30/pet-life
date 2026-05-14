import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Perfil() {
  const { usuario, pets, removerPet, logoutUser } = useApp();
  const navigate = useNavigate();
  const [petParaRemover, setPetParaRemover] = useState(null);

  if (!usuario) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f5f5f5",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: "64px", marginBottom: "20px" }}>🔒</div>
          <h2 style={{ color: "#333" }}>Faça login para ver seu perfil</h2>
          <Link to="/login">
            <button
              style={{
                backgroundColor:
                  "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                color: "white",
                border: "none",
                padding: "12px 30px",
                borderRadius: "10px",
                fontSize: "16px",
                cursor: "pointer",
                marginTop: "20px",
              }}
            >
              Ir para Login
            </button>
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

  return (
    <div
      style={{ background: "whitesmoke", minHeight: "100vh", padding: "20px" }}
    >
      <div
        style={{
          maxWidth: "900px",
          margin: "0 auto",
          backgroundColor: "transparent",
        }}
      >
        {/* Cabeçalho */}
        <div
          style={{
            backgroundColor: "white",
            borderRadius: "20px",
            padding: "30px",
            color: "white",
            marginBottom: "20px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div
            style={{
              backgroundColor: "#fff",
            }}
          >
            <h1
              style={{
                margin: "0 0 10px 0",
                fontSize: "28px",
                backgroundColor: "#fff",
                color: "#008000",
              }}
            >
              👤 {usuario.nome}
            </h1>
            <p
              style={{
                margin: "0",
                opacity: "0.9",
                backgroundColor: "#fff",
                color: "#008000",
              }}
            >
              Membro desde {usuario.dataCadastro}
            </p>
          </div>
          <button
            onClick={function () {
              logoutUser();
              navigate("/");
            }}
            style={{
              background: "rgba(255,255,255,0.2)",
              color: "white",
              border: "1px solid rgba(255,255,255,0.3)",
              padding: "10px 20px",
              borderRadius: "10px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            Sair
          </button>
        </div>

        <div
          style={{
            backgroundColor: "transparent",
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}
        >
          {/* Card: Informações do Usuário */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                background: "white",
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              <h2
                style={{
                  margin: 0,
                  color: "#333",
                  fontSize: "20px",
                  background: "white",
                }}
              >
                Dados Pessoais
              </h2>
            </div>

            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "15px",
                background: "white",
              }}
            >
              <div>
                <label
                  style={{
                    color: "#999",
                    fontSize: "12px",
                    display: "block",
                    background: "white",
                  }}
                >
                  Email
                </label>
                <p
                  style={{
                    padding: "5px 0",
                    color: "#333",
                    fontSize: "16px",
                    background: "white",
                  }}
                >
                  {usuario.email}
                </p>
              </div>

              {usuario.telefone && (
                <div>
                  <label
                    style={{
                      color: "#999",
                      fontSize: "12px",
                      display: "block",
                      background: "white",
                    }}
                  >
                    Telefone
                  </label>
                  <p
                    style={{
                      padding: "5px 0",
                      color: "#333",
                      fontSize: "16px",
                      background: "white",
                    }}
                  >
                    {usuario.telefone}
                  </p>
                </div>
              )}

              {usuario.endereco && (
                <div>
                  <label
                    style={{
                      backgroundColor: "#fff",
                      color: "#999",
                      fontSize: "12px",
                      display: "block",
                    }}
                  >
                    Endereço
                  </label>
                  <p
                    style={{
                      padding: "5px 0",
                      backgroundColor: "#fff",
                      color: "#333",
                      fontSize: "16px",
                    }}
                  >
                    {usuario.endereco.rua}, {usuario.endereco.numero}
                    {usuario.endereco.complemento
                      ? " - " + usuario.endereco.complemento
                      : ""}
                  </p>
                  <p
                    style={{
                      padding: "2px 0",
                      backgroundColor: "#fff",
                      color: "#666",
                      fontSize: "14px",
                    }}
                  >
                    CEP: {usuario.endereco.cep}
                  </p>
                </div>
              )}
            </div>

            <Link to="/links">
              <button
                style={{
                  background: "#f0f0f0",
                  color: "#333",
                  border: "none",
                  padding: "10px 20px",
                  borderRadius: "10px",
                  cursor: "pointer",
                  paddingTop: "20px",
                  width: "100%",
                }}
              >
                Editar Perfil
              </button>
            </Link>
          </div>

          {/* Card: Meus Pets */}
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "30px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
            }}
          >
            <div
              style={{
                background: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: "20px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  background: "white",
                }}
              >
                <h2
                  style={{
                    margin: 0,
                    color: "#333",
                    fontSize: "20px",
                    background: "white",
                  }}
                >
                  Meus Pets
                </h2>
              </div>
              <Link to="/cadastro-pet">
                <button
                  style={{
                    backgroundColor: "#008000",
                    color: "white",
                    border: "none",
                    padding: "8px 15px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontSize: "14px",
                  }}
                >
                  + Novo Pet
                </button>
              </Link>
            </div>

            {pets.length === 0 ? (
              <div
                style={{
                  textAlign: "center",
                  padding: "40px 0",
                  background: "white",
                  color: "#999",
                }}
              >
                <div
                  style={{
                    fontSize: "48px",
                    marginBottom: "15px",
                    background: "white",
                  }}
                >
                  🐱
                </div>
                <p style={{ background: "white" }}>
                  Nenhum pet cadastrado ainda
                </p>
                <Link to="/cadastro-pet">
                  <button
                    style={{
                      background: "#008000",
                      color: "white",
                      border: "none",
                      padding: "10px 25px",
                      borderRadius: "10px",
                      cursor: "pointer",
                      marginTop: "10px",
                    }}
                  >
                    Cadastrar Pet
                  </button>
                </Link>
              </div>
            ) : (
              <div
                style={{
                  backgroundColor: "#fff",
                  display: "flex",
                  flexDirection: "column",
                  gap: "15px",
                }}
              >
                {pets.map(function (pet) {
                  return (
                    <div
                      key={pet.id}
                      style={{
                        backgroundColor: "#008000",
                        border: "2px solid #f0f0f0",
                        borderRadius: "15px",
                        padding: "20px",
                        transition: "all 0.3s",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "start",
                        }}
                      >
                        <div
                          style={{
                            display: "flex",
                            gap: "15px",
                            alignItems: "center",
                          }}
                        >
                          <div
                            style={{
                              width: "60px",
                              height: "60px",
                              borderRadius: "50%",
                              backgroundColor: "#fff",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: "30px",
                            }}
                          >
                            {getTipoPetEmoji(pet.tipo)}
                          </div>
                          <div>
                            <h3 style={{ margin: "0 0 5px 0", color: "#fff" }}>
                              {pet.nomePet}
                            </h3>
                            <p
                              style={{
                                margin: "0",
                                color: "#fff",
                                fontSize: "14px",
                              }}
                            >
                              {pet.raca} • {pet.porte}
                            </p>
                            <p
                              style={{
                                margin: "5px 0 0 0",
                                color: "#fff",
                                fontSize: "12px",
                              }}
                            >
                              🎂 {pet.idade} anos • ⚖️ {pet.peso}kg
                            </p>
                            {pet.alergias && (
                              <p
                                style={{
                                  margin: "5px 0 0 0",
                                  color: "#ffa9b4",
                                  fontSize: "12px",
                                }}
                              >
                                ⚠️ Alergias: {pet.alergias}
                              </p>
                            )}
                          </div>
                        </div>
                        <button
                          onClick={function () {
                            confirmarRemocao(pet.id);
                          }}
                          style={{
                            background: "#ffe0e0",
                            color: "#d63031",
                            border: "none",
                            padding: "8px 12px",
                            borderRadius: "8px",
                            cursor: "pointer",
                            fontSize: "12px",
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

      {/* Modal de confirmação para remover pet */}
      {petParaRemover && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "white",
              borderRadius: "20px",
              padding: "30px",
              maxWidth: "400px",
              textAlign: "center",
            }}
          >
            <div style={{ fontSize: "48px", marginBottom: "15px" }}>😢</div>
            <h3 style={{ margin: "0 0 10px 0" }}>Remover Pet</h3>
            <p style={{ color: "#666", margin: "0 0 20px 0" }}>
              Tem certeza que deseja remover este pet do seu perfil?
            </p>
            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={function () {
                  setPetParaRemover(null);
                }}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "2px solid #e0e0e0",
                  borderRadius: "10px",
                  background: "white",
                  cursor: "pointer",
                }}
              >
                Cancelar
              </button>
              <button
                onClick={executarRemocao}
                style={{
                  flex: 1,
                  padding: "12px",
                  border: "none",
                  borderRadius: "10px",
                  background: "#d63031",
                  color: "white",
                  cursor: "pointer",
                  fontWeight: "bold",
                }}
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
