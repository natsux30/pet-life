import { useApp } from "../context/AppContext";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useCep } from "../hooks/useCep";

const Cadastro = () => {
  const navigate = useNavigate();
  const { loginUser } = useApp();
  const [step, setStep] = useState(1);
  const { buscarCep, loading: loadingCep, erro: erroCep } = useCep();
  const [formData, setFormData] = useState({
    nome: "",
    email: "",
    senha: "",
    confirmarSenha: "",
    telefone: "",
    cep: "",
    endereco: "",
    numero: "",
    complemento: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validateStep = (stepNumber) => {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.nome || formData.nome.length < 3) {
        newErrors.nome = "Nome deve ter no mínimo 3 caracteres";
      }
      if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Email inválido";
      }
      if (!formData.senha || formData.senha.length < 6) {
        newErrors.senha = "Senha deve ter no mínimo 6 caracteres";
      }
      if (formData.senha !== formData.confirmarSenha) {
        newErrors.confirmarSenha = "Senhas não conferem";
      }
    } else if (stepNumber === 2) {
      if (!formData.telefone) {
        newErrors.telefone = "Telefone é obrigatório";
      }
      if (!formData.cep || formData.cep.length < 8) {
        newErrors.cep = "CEP inválido";
      }
      if (!formData.endereco) {
        newErrors.endereco = "Endereço é obrigatório";
      }
      if (!formData.numero) {
        newErrors.numero = "Número é obrigatório";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNextStep = () => {
    if (validateStep(1)) {
      setStep(2);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateStep(2)) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      loginUser({
        id: Date.now(),
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        endereco: {
          cep: formData.cep,
          rua: formData.endereco,
          numero: formData.numero,
          complemento: formData.complemento,
        },
        dataCadastro: new Date().toLocaleDateString("pt-BR"),
      });

      navigate("/perfil");
    } catch (error) {
      setErrors({ geral: "Erro ao realizar cadastro. Tente novamente." });
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handlePhoneChange = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "");

    let formattedValue = rawValue;
    if (rawValue.length <= 2) {
      formattedValue = rawValue;
    } else if (rawValue.length <= 7) {
      formattedValue = rawValue.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    } else {
      formattedValue = rawValue.replace(
        /(\d{2})(\d{5})(\d{0,4})/,
        "($1) $2-$3",
      );
    }

    setFormData((prev) => ({
      ...prev,
      telefone: rawValue,
    }));

    if (errors.telefone) {
      setErrors((prev) => ({ ...prev, telefone: "" }));
    }
  };

  function handleCEPChange(e) {
    const rawValue = e.target.value.replace(/\D/g, "");

    setFormData(function (prev) {
      const newData = { ...prev, cep: rawValue };

      // Busca endereço quando completar 8 dígitos
      if (rawValue.length === 8) {
        buscarEnderecoPorCep(rawValue);
      }

      return newData;
    });

    if (errors.cep) {
      setErrors(function (prev) {
        return { ...prev, cep: "" };
      });
    }
  }

  async function buscarEnderecoPorCep(cep) {
    const resultado = await buscarCep(cep);

    if (resultado) {
      setFormData(function (prev) {
        return {
          ...prev,
          endereco: resultado.logradouro || prev.endereco,
          complemento: resultado.complemento || prev.complemento,
        };
      });
    }
  }

  const getPhoneDisplay = () => {
    const value = formData.telefone;
    if (value.length <= 2) return value;
    if (value.length <= 7) return value.replace(/(\d{2})(\d{0,5})/, "($1) $2");
    return value.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3");
  };

  const getCEPDisplay = () => {
    const value = formData.cep;
    if (value.length <= 5) return value;
    return value.replace(/(\d{5})(\d{0,3})/, "$1-$2");
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "whitesmoke",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "#008000",
          borderRadius: "20px",
          padding: "40px",
          width: "100%",
          maxWidth: "450px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>🐾</div>
          <h1 style={{ color: "#ffffff", margin: "0", fontSize: "28px" }}>
            Criar Conta
          </h1>
          <p style={{ color: "#fff", marginTop: "10px" }}>
            Cadastre-se e comece a mimar seu pet!
          </p>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            marginBottom: "30px",
            gap: "15px",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: step >= 1 ? "#ffffff" : "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#008000",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              1
            </div>
            <span
              style={{
                fontSize: "12px",
                color: step >= 1 ? "#ffffff" : "#999",
              }}
            >
              Dados Pessoais
            </span>
          </div>
          <div
            style={{ width: "40px", height: "2px", background: "#e0e0e0" }}
          ></div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: "5px",
            }}
          >
            <div
              style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: step >= 2 ? "#ffffff" : "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#008000",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              2
            </div>
            <span
              style={{
                fontSize: "12px",
                color: step >= 2 ? "#ffffff" : "#999",
              }}
            >
              Endereço
            </span>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "20px" }}
        >
          {errors.geral && (
            <div
              style={{
                background: "#ffe0e0",
                color: "#d63031",
                padding: "10px",
                borderRadius: "8px",
                fontSize: "14px",
                textAlign: "center",
              }}
            >
              {errors.geral}
            </div>
          )}

          {step === 1 ? (
            <>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}
                >
                  Nome completo
                </label>
                <input
                  type="text"
                  name="nome"
                  placeholder="Seu nome completo"
                  value={formData.nome}
                  onChange={handleChange}
                  style={{
                    padding: "12px",
                    border: `2px solid ${errors.nome ? "#ff4757" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
                {errors.nome && (
                  <span style={{ color: "#ff4757", fontSize: "12px" }}>
                    {errors.nome}
                  </span>
                )}
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="seu@email.com"
                  value={formData.email}
                  onChange={handleChange}
                  style={{
                    padding: "12px",
                    border: `2px solid ${errors.email ? "#ff4757" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
                {errors.email && (
                  <span style={{ color: "#ff4757", fontSize: "12px" }}>
                    {errors.email}
                  </span>
                )}
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}
                >
                  Senha
                </label>
                <input
                  type="password"
                  name="senha"
                  placeholder="Mínimo 6 caracteres"
                  value={formData.senha}
                  onChange={handleChange}
                  style={{
                    padding: "12px",
                    border: `2px solid ${errors.senha ? "#ff4757" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
                {errors.senha && (
                  <span style={{ color: "#ff4757", fontSize: "12px" }}>
                    {errors.senha}
                  </span>
                )}
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}
                >
                  Confirmar senha
                </label>
                <input
                  type="password"
                  name="confirmarSenha"
                  placeholder="Repita a senha"
                  value={formData.confirmarSenha}
                  onChange={handleChange}
                  style={{
                    padding: "12px",
                    border: `2px solid ${errors.confirmarSenha ? "#ff4757" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
                {errors.confirmarSenha && (
                  <span style={{ color: "#ff4757", fontSize: "12px" }}>
                    {errors.confirmarSenha}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                style={{
                  background: "white",
                  color: "#008000",
                  border: "none",
                  padding: "14px",
                  borderRadius: "10px",
                  fontSize: "16px",
                  fontWeight: "600",
                  cursor: "pointer",
                  width: "100%",
                }}
              >
                Próximo →
              </button>
            </>
          ) : (
            <>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}
                >
                  Telefone
                </label>
                <input
                  type="tel"
                  name="telefone"
                  placeholder="(11) 99999-9999"
                  value={getPhoneDisplay()}
                  onChange={handlePhoneChange}
                  maxLength={15}
                  style={{
                    padding: "12px",
                    border: `2px solid ${errors.telefone ? "#ff4757" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
                {errors.telefone && (
                  <span style={{ color: "#ff4757", fontSize: "12px" }}>
                    {errors.telefone}
                  </span>
                )}
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}
                >
                  CEP
                </label>
                <input
                  type="text"
                  name="cep"
                  placeholder="00000-000"
                  value={getCEPDisplay()}
                  onChange={handleCEPChange}
                  maxLength={9}
                  style={{
                    padding: "12px",
                    border: `2px solid ${errors.cep ? "#ff4757" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
                {errors.cep && (
                  <span style={{ color: "#ff4757", fontSize: "12px" }}>
                    {errors.cep}
                  </span>
                )}
              </div>

              <div style={{ display: "flex", gap: "15px" }}>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    flex: 1,
                  }}
                >
                  <label
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Endereço
                  </label>
                  <input
                    type="text"
                    name="endereco"
                    placeholder="Rua, Avenida..."
                    value={formData.endereco}
                    onChange={handleChange}
                    style={{
                      padding: "12px",
                      border: `2px solid ${errors.endereco ? "#ff4757" : "#e0e0e0"}`,
                      borderRadius: "10px",
                      fontSize: "14px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                  {errors.endereco && (
                    <span style={{ color: "#ff4757", fontSize: "12px" }}>
                      {errors.endereco}
                    </span>
                  )}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "5px",
                    flex: "0 0 100px",
                  }}
                >
                  <label
                    style={{
                      color: "#fff",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Número
                  </label>
                  <input
                    type="text"
                    name="numero"
                    placeholder="123"
                    value={formData.numero}
                    onChange={handleChange}
                    style={{
                      padding: "12px",
                      border: `2px solid ${errors.numero ? "#ff4757" : "#e0e0e0"}`,
                      borderRadius: "10px",
                      fontSize: "14px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                  {errors.numero && (
                    <span style={{ color: "#ff4757", fontSize: "12px" }}>
                      {errors.numero}
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}
                >
                  Complemento
                </label>
                <input
                  type="text"
                  name="complemento"
                  placeholder="Apto, Bloco, etc. (opcional)"
                  value={formData.complemento}
                  onChange={handleChange}
                  style={{
                    padding: "12px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  style={{
                    background: "#f0f0f0",
                    color: "#333",
                    border: "none",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    cursor: "pointer",
                    flex: 1,
                  }}
                >
                  ← Voltar
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    background: "#fff",
                    color: "#008000",
                    border: "none",
                    padding: "14px",
                    borderRadius: "10px",
                    fontSize: "16px",
                    fontWeight: "600",
                    cursor: loading ? "not-allowed" : "pointer",
                    flex: 2,
                    opacity: loading ? 0.7 : 1,
                  }}
                >
                  {loading ? "Cadastrando..." : "Finalizar Cadastro"}
                </button>
              </div>
            </>
          )}

          <p
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: "14px",
              margin: "0",
            }}
          >
            Já tem uma conta?{" "}
            <Link
              to="/login"
              style={{
                color: "#062b92",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Faça login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Cadastro;
