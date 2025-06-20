import React, { useState, useEffect } from 'react';

interface AddPopupProps {
  onClose: () => void;
  onSave: (input1: string, input2: string) => void;
  initialInput1?: string;
  initialInput2?: string;
}

const AddPopup: React.FC<AddPopupProps> = ({ onClose, onSave, initialInput1 = '', initialInput2 = '' }) => {
  const [input1, setInput1] = useState(initialInput1);
  const [input2, setInput2] = useState(initialInput2);

  useEffect(() => {
    setInput1(initialInput1);
    setInput2(initialInput2);
  }, [initialInput1, initialInput2]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(input1, input2);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div
        className="p-6 rounded shadow-lg w-96"
        style={{ backgroundColor: '#141414', color: 'white' }}
      >
        <h2 className="text-lg font-bold mb-4">Preencha os dados</h2>
        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
          <input
            type="text"
            placeholder="Código"
            value={input1}
            onChange={(e) => setInput1(e.target.value)}
            className="p-2 rounded bg-stone-800 text-white placeholder-stone-500"
          />
          <input
            type="text"
            placeholder="Chave"
            value={input2}
            onChange={(e) => setInput2(e.target.value)}
            className="p-2 rounded bg-stone-800 text-white placeholder-stone-500"
          />

          <div className="flex justify-end space-x-2 mt-4 ">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded hover:cursor-pointer"
              style={{ backgroundColor: '#5C0E5D', color: 'white' }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded hover:cursor-pointer"
              style={{ backgroundColor: '#5C0E5D', color: 'white' }}
            >
              Salvar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPopup;
