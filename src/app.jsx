import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Carrinho from "./Pages/Carrinho";
import Perfil from "./Pages/Perfil";
import Links from "./Pages/Links";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import CadastroPet from "./Pages/CadastroPet";
import { AppProvider } from "./context/AppContext"; // ← Import

import React from "react";
import "./Style.css";

function App() {
  return (
    <AppProvider>
      {" "}
      {/* ← Envolva tudo com AppProvider */}
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/perfil" element={<Perfil />} />
          <Route path="/links" element={<Links />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/cadastro-pet" element={<CadastroPet />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;
