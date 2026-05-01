import React, { createContext, useContext, useState } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [usuario, setUsuario] = useState(null);
  const [pets, setPets] = useState([]);

  function loginUser(userData) {
    setUsuario(userData);
  }

  function logoutUser() {
    setUsuario(null);
    setPets([]);
  }

  function adicionarPet(petData) {
    const novoPet = {
      ...petData,
      id: Date.now(),
      dataCadastro: new Date().toLocaleDateString('pt-BR')
    };
    setPets(function(prev) {
      return [...prev, novoPet];
    });
  }

  function removerPet(petId) {
    setPets(function(prev) {
      return prev.filter(function(pet) {
        return pet.id !== petId;
      });
    });
  }

  function atualizarUsuario(userData) {
    setUsuario(function(prev) {
      return { ...prev, ...userData };
    });
  }

  return (
    <AppContext.Provider value={{
      usuario,
      pets,
      loginUser,
      logoutUser,
      adicionarPet,
      removerPet,
      atualizarUsuario
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp deve ser usado dentro de AppProvider');
  }
  return context;
}