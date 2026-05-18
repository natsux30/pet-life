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
import Checkout from "./Pages/Checkout";
import Rastreio from "./Pages/Rastreio";
import ProtectedRoute from "./components/ProtectedRoute";
import { AppProvider } from "./context/AppContext";
import { ToastProvider } from "./components/Toast";
import { useEffect } from "react";

import React from "react";
import "./Style.css";

function App() {
  // Dentro de App(), antes do return:
  useEffect(function () {
    const produtos = require("./data/produtos").todosProdutos;
    const ids = produtos.map((p) => p.id);
    const duplicados = ids.filter((id, index) => ids.indexOf(id) !== index);
    if (duplicados.length > 0) {
      console.error("IDs DUPLICADOS nos produtos:", duplicados);
    }
  }, []);

  return (
    <AppProvider>
      <ToastProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* Rotas públicas */}
            <Route path="/" element={<Home />} />
            <Route path="/loja" element={<Loja />} />
            <Route path="/produto/:id" element={<DetalhesProduto />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/links" element={<Links />} />

            {/* Rotas protegidas */}
            <Route
              path="/carrinho"
              element={
                <ProtectedRoute>
                  <Carrinho />
                </ProtectedRoute>
              }
            />
            <Route
              path="/checkout"
              element={
                <ProtectedRoute>
                  <Checkout />
                </ProtectedRoute>
              }
            />
            <Route
              path="/perfil"
              element={
                <ProtectedRoute>
                  <Perfil />
                </ProtectedRoute>
              }
            />
            <Route
              path="/cadastro-pet"
              element={
                <ProtectedRoute>
                  <CadastroPet />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rastreio"
              element={
                <ProtectedRoute>
                  <Rastreio />
                </ProtectedRoute>
              }
            />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AppProvider>
  );
}

export default App;
