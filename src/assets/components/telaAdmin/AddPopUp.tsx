import React, { useState } from 'react';

interface AddPopupProps {
  onClose: () => void;
  onSave: (input1: string, input2: string) => void;
  initialInput1?: string;
  initialInput2?: string;
}

const AddPopup: React.FC<AddPopupProps> = ({
  onClose,
  onSave,
  initialInput1 = '',
  initialInput2 = ''
}) => {
  const [message, setMessage] = useState(initialInput1);
  const [key, setKey] = useState(initialInput2);
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message || !key) {
      alert('Preencha todos os campos!');
      return;
    }
    setLoading(true);
    const token = localStorage.getItem('token');
    if (!token) {
      alert("Sessão expirada. Faça login novamente.");
      setLoading(false);
      onClose();
      return;
    }
    try {
      const response = await fetch(apiKey + '/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          message: message,
          key: key
        })
      });
      if (response.ok) {
        alert('Mensagem criada com sucesso!');
        setMessage('');
        setKey('');
        onSave(message, key);
        onClose();
      } else {
        const data = await response.json();
        alert('Erro ao criar mensagem: ' + (data.message || 'Erro desconhecido'));
      }
    } catch {
      alert('Erro ao criar mensagem. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(20,20,20,0.15)' }}
    >
      <div
        className="p-6 rounded shadow-lg w-[32rem] max-w-full z-[10000]"
        style={{ backgroundColor: '#141414', color: 'white' }}
      >
        <h2 className="text-lg font-bold mb-4">Preencha os dados</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Chave"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            className="p-2 rounded bg-stone-800 text-white placeholder-stone-500"
            disabled={loading}
            autoFocus
          />
          <textarea
            placeholder="Mensagem"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="p-2 rounded bg-stone-800 text-white placeholder-stone-500 min-h-[120px] max-h-[400px]"
            disabled={loading}
            rows={6}
            style={{ lineHeight: '1.5', fontFamily: 'inherit', fontSize: '1rem' }}
          />
          <div className="flex justify-end space-x-2 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded hover:cursor-pointer"
              style={{ backgroundColor: '#5C0E5D', color: 'white' }}
              disabled={loading}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded hover:cursor-pointer"
              style={{ backgroundColor: '#5C0E5D', color: 'white' }}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Salvar"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPopup;
