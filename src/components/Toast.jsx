import React, { useState, useEffect, createContext, useContext, useCallback } from 'react';

const ToastContext = createContext();

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);

  const addToast = useCallback(function(message, type, duration) {
    const id = Date.now();
    const toastDuration = duration || 3000;
    
    setToasts(function(prev) {
      return [...prev, { id, message, type, duration: toastDuration }];
    });

    setTimeout(function() {
      setToasts(function(prev) {
        return prev.filter(function(toast) {
          return toast.id !== id;
        });
      });
    }, toastDuration);
  }, []);

  const removeToast = useCallback(function(id) {
    setToasts(function(prev) {
      return prev.filter(function(toast) {
        return toast.id !== id;
      });
    });
  }, []);

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      
      {/* Container dos toasts */}
      <div style={{
        position: 'fixed',
        bottom: '30px',
        right: '30px',
        zIndex: 9999,
        display: 'flex',
        flexDirection: 'column',
        gap: '10px'
      }}>
        {toasts.map(function(toast) {
          const bgColor = 
            toast.type === 'success' ? '#2e7d32' :
            toast.type === 'error' ? '#d63031' :
            toast.type === 'warning' ? '#e65100' : '#667eea';

          const icon = 
            toast.type === 'success' ? '✅' :
            toast.type === 'error' ? '❌' :
            toast.type === 'warning' ? '⚠️' : 'ℹ️';

          return (
            <div
              key={toast.id}
              style={{
                background: bgColor,
                color: 'white',
                padding: '15px 20px',
                borderRadius: '12px',
                boxShadow: '0 8px 30px rgba(0,0,0,0.2)',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                minWidth: '300px',
                maxWidth: '400px',
                animation: 'slideIn 0.3s ease',
                fontSize: '0.9rem'
              }}
            >
              <span style={{ fontSize: '1.2rem' }}>{icon}</span>
              <span style={{ flex: 1 }}>{toast.message}</span>
              <button
                onClick={function() { removeToast(toast.id); }}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1.1rem',
                  opacity: 0.7,
                  padding: '0 5px'
                }}
              >
                ✕
              </button>
            </div>
          );
        })}
      </div>

      {/* Estilo da animação */}
      <style>{`
        @keyframes slideIn {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider');
  }
  return context;
}