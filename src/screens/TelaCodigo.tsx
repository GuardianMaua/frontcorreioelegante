import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function TelaCodigo() {
  const [codigo, setCodigo] = useState('');
  const [chave, setChave] = useState('');
  const navigate = useNavigate();

  function handleProcurar(e: { preventDefault: () => void; }) {
    e.preventDefault();
    if (!codigo.trim() || !chave.trim()) return;
    navigate(`/mensagem?code=${encodeURIComponent(codigo)}&key=${encodeURIComponent(chave)}`);
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div style={{ backgroundColor: '#5C0E5D' }} className="p-6 rounded-lg shadow-lg w-80 flex flex-col items-center space-y-4">
        <img src={"cifraDoAmor.jpg"} alt="Logo da empresa" />
        <input
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
          placeholder="Código"
          className="bg-white w-full mb-4 px-4 py-2 border border-gray-300 rounded"
        />
        <input
          value={chave}
          onChange={e => setChave(e.target.value)}
          placeholder="Chave"
          className="bg-white w-full px-4 py-2 border border-gray-300 rounded"
        />
        <button onClick={handleProcurar} className="buttonTelaPrincipal w-full">Procurar</button>
      </div>
    </div>
  );
}

export default TelaCodigo;
