import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useApp } from "../context/AppContext";
import { useToast } from "../components/Toast";
import { useCep } from "../hooks/useCep";

function Checkout() {
  const [totalConfirmado, setTotalConfirmado] = useState(0);
  const [formaPagamentoConfirmada, setFormaPagamentoConfirmada] = useState("");
  const navigate = useNavigate();
  const { addToast } = useToast();
  const {
    buscarCep,
    loading: loadingCep,
    erro: erroCep,
    setErro: setErroCep,
  } = useCep();
  const {
    carrinho,
    getSubtotal,
    getFrete,
    getTotal,
    limparCarrinho,
    usuario,
    criarPedido,
    simularAvancosRastreio,
    cupom,
    desconto,
    cupomAplicado,
    aplicarCupom,
    removerCupom, // ← Do contexto
  } = useApp();

  const [cupomInput, setCupomInput] = useState("");
  const [etapa, setEtapa] = useState(1);
  const [formaPagamento, setFormaPagamento] = useState("");
  const [parcelas, setParcelas] = useState(1);
  const [loading, setLoading] = useState(false);
  const [pedidoConfirmado, setPedidoConfirmado] = useState(false);
  const [numeroPedido, setNumeroPedido] = useState(null);

  // Estados do PIX
  const [pixGerado, setPixGerado] = useState(false);
  const [tempoPix, setTempoPix] = useState(300);
  const [pixPago, setPixPago] = useState(false);
  const [copiado, setCopiado] = useState(false);

  // Estados do Boleto
  const [boletoGerado, setBoletoGerado] = useState(false);

  // Dados de entrega
  const [endereco, setEndereco] = useState({
    cep: usuario?.endereco?.cep || "",
    rua: usuario?.endereco?.rua || "",
    numero: usuario?.endereco?.numero || "",
    complemento: usuario?.endereco?.complemento || "",
    bairro: "",
    cidade: "",
    estado: "",
  });

  // Dados do cartão
  const [cartao, setCartao] = useState({
    numero: "",
    nome: "",
    validade: "",
    cvv: "",
  });

  const totalComDesconto = getTotal() - desconto;

  // Código PIX simulado
  const codigoPix =
    "00020126580014br.gov.bcb.pix0136a1b2c3d4-e5f6-7890-abcd-ef12345678905204000053039865405" +
    totalComDesconto.toFixed(2).replace(".", "") +
    "5802BR5925Pets-LifeStyle Ecommerce6009Sao Paulo62070503***6304";

  // Timer do PIX
  useEffect(
    function () {
      let timer;
      if (pixGerado && !pixPago && tempoPix > 0) {
        timer = setInterval(function () {
          setTempoPix(function (prev) {
            if (prev <= 1) {
              clearInterval(timer);
              setPixGerado(false);
              addToast("⏰ Tempo do PIX expirado. Gere um novo.", "warning");
              return 0;
            }
            return prev - 1;
          });
        }, 1000);
      }
      return function () {
        clearInterval(timer);
      };
    },
    [pixGerado, pixPago],
  );

  function gerarPix() {
    setPixGerado(true);
    setTempoPix(300);
    setPixPago(false);
    addToast("📱 QR Code PIX gerado com sucesso!", "success");
  }

  function simularPagamentoPix() {
    setPixPago(true);
    setPixGerado(false);
    addToast("✅ Pagamento PIX confirmado!", "success", 5000);
    setTimeout(function () {
      avancarParaConfirmacao();
    }, 2000);
  }

  function copiarCodigoPix() {
    navigator.clipboard
      .writeText(codigoPix)
      .then(function () {
        setCopiado(true);
        addToast("📋 Código PIX copiado!", "success");
        setTimeout(function () {
          setCopiado(false);
        }, 3000);
      })
      .catch(function () {
        addToast("Erro ao copiar. Tente novamente.", "error");
      });
  }

  function gerarBoleto() {
    setBoletoGerado(true);
    addToast("📄 Boleto gerado com sucesso!", "success");
  }

  function simularPagamentoBoleto() {
    setBoletoGerado(false);
    addToast("✅ Pagamento do boleto confirmado!", "success", 5000);
    setTimeout(function () {
      avancarParaConfirmacao();
    }, 2000);
  }

  function formatarTempo(segundos) {
    const min = Math.floor(segundos / 60);
    const seg = segundos % 60;
    return `${min.toString().padStart(2, "0")}:${seg.toString().padStart(2, "0")}`;
  }

  function formatarCEP(value) {
    return value.replace(/\D/g, "").replace(/(\d{5})(\d{0,3})/, "$1-$2");
  }

  function handleAplicarCupom() {
    const cupons = {
      PET10: 10,
      PET20: 20,
      BOASVINDAS: 15,
      FRETEGRATIS: "frete",
    };

    const cupomUpper = cupom.toUpperCase().trim();
    const valorCupom = cupons[cupomUpper];

    if (!cupomInput.trim()) {
      addToast("⚠️ Digite um código de cupom", "warning");
      return;
    }
    const resultado = aplicarCupom(cupomInput, getSubtotal(), getFrete());
    if (resultado.sucesso) {
      addToast(`🎉 ${resultado.mensagem}`, "success");
    } else {
      addToast(`❌ ${resultado.mensagem}`, "error");
    }
  }

  function handleRemoverCupom() {
    removerCupom();
    setCupomInput("");
    addToast("Cupom removido", "info");
  }

  function handleEnderecoChange(e) {
    const { name, value } = e.target;

    setEndereco(function (prev) {
      return { ...prev, [name]: value };
    });

    if (name === "cep") {
      const cepLimpo = value.replace(/\D/g, "");
      if (cepLimpo.length === 8) {
        buscarEnderecoPorCep(cepLimpo);
      }
    }
  }

  async function buscarEnderecoPorCep(cep) {
    const resultado = await buscarCep(cep);

    if (resultado) {
      setEndereco(function (prev) {
        return {
          ...prev,
          rua: resultado.logradouro || prev.rua,
          bairro: resultado.bairro || prev.bairro,
          cidade: resultado.cidade || prev.cidade,
          estado: resultado.estado || prev.estado,
          complemento: resultado.complemento || prev.complemento,
        };
      });
    }
  }

  function handleCartaoChange(e) {
    const { name, value } = e.target;
    if (name === "numero") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{4})(?=\d)/g, "$1 ");
      setCartao(function (prev) {
        return { ...prev, [name]: formatted.slice(0, 19) };
      });
    } else if (name === "validade") {
      const formatted = value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "$1/$2");
      setCartao(function (prev) {
        return { ...prev, [name]: formatted.slice(0, 5) };
      });
    } else if (name === "cvv") {
      setCartao(function (prev) {
        return { ...prev, [name]: value.replace(/\D/g, "").slice(0, 3) };
      });
    } else {
      setCartao(function (prev) {
        return { ...prev, [name]: value };
      });
    }
  }

  function validarEtapa1() {
    if (!endereco.cep || !endereco.rua || !endereco.numero) {
      addToast("⚠️ Preencha os campos obrigatórios do endereço", "warning");
      return false;
    }
    setEtapa(2);
  }

  function validarEtapa2() {
    if (!formaPagamento) {
      addToast("⚠️ Selecione uma forma de pagamento", "warning");
      return false;
    }
    if (formaPagamento === "credito" || formaPagamento === "debito") {
      if (!cartao.numero || !cartao.nome || !cartao.validade || !cartao.cvv) {
        addToast("⚠️ Preencha todos os dados do cartão", "warning");
        return false;
      }
    }
    if (formaPagamento === "pix") {
      if (!pixPago) {
        addToast("⚠️ Realize o pagamento do PIX antes de continuar", "warning");
        return false;
      }
    }
    if (formaPagamento === "boleto") {
      if (!boletoGerado) {
        addToast("⚠️ Gere o boleto antes de continuar", "warning");
        return false;
      }
    }
    avancarParaConfirmacao();
  }

  function avancarParaConfirmacao() {
    setFormaPagamentoConfirmada(formaPagamento);
    setEtapa(3);
  }

  function handleFinalizarPedido() {
    setLoading(true);

    // Salva o total antes de limpar o carrinho
    const totalFinal = totalComDesconto;
    setTotalConfirmado(totalFinal);
    setFormaPagamentoConfirmada(formaPagamento);

    const novoPedido = criarPedido({
      endereco: endereco,
      formaPagamento: formaPagamento,
      parcelas: parcelas,
      subtotal: getSubtotal(),
      frete: getFrete(),
      desconto: desconto,
      total: totalFinal,
    });
    simularAvancosRastreio(novoPedido.id);

    setTimeout(function () {
      setLoading(false);
      setPedidoConfirmado(true);
      setNumeroPedido(novoPedido.numero);
      limparCarrinho();
      addToast("✅ Pedido realizado com sucesso!", "success", 5000);
    }, 2000);
  }

  function getParcelasValor() {
    return (totalComDesconto / parcelas).toFixed(2);
  }

  // ============ CARRINHO VAZIO ============
  if (carrinho.length === 0 && !pedidoConfirmado) {
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
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>🛒</div>
          <h1>Carrinho vazio</h1>
          <p>Adicione produtos antes de finalizar a compra.</p>
          <Link to="/loja">
            <button
              style={{
                background: "#008000",
                color: "white",
                border: "none",
                padding: "12px 30px",
                borderRadius: "10px",
                cursor: "pointer",
                fontSize: "1rem",
              }}
            >
              Ir para Loja
            </button>
          </Link>
        </div>
      </div>
    );
  }

  // ============ PEDIDO CONFIRMADO ============
  if (pedidoConfirmado) {
    const numeroPedido = Math.floor(Math.random() * 900000) + 100000;

    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "20px",
        }}
      >
        <div
          style={{
            background: "white",
            borderRadius: "20px",
            padding: "40px",
            maxWidth: "500px",
            textAlign: "center",
            boxShadow: "0 10px 40px rgba(0,0,0,0.1)",
          }}
        >
          <div style={{ fontSize: "80px", marginBottom: "20px" }}>🎉</div>
          <h1 style={{ color: "#2e7d32", marginBottom: "10px" }}>
            Pedido Confirmado!
          </h1>
          <p style={{ color: "#666", fontSize: "1.1rem" }}>
            Seu pedido <strong>#{numeroPedido}</strong> foi realizado com
            sucesso.
          </p>
          <div
            style={{
              background: "#f0f0f0",
              borderRadius: "10px",
              padding: "20px",
              margin: "20px 0",
            }}
          >
            <p style={{ margin: "5px 0", color: "#666" }}>
              📦 Prazo de entrega: <strong>5 a 10 dias úteis</strong>
            </p>
            <p style={{ margin: "5px 0", color: "#666" }}>
              💳 Pagamento:{" "}
              <strong>
                {formaPagamentoConfirmada === "pix"
                  ? "PIX"
                  : formaPagamentoConfirmada === "credito"
                    ? `Cartão de Crédito (${parcelas}x)`
                    : formaPagamentoConfirmada === "debito"
                      ? "Cartão de Débito"
                      : "Boleto Bancário"}
              </strong>
            </p>
            <p style={{ margin: "5px 0", color: "#666" }}>
              💰 Total: <strong>R$ {totalConfirmado.toFixed(2)}</strong>
            </p>
          </div>
          <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
            <Link to="/loja" style={{ flex: 1 }}>
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#008000",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Continuar Comprando
              </button>
            </Link>
            <Link to="/rastreio" style={{ flex: 1 }}>
              <button
                style={{
                  width: "100%",
                  padding: "12px",
                  background: "#008000",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                Rastrear Pedido
              </button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ============ ESTILOS ============
  const inputStyle = {
    padding: "12px",
    border: "2px solid #e0e0e0",
    borderRadius: "10px",
    fontSize: "0.9rem",
    width: "100%",
    boxSizing: "border-box",
  };

  // ============ RENDER PRINCIPAL ============
  return (
    <div style={{ background: "#f5f5f5", minHeight: "100vh", padding: "20px" }}>
      <div style={{ maxWidth: "800px", margin: "0 auto" }}>
        {/* Indicador de Etapas */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "30px",
            gap: "10px",
            flexWrap: "wrap",
          }}
        >
          {["Endereço", "Pagamento", "Confirmação"].map(function (nome, index) {
            const numeroEtapa = index + 1;
            const ativa = etapa >= numeroEtapa;
            const atual = etapa === numeroEtapa;
            return (
              <React.Fragment key={nome}>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "8px" }}
                >
                  <div
                    style={{
                      width: "35px",
                      height: "35px",
                      borderRadius: "50%",
                      background: ativa ? "#008000" : "#e0e0e0",
                      color: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                      fontSize: "0.9rem",
                    }}
                  >
                    {ativa ? "✓" : numeroEtapa}
                  </div>
                  <span
                    style={{
                      color: atual ? "#333" : "#999",
                      fontWeight: atual ? "bold" : "normal",
                      fontSize: "0.9rem",
                    }}
                  >
                    {nome}
                  </span>
                </div>
                {index < 2 && (
                  <div
                    style={{
                      width: "40px",
                      height: "2px",
                      background: etapa > numeroEtapa ? "#008000" : "#e0e0e0",
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* ETAPA 1: ENDEREÇO */}
        {etapa === 1 && (
          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "30px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#333" }}>
              📍 Endereço de Entrega
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: "15px",
              }}
            >
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label style={{ color: "#555", fontSize: "0.9rem" }}>
                  CEP *
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    name="cep"
                    value={formatarCEP(endereco.cep)}
                    onChange={handleEnderecoChange}
                    maxLength={9}
                    style={{
                      ...inputStyle,
                      paddingRight: loadingCep ? "40px" : "12px",
                    }}
                    placeholder="00000-000"
                  />
                  {loadingCep && (
                    <span
                      style={{
                        position: "absolute",
                        right: "12px",
                        top: "50%",
                        transform: "translateY(-50%)",
                        fontSize: "1rem",
                        animation: "spin 1s linear infinite",
                      }}
                    >
                      ⏳
                    </span>
                  )}
                </div>
                {erroCep && (
                  <span style={{ color: "#e65100", fontSize: "0.8rem" }}>
                    ⚠️ {erroCep}
                  </span>
                )}
              </div>

              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label style={{ color: "#555", fontSize: "0.9rem" }}>
                  Número *
                </label>
                <input
                  name="numero"
                  value={endereco.numero}
                  onChange={handleEnderecoChange}
                  style={inputStyle}
                  placeholder="123"
                />
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "5px",
                  gridColumn: "1 / -1",
                }}
              >
                <label style={{ color: "#555", fontSize: "0.9rem" }}>
                  Rua *
                </label>
                <input
                  name="rua"
                  value={endereco.rua}
                  onChange={handleEnderecoChange}
                  style={inputStyle}
                  placeholder="Rua, Avenida..."
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label style={{ color: "#555", fontSize: "0.9rem" }}>
                  Complemento
                </label>
                <input
                  name="complemento"
                  value={endereco.complemento}
                  onChange={handleEnderecoChange}
                  style={inputStyle}
                  placeholder="Apto, Bloco..."
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label style={{ color: "#555", fontSize: "0.9rem" }}>
                  Bairro
                </label>
                <input
                  name="bairro"
                  value={endereco.bairro}
                  onChange={handleEnderecoChange}
                  style={inputStyle}
                  placeholder="Bairro"
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label style={{ color: "#555", fontSize: "0.9rem" }}>
                  Cidade
                </label>
                <input
                  name="cidade"
                  value={endereco.cidade}
                  onChange={handleEnderecoChange}
                  style={inputStyle}
                  placeholder="Cidade"
                />
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: "5px" }}
              >
                <label style={{ color: "#555", fontSize: "0.9rem" }}>
                  Estado
                </label>
                <input
                  name="estado"
                  value={endereco.estado}
                  onChange={handleEnderecoChange}
                  style={inputStyle}
                  placeholder="UF"
                  maxLength={2}
                />
              </div>
            </div>
            <button
              onClick={validarEtapa1}
              style={{
                width: "100%",
                marginTop: "20px",
                padding: "14px",
                background: "#008000",
                color: "white",
                border: "none",
                borderRadius: "10px",
                fontSize: "1rem",
                fontWeight: "bold",
                cursor: "pointer",
              }}
            >
              Continuar para Pagamento →
            </button>
          </div>
        )}

        {/* ETAPA 2: PAGAMENTO */}
        {etapa === 2 && (
          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "30px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#333" }}>
              💳 Forma de Pagamento
            </h2>

            {/* Opções de Pagamento */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "10px",
                marginBottom: "20px",
              }}
            >
              {[
                {
                  id: "pix",
                  nome: "PIX",
                  icone: "⚡",
                  descricao: "Aprovação instantânea via QR Code",
                },
                {
                  id: "credito",
                  nome: "Cartão de Crédito",
                  icone: "💳",
                  descricao: "Até 12x sem juros",
                },
                {
                  id: "debito",
                  nome: "Cartão de Débito",
                  icone: "🏦",
                  descricao: "Débito na hora",
                },
                {
                  id: "boleto",
                  nome: "Boleto Bancário",
                  icone: "📄",
                  descricao: "Vencimento em 3 dias úteis",
                },
              ].map(function (opcao) {
                return (
                  <div
                    key={opcao.id}
                    onClick={function () {
                      setFormaPagamento(opcao.id);
                      if (opcao.id !== "pix") {
                        setPixGerado(false);
                        setPixPago(false);
                      }
                      if (opcao.id !== "boleto") {
                        setBoletoGerado(false);
                      }
                    }}
                    style={{
                      padding: "15px 20px",
                      border: `2px solid ${formaPagamento === opcao.id ? "#008000" : "#e0e0e0"}`,
                      borderRadius: "10px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      gap: "15px",
                      background:
                        formaPagamento === opcao.id ? "#f0f0ff" : "white",
                      transition: "all 0.3s",
                    }}
                  >
                    <span style={{ fontSize: "24px" }}>{opcao.icone}</span>
                    <div>
                      <strong style={{ color: "#333" }}>{opcao.nome}</strong>
                      <p
                        style={{
                          margin: "3px 0 0 0",
                          color: "#999",
                          fontSize: "0.85rem",
                        }}
                      >
                        {opcao.descricao}
                      </p>
                    </div>
                    {formaPagamento === opcao.id && (
                      <span
                        style={{
                          marginLeft: "auto",
                          color: "#008000",
                          fontSize: "1.5rem",
                        }}
                      >
                        ✓
                      </span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* ========== SEÇÃO PIX ========== */}
            {formaPagamento === "pix" && (
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "25px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                <h3 style={{ marginTop: 0, color: "#333" }}>
                  ⚡ Pagamento via PIX
                </h3>

                {!pixGerado ? (
                  <button
                    onClick={gerarPix}
                    style={{
                      padding: "15px 40px",
                      background:
                        "linear-gradient(135deg, #00b894 0%, #00cec9 100%)",
                      color: "white",
                      border: "none",
                      borderRadius: "10px",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Gerar QR Code PIX
                  </button>
                ) : (
                  <div>
                    {/* QR Code Simulado */}
                    <div
                      style={{
                        width: "200px",
                        height: "200px",
                        margin: "20px auto",
                        background: "white",
                        borderRadius: "15px",
                        padding: "10px",
                        border: "3px solid #00b894",
                      }}
                    >
                      <svg
                        viewBox="0 0 100 100"
                        style={{ width: "100%", height: "100%" }}
                      >
                        {/* Padrão QR Code simulado */}
                        <rect
                          x="10"
                          y="10"
                          width="80"
                          height="80"
                          fill="white"
                        />
                        <rect
                          x="15"
                          y="15"
                          width="25"
                          height="25"
                          fill="black"
                        />
                        <rect
                          x="60"
                          y="15"
                          width="25"
                          height="25"
                          fill="black"
                        />
                        <rect
                          x="15"
                          y="60"
                          width="25"
                          height="25"
                          fill="black"
                        />
                        <rect x="45" y="15" width="5" height="5" fill="black" />
                        <rect x="50" y="25" width="5" height="5" fill="black" />
                        <rect
                          x="40"
                          y="40"
                          width="20"
                          height="20"
                          fill="black"
                        />
                        <rect
                          x="45"
                          y="55"
                          width="5"
                          height="10"
                          fill="black"
                        />
                        <rect
                          x="20"
                          y="45"
                          width="15"
                          height="5"
                          fill="black"
                        />
                        <rect
                          x="65"
                          y="45"
                          width="15"
                          height="5"
                          fill="black"
                        />
                        <rect
                          x="45"
                          y="70"
                          width="10"
                          height="5"
                          fill="black"
                        />
                        <rect x="55" y="80" width="5" height="5" fill="black" />
                        <rect
                          x="70"
                          y="70"
                          width="10"
                          height="10"
                          fill="black"
                        />
                        <rect
                          x="25"
                          y="80"
                          width="10"
                          height="5"
                          fill="black"
                        />
                        <rect x="80" y="50" width="8" height="8" fill="black" />
                        <rect x="15" y="50" width="3" height="3" fill="black" />
                        <rect x="82" y="15" width="3" height="3" fill="black" />
                      </svg>
                    </div>

                    <p
                      style={{
                        color: "#e65100",
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                      }}
                    >
                      ⏰ Expira em: {formatarTempo(tempoPix)}
                    </p>
                    <p
                      style={{
                        color: "#333",
                        fontWeight: "bold",
                        fontSize: "1.1rem",
                      }}
                    >
                      Valor: R$ {totalComDesconto.toFixed(2)}
                    </p>

                    <div
                      style={{
                        display: "flex",
                        gap: "10px",
                        justifyContent: "center",
                        marginTop: "15px",
                      }}
                    >
                      <button
                        onClick={copiarCodigoPix}
                        style={{
                          padding: "10px 20px",
                          background: copiado ? "#2e7d32" : "#008000",
                          color: "white",
                          border: "none",
                          borderRadius: "10px",
                          cursor: "pointer",
                        }}
                      >
                        {copiado ? "✅ Copiado!" : "📋 Copiar Código PIX"}
                      </button>
                      <button
                        onClick={simularPagamentoPix}
                        style={{
                          padding: "10px 20px",
                          background: "#00b894",
                          color: "white",
                          border: "none",
                          borderRadius: "10px",
                          cursor: "pointer",
                          fontWeight: "bold",
                        }}
                      >
                        💰 Pagamento
                      </button>
                    </div>
                    <p
                      style={{
                        color: "#999",
                        fontSize: "0.8rem",
                        marginTop: "10px",
                      }}
                    >
                      *Simulação: clique em "Simular Pagamento" para confirmar o
                      PIX
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* ========== SEÇÃO CARTÃO DE CRÉDITO/DÉBITO ========== */}
            {(formaPagamento === "credito" || formaPagamento === "debito") && (
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "20px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                }}
              >
                <h3 style={{ marginTop: 0, color: "#333", fontSize: "1rem" }}>
                  {formaPagamento === "credito"
                    ? "💳 Cartão de Crédito"
                    : "🏦 Cartão de Débito"}
                </h3>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "15px",
                  }}
                >
                  <div>
                    <label
                      style={{
                        color: "#555",
                        fontSize: "0.9rem",
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      Número do Cartão
                    </label>
                    <input
                      name="numero"
                      value={cartao.numero}
                      onChange={handleCartaoChange}
                      style={inputStyle}
                      placeholder="0000 0000 0000 0000"
                      maxLength={19}
                    />
                  </div>
                  <div>
                    <label
                      style={{
                        color: "#555",
                        fontSize: "0.9rem",
                        display: "block",
                        marginBottom: "5px",
                      }}
                    >
                      Nome no Cartão
                    </label>
                    <input
                      name="nome"
                      value={cartao.nome}
                      onChange={handleCartaoChange}
                      style={inputStyle}
                      placeholder="Nome como está no cartão"
                    />
                  </div>
                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "1fr 1fr",
                      gap: "15px",
                    }}
                  >
                    <div>
                      <label
                        style={{
                          color: "#555",
                          fontSize: "0.9rem",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Validade
                      </label>
                      <input
                        name="validade"
                        value={cartao.validade}
                        onChange={handleCartaoChange}
                        style={inputStyle}
                        placeholder="MM/AA"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label
                        style={{
                          color: "#555",
                          fontSize: "0.9rem",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        CVV
                      </label>
                      <input
                        name="cvv"
                        value={cartao.cvv}
                        onChange={handleCartaoChange}
                        style={inputStyle}
                        placeholder="123"
                        maxLength={3}
                        type="password"
                      />
                    </div>
                  </div>

                  {formaPagamento === "credito" && (
                    <div>
                      <label
                        style={{
                          color: "#555",
                          fontSize: "0.9rem",
                          display: "block",
                          marginBottom: "5px",
                        }}
                      >
                        Parcelas
                      </label>
                      <select
                        value={parcelas}
                        onChange={function (e) {
                          setParcelas(Number(e.target.value));
                        }}
                        style={{ ...inputStyle, background: "white" }}
                      >
                        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                          function (n) {
                            return (
                              <option key={n} value={n}>
                                {n}x de R$ {(totalComDesconto / n).toFixed(2)}{" "}
                                {n === 1
                                  ? "(à vista)"
                                  : n <= 6
                                    ? "(sem juros)"
                                    : "(com juros)"}
                              </option>
                            );
                          },
                        )}
                      </select>
                    </div>
                  )}

                  {formaPagamento === "debito" && (
                    <div
                      style={{
                        background: "#e8f5e9",
                        padding: "10px 15px",
                        borderRadius: "8px",
                        color: "#2e7d32",
                        fontSize: "0.9rem",
                      }}
                    >
                      💡 O valor de R$ {totalComDesconto.toFixed(2)} será
                      debitado em uma única vez.
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ========== SEÇÃO BOLETO ========== */}
            {formaPagamento === "boleto" && (
              <div
                style={{
                  background: "#f8f9fa",
                  padding: "25px",
                  borderRadius: "10px",
                  marginBottom: "20px",
                  textAlign: "center",
                }}
              >
                <h3 style={{ marginTop: 0, color: "#333" }}>
                  📄 Boleto Bancário
                </h3>

                {!boletoGerado ? (
                  <div>
                    <p style={{ color: "#666", marginBottom: "20px" }}>
                      O boleto terá vencimento em <strong>3 dias úteis</strong>.
                      <br />
                      Valor: <strong>R$ {totalComDesconto.toFixed(2)}</strong>
                    </p>
                    <button
                      onClick={gerarBoleto}
                      style={{
                        padding: "15px 40px",
                        background:
                          "linear-gradient(135deg, #636e72 0%, #2d3436 100%)",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        fontSize: "1.1rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      📄 Gerar Boleto
                    </button>
                  </div>
                ) : (
                  <div>
                    {/* Boleto Simulado */}
                    <div
                      style={{
                        background: "white",
                        borderRadius: "10px",
                        padding: "25px",
                        border: "2px dashed #636e72",
                        marginBottom: "20px",
                      }}
                    >
                      <div
                        style={{ textAlign: "center", marginBottom: "15px" }}
                      >
                        <h4 style={{ margin: "0", color: "#333" }}>
                          Boleto Bancário
                        </h4>
                        <p
                          style={{
                            margin: "5px 0",
                            color: "#666",
                            fontSize: "0.85rem",
                          }}
                        >
                          Vencimento:{" "}
                          {new Date(
                            Date.now() + 3 * 86400000,
                          ).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                      <div
                        style={{
                          background: "#f0f0f0",
                          padding: "10px",
                          borderRadius: "5px",
                          marginBottom: "10px",
                        }}
                      >
                        <p
                          style={{
                            margin: "3px 0",
                            fontSize: "0.8rem",
                            color: "#666",
                          }}
                        >
                          Beneficiário:{" "}
                          <strong>Pets-LifeStyle Ecommerce LTDA</strong>
                        </p>
                        <p
                          style={{
                            margin: "3px 0",
                            fontSize: "0.8rem",
                            color: "#666",
                          }}
                        >
                          CNPJ: 00.000.000/0001-00
                        </p>
                      </div>
                      <div style={{ textAlign: "center" }}>
                        <p
                          style={{
                            fontSize: "0.7rem",
                            color: "#999",
                            marginBottom: "10px",
                          }}
                        >
                          Código de Barras (simulado)
                        </p>
                        <div
                          style={{
                            height: "40px",
                            background:
                              "repeating-linear-gradient(90deg, #333 0px, #333 2px, white 2px, white 4px)",
                            borderRadius: "3px",
                            marginBottom: "10px",
                          }}
                        />
                        <p
                          style={{
                            fontSize: "0.75rem",
                            color: "#666",
                            wordBreak: "break-all",
                          }}
                        >
                          34191.79001 01043.510047 91020.150008 1 12345678901234
                        </p>
                      </div>
                      <div style={{ marginTop: "15px", textAlign: "center" }}>
                        <p
                          style={{
                            fontSize: "1.5rem",
                            fontWeight: "bold",
                            color: "#333",
                            margin: "5px 0",
                          }}
                        >
                          R$ {totalComDesconto.toFixed(2)}
                        </p>
                      </div>
                    </div>

                    {/* <button
                      onClick={simularPagamentoBoleto}
                      style={{
                        padding: "12px 30px",
                        background: "#00b894",
                        color: "white",
                        border: "none",
                        borderRadius: "10px",
                        cursor: "pointer",
                        fontWeight: "bold",
                        fontSize: "1rem",
                      }}
                    >
                      💰 Simular Pagamento do Boleto
                    </button> */}
                    {/* <p
                      style={{
                        color: "#999",
                        fontSize: "0.8rem",
                        marginTop: "10px",
                      }}
                    >
                      *Simulação: clique para confirmar o pagamento
                    </p> */}
                  </div>
                )}
              </div>
            )}

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={function () {
                  setEtapa(1);
                }}
                style={{
                  flex: 1,
                  padding: "14px",
                  background: "#f0f0f0",
                  color: "#333",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "1rem",
                }}
              >
                ← Voltar
              </button>
              <button
                onClick={validarEtapa2}
                style={{
                  flex: 2,
                  padding: "14px",
                  background: "#008000",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                  fontSize: "1rem",
                  fontWeight: "bold",
                }}
              >
                Revisar Pedido →
              </button>
            </div>
          </div>
        )}

        {/* ETAPA 3: CONFIRMAÇÃO */}
        {etapa === 3 && (
          <div
            style={{
              background: "white",
              borderRadius: "15px",
              padding: "30px",
              boxShadow: "0 5px 20px rgba(0,0,0,0.1)",
            }}
          >
            <h2 style={{ marginTop: 0, color: "#333" }}>
              📋 Revisão do Pedido
            </h2>

            <div style={{ marginBottom: "20px" }}>
              <h3
                style={{
                  color: "#666",
                  fontSize: "1rem",
                  marginBottom: "10px",
                }}
              >
                Produtos
              </h3>
              {carrinho.map(function (item) {
                return (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      gap: "15px",
                      padding: "10px",
                      borderBottom: "1px solid #f0f0f0",
                    }}
                  >
                    <img
                      src={item.image}
                      alt={item.title}
                      style={{
                        width: "60px",
                        height: "60px",
                        objectFit: "cover",
                        borderRadius: "8px",
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <p
                        style={{
                          margin: "0",
                          fontWeight: "bold",
                          color: "#333",
                        }}
                      >
                        {item.title}
                      </p>
                      <p
                        style={{
                          margin: "3px 0",
                          color: "#999",
                          fontSize: "0.85rem",
                        }}
                      >
                        Qtd: {item.quantidade}
                      </p>
                    </div>
                    <p style={{ fontWeight: "bold", color: "#008000" }}>
                      R$ {(item.price * item.quantidade).toFixed(2)}
                    </p>
                  </div>
                );
              })}
            </div>

            <div
              style={{
                marginBottom: "20px",
                padding: "15px",
                background: "#f8f9fa",
                borderRadius: "10px",
              }}
            >
              <h3
                style={{ color: "#666", fontSize: "1rem", marginBottom: "5px" }}
              >
                📍 Endereço
              </h3>
              <p style={{ margin: "3px 0", color: "#333" }}>
                {endereco.rua}, {endereco.numero}
                {endereco.complemento ? ` - ${endereco.complemento}` : ""}
              </p>
            </div>

            <div
              style={{
                marginBottom: "20px",
                padding: "15px",
                background: "#f8f9fa",
                borderRadius: "10px",
              }}
            >
              <h3
                style={{ color: "#666", fontSize: "1rem", marginBottom: "5px" }}
              >
                💳 Pagamento
              </h3>
              <p style={{ margin: "3px 0", color: "#333" }}>
                {formaPagamento === "pix" && "⚡ PIX"}
                {formaPagamento === "credito" &&
                  `💳 Cartão de Crédito - ${parcelas}x de R$ ${getParcelasValor()}`}
                {formaPagamento === "debito" &&
                  `🏦 Cartão de Débito - R$ ${totalComDesconto.toFixed(2)}`}
                {formaPagamento === "boleto" && "📄 Boleto Bancário"}
              </p>
            </div>

            {/* Totais */}
            <div style={{ borderTop: "2px solid #f0f0f0", paddingTop: "15px" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  color: "#666",
                }}
              >
                <span>Subtotal</span>
                <span>R$ {getSubtotal().toFixed(2)}</span>
              </div>
              {desconto > 0 && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    marginBottom: "8px",
                    color: "#2e7d32",
                  }}
                >
                  <span>Desconto</span>
                  <span>- R$ {desconto.toFixed(2)}</span>
                </div>
              )}
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "8px",
                  color: "#666",
                }}
              >
                <span>Frete</span>
                <span style={{ color: getFrete() === 0 ? "#2e7d32" : "#666" }}>
                  {getFrete() === 0 ? "Grátis" : `R$ ${getFrete().toFixed(2)}`}
                </span>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginTop: "15px",
                  paddingTop: "15px",
                  borderTop: "2px solid #f0f0f0",
                  fontWeight: "bold",
                  fontSize: "1.2rem",
                  color: "#333",
                }}
              >
                <span>Total</span>
                <span style={{ color: "#008000" }}>
                  R$ {totalComDesconto.toFixed(2)}
                </span>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px", marginTop: "20px" }}>
              <button
                onClick={function () {
                  setEtapa(2);
                }}
                style={{
                  flex: 1,
                  padding: "14px",
                  background: "#f0f0f0",
                  color: "#333",
                  border: "none",
                  borderRadius: "10px",
                  cursor: "pointer",
                }}
              >
                ← Voltar
              </button>
              <button
                onClick={handleFinalizarPedido}
                disabled={loading}
                style={{
                  flex: 2,
                  padding: "14px",
                  background:
                    "linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)",
                  color: "white",
                  border: "none",
                  borderRadius: "10px",
                  fontSize: "1.1rem",
                  fontWeight: "bold",
                  cursor: loading ? "not-allowed" : "pointer",
                  opacity: loading ? 0.7 : 1,
                }}
              >
                {loading ? "Processando..." : "Finalizar Pedido ✅"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Checkout;
