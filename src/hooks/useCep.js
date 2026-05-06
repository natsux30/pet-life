import { useState } from 'react';

export function useCep() {
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState('');

  async function buscarCep(cep) {
    // Remove caracteres não numéricos
    const cepLimpo = cep.replace(/\D/g, '');

    // Valida se tem 8 dígitos
    if (cepLimpo.length !== 8) {
      return null;
    }

    setLoading(true);
    setErro('');

    try {
      const resposta = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
      const dados = await resposta.json();

      // ViaCEP retorna { erro: true } quando CEP não encontrado [citation:4][citation:5]
      if (dados.erro) {
        setErro('CEP não encontrado');
        setLoading(false);
        return null;
      }

      setLoading(false);
      return {
        cep: dados.cep,
        logradouro: dados.logradouro,
        bairro: dados.bairro,
        cidade: dados.localidade,
        estado: dados.uf,
        complemento: dados.complemento
      };
    } catch (err) {
      setErro('Erro ao buscar CEP. Tente novamente.');
      setLoading(false);
      return null;
    }
  }

  return { buscarCep, loading, erro, setErro };
}