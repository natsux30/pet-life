import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function Login() {
  const navigate = useNavigate();
  const { loginUser } = useApp();

  const [formData, setFormData] = useState({
    email: "",
    senha: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validateForm() {
    const newErrors = {};

    if (!formData.email) {
      newErrors.email = "Email é obrigatório";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email inválido";
    }

    if (!formData.senha) {
      newErrors.senha = "Senha é obrigatória";
    } else if (formData.senha.length < 6) {
      newErrors.senha = "Senha deve ter no mínimo 6 caracteres";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  async function handleSubmit(e) {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);

    const resultado = await loginUser(formData.email, formData.senha); // ← Use await

    if (resultado.sucesso) {
      navigate("/perfil");
    } else {
      setErrors({ geral: resultado.mensagem || "Email ou senha inválidos" });
    }
    setLoading(false);
  }

  function handleChange(e) {
    const { name, value } = e.target;
    setFormData(function (prev) {
      return { ...prev, [name]: value };
    });
    if (errors[name]) {
      setErrors(function (prev) {
        return { ...prev, [name]: "" };
      });
    }
  }

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
        <div
          style={{
            textAlign: "center",
            marginBottom: "30px",
            backgroundColor: "#008000",
            padding: "20px",
            borderRadius: "15px",
          }}
        >
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>🐾</div>
          <h1 style={{ color: "#ffffff", margin: "0", fontSize: "28px" }}>
            Bem-vindo de volta!
          </h1>
          <p style={{ color: "#ffffff", marginTop: "10px" }}>
            Faça login para continuar comprando para seu pet
          </p>
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

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label
              htmlFor="email"
              style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}
            >
              Email
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "18px",
                }}
              ></span>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="seu@email.com"
                value={formData.email}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  border: `2px solid ${errors.email ? "#ff4757" : "#e0e0e0"}`,
                  borderRadius: "10px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            {errors.email && (
              <span style={{ color: "#ff4757", fontSize: "12px" }}>
                {errors.email}
              </span>
            )}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "5px" }}>
            <label
              htmlFor="senha"
              style={{ color: "#fff", fontSize: "14px", fontWeight: "500" }}
            >
              Senha
            </label>
            <div style={{ position: "relative" }}>
              <span
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  fontSize: "18px",
                }}
              ></span>
              <input
                type="password"
                id="senha"
                name="senha"
                placeholder="Sua senha"
                value={formData.senha}
                onChange={handleChange}
                style={{
                  width: "100%",
                  padding: "12px 12px 12px 40px",
                  border: `2px solid ${errors.senha ? "#ff4757" : "#e0e0e0"}`,
                  borderRadius: "10px",
                  fontSize: "14px",
                  boxSizing: "border-box",
                }}
              />
            </div>
            {errors.senha && (
              <span style={{ color: "#ff4757", fontSize: "12px" }}>
                {errors.senha}
              </span>
            )}
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              fontSize: "14px",
            }}
          >
            <label
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                color: "#fff",
                cursor: "pointer",
              }}
            >
              <input type="checkbox" style={{ margin: 0 }} /> Lembrar-me
            </label>
            <Link
              to="/recuperar-senha"
              style={{ color: "#062b92", textDecoration: "none" }}
            >
              Esqueceu a senha?
            </Link>
          </div>

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
              width: "100%",
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <p
            style={{
              textAlign: "center",
              color: "#fff",
              fontSize: "14px",
              margin: "0",
            }}
          >
            Não tem uma conta?{" "}
            <Link
              to="/cadastro"
              style={{
                color: "#062b92",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Cadastre-se
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
