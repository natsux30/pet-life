import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Formulario from "./Form";
import Navbar from "../components/Navbar";
function login() {
    return (
        <div>
            <BrowserRouter>
                <Navbar />

                <Routes>
                    <Route path="/Form" element={<Formulario />} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}
export default login;