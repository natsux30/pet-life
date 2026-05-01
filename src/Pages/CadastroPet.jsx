import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useApp } from "../context/AppContext";

function CadastroPet() {
  const { adicionarPet } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nomePet: "",
    tipo: "",
    raca: "",
    porte: "",
    idade: "",
    peso: "",
    alergias: "",
    observacoes: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  function validateStep(stepNumber) {
    const newErrors = {};

    if (stepNumber === 1) {
      if (!formData.nomePet || formData.nomePet.length < 2) {
        newErrors.nomePet = "Nome do pet é obrigatório";
      }
      if (!formData.tipo) {
        newErrors.tipo = "Selecione o tipo do pet";
      }
      if (!formData.raca || formData.raca.length < 2) {
        newErrors.raca = "Raça é obrigatória";
      }
      if (!formData.porte) {
        newErrors.porte = "Selecione o porte";
      }
    } else if (stepNumber === 2) {
      if (!formData.idade) {
        newErrors.idade = "Idade é obrigatória";
      } else if (formData.idade < 0 || formData.idade > 30) {
        newErrors.idade = "Idade inválida (0-30 anos)";
      }
      if (!formData.peso) {
        newErrors.peso = "Peso é obrigatório";
      } else if (formData.peso < 0.5 || formData.peso > 100) {
        newErrors.peso = "Peso inválido (0.5-100 kg)";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNextStep() {
    if (validateStep(1)) {
      setStep(2);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!validateStep(2)) return;

    setLoading(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      adicionarPet(formData);
      alert("Pet cadastrado com sucesso! 🎉");
      navigate("/perfil");
    } catch (error) {
      setErrors({ geral: "Erro ao cadastrar pet. Tente novamente." });
    } finally {
      setLoading(false);
    }
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

  const tiposPet = [
    { value: "", label: "Selecione o tipo" },
    { value: "cachorro", label: "🐕 Cachorro" },
    { value: "gato", label: "🐈 Gato" },
    { value: "ave", label: "🐦 Ave" },
    { value: "peixe", label: "🐟 Peixe" },
    { value: "coelho", label: "🐰 Coelho" },
    { value: "hamster", label: "🐹 Hamster" },
    { value: "outro", label: "Outro" },
  ];

  const portes = [
    { value: "", label: "Selecione o porte" },
    { value: "mini", label: "Mini" },
    { value: "pequeno", label: "Pequeno" },
    { value: "medio", label: "Médio" },
    { value: "grande", label: "Grande" },
    { value: "gigante", label: "Gigante" },
  ];

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
        padding: "20px",
      }}
    >
      <div
        style={{
          background: "white",
          borderRadius: "20px",
          padding: "40px",
          width: "100%",
          maxWidth: "500px",
          boxShadow: "0 20px 60px rgba(0, 0, 0, 0.3)",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "30px" }}>
          <div style={{ fontSize: "48px", marginBottom: "15px" }}>🐾</div>
          <h1 style={{ color: "#333", margin: "0", fontSize: "28px" }}>
            Cadastrar Pet
          </h1>
          <p style={{ color: "#666", marginTop: "10px" }}>
            Conte-nos sobre seu amiguinho!
          </p>
        </div>

        {/* Indicador de etapas */}
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
                background: step >= 1 ? "#f5576c" : "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              1
            </div>
            <span
              style={{
                fontSize: "12px",
                color: step >= 1 ? "#f5576c" : "#999",
              }}
            >
              Informações
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
                background: step >= 2 ? "#f5576c" : "#e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "white",
                fontWeight: "bold",
                fontSize: "14px",
              }}
            >
              2
            </div>
            <span
              style={{
                fontSize: "12px",
                color: step >= 2 ? "#f5576c" : "#999",
              }}
            >
              Saúde
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
                  style={{ color: "#555", fontSize: "14px", fontWeight: "500" }}
                >
                  Nome do Pet
                </label>
                <input
                  type="text"
                  name="nomePet"
                  placeholder="Nome do seu pet"
                  value={formData.nomePet}
                  onChange={handleChange}
                  style={{
                    padding: "12px",
                    border: `2px solid ${errors.nomePet ? "#ff4757" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
                {errors.nomePet && (
                  <span style={{ color: "#ff4757", fontSize: "12px" }}>
                    {errors.nomePet}
                  </span>
                )}
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  style={{ color: "#555", fontSize: "14px", fontWeight: "500" }}
                >
                  Tipo
                </label>
                <select
                  name="tipo"
                  value={formData.tipo}
                  onChange={handleChange}
                  style={{
                    padding: "12px",
                    border: `2px solid ${errors.tipo ? "#ff4757" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                    background: "white",
                  }}
                >
                  {tiposPet.map(function (tipo) {
                    return (
                      <option key={tipo.value} value={tipo.value}>
                        {tipo.label}
                      </option>
                    );
                  })}
                </select>
                {errors.tipo && (
                  <span style={{ color: "#ff4757", fontSize: "12px" }}>
                    {errors.tipo}
                  </span>
                )}
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  style={{ color: "#555", fontSize: "14px", fontWeight: "500" }}
                >
                  Raça
                </label>
                <input
                  type="text"
                  name="raca"
                  placeholder="Raça do pet"
                  value={formData.raca}
                  onChange={handleChange}
                  style={{
                    padding: "12px",
                    border: `2px solid ${errors.raca ? "#ff4757" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                  }}
                />
                {errors.raca && (
                  <span style={{ color: "#ff4757", fontSize: "12px" }}>
                    {errors.raca}
                  </span>
                )}
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  style={{ color: "#555", fontSize: "14px", fontWeight: "500" }}
                >
                  Porte
                </label>
                <select
                  name="porte"
                  value={formData.porte}
                  onChange={handleChange}
                  style={{
                    padding: "12px",
                    border: `2px solid ${errors.porte ? "#ff4757" : "#e0e0e0"}`,
                    borderRadius: "10px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                    background: "white",
                  }}
                >
                  {portes.map(function (porte) {
                    return (
                      <option key={porte.value} value={porte.value}>
                        {porte.label}
                      </option>
                    );
                  })}
                </select>
                {errors.porte && (
                  <span style={{ color: "#ff4757", fontSize: "12px" }}>
                    {errors.porte}
                  </span>
                )}
              </div>

              <button
                type="button"
                onClick={handleNextStep}
                style={{
                  background:
                    "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                  color: "white",
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
                      color: "#555",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Idade (anos)
                  </label>
                  <input
                    type="number"
                    name="idade"
                    placeholder="Ex: 3"
                    value={formData.idade}
                    onChange={handleChange}
                    min="0"
                    max="30"
                    step="0.5"
                    style={{
                      padding: "12px",
                      border: `2px solid ${errors.idade ? "#ff4757" : "#e0e0e0"}`,
                      borderRadius: "10px",
                      fontSize: "14px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                  {errors.idade && (
                    <span style={{ color: "#ff4757", fontSize: "12px" }}>
                      {errors.idade}
                    </span>
                  )}
                </div>

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
                      color: "#555",
                      fontSize: "14px",
                      fontWeight: "500",
                    }}
                  >
                    Peso (kg)
                  </label>
                  <input
                    type="number"
                    name="peso"
                    placeholder="Ex: 5.5"
                    value={formData.peso}
                    onChange={handleChange}
                    min="0.5"
                    max="100"
                    step="0.1"
                    style={{
                      padding: "12px",
                      border: `2px solid ${errors.peso ? "#ff4757" : "#e0e0e0"}`,
                      borderRadius: "10px",
                      fontSize: "14px",
                      width: "100%",
                      boxSizing: "border-box",
                    }}
                  />
                  {errors.peso && (
                    <span style={{ color: "#ff4757", fontSize: "12px" }}>
                      {errors.peso}
                    </span>
                  )}
                </div>
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  style={{ color: "#555", fontSize: "14px", fontWeight: "500" }}
                >
                  Alergias
                </label>
                <input
                  type="text"
                  name="alergias"
                  placeholder="Ex: ração com frango, pulgas"
                  value={formData.alergias}
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

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label
                  style={{ color: "#555", fontSize: "14px", fontWeight: "500" }}
                >
                  Observações
                </label>
                <textarea
                  name="observacoes"
                  placeholder="Alguma informação importante sobre seu pet..."
                  value={formData.observacoes}
                  onChange={handleChange}
                  rows="3"
                  style={{
                    padding: "12px",
                    border: "2px solid #e0e0e0",
                    borderRadius: "10px",
                    fontSize: "14px",
                    width: "100%",
                    boxSizing: "border-box",
                    resize: "vertical",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px" }}>
                <button
                  type="button"
                  onClick={function () {
                    setStep(1);
                  }}
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
                    background:
                      "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
                    color: "white",
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
                  {loading ? "Cadastrando..." : "Cadastrar Pet 🐾"}
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}

export default CadastroPet;
