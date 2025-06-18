import React from 'react';

interface ConfirmDeletePopupProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="bg-stone-800 p-6 rounded shadow text-white">
        <p>Tem certeza que deseja deletar?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button onClick={onCancel} className="px-4 py-2 bg-stone-700 rounded hover:cursor-pointer">Cancelar</button>
          <button onClick={onConfirm} className="px-4 py-2 bg-red-700 text-white rounded hover:cursor-pointer">Deletar</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
