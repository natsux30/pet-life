import { useState } from "react";

 function Formulario() {
  const [dados, setDados] = useState({
    nome: "",
    email: "",
  });

  function handleChange(e) {
    const { name, value } = e.target;
    setDados({ ...dados, [name]: value });
  }

  function handleSubmit(e) {
    e.preventDefault(); // impede reload da página
    console.log(dados);
    alert("Formulário enviado!");
  }

  return (
    <div style={{ padding: "20px" }}>
      <h2>Cadastro</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="nome"
          placeholder="Nome"
          value={dados.nome}
          onChange={handleChange}
        />

        <br /><br />

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={dados.email}
          onChange={handleChange}
        />

        <br /><br />

        <button type="submit">Enviar</button>
      </form>
    </div>
  );
}
export default Formulario