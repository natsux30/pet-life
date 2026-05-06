import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Carrinho from "./Pages/Carrinho";
import Perfil from "./Pages/Perfil";
import Links from "./Pages/Links";
import Login from "./Pages/Login";
import Cadastro from "./Pages/Cadastro";
import CadastroPet from "./Pages/CadastroPet";
import Loja from "./Pages/Loja";
import DetalhesProduto from "./Pages/DetalhesProduto";
import { AppProvider } from "./context/AppContext";
import { ToastProvider } from "./components/Toast";
import Checkout from "./Pages/Checkout";
import Rastreio from "./Pages/Rastreio";

import React from "react";
import "./Style.css";

function App() {
  return (
    <AppProvider>
      <ToastProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/produto/:id" element={<DetalhesProduto />} />
            <Route path="/carrinho" element={<Carrinho />} />
            <Route path="/perfil" element={<Perfil />} />
            <Route path="/links" element={<Links />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/cadastro-pet" element={<CadastroPet />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/rastreio" element={<Rastreio />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AppProvider>
  );
}

export default App;