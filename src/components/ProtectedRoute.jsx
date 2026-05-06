import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { useToast } from './Toast';

function ProtectedRoute({ children }) {
  const { usuario } = useApp();
  const { addToast } = useToast();

  if (!usuario) {
    addToast('🔒 Faça login para continuar', 'warning');
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default ProtectedRoute;