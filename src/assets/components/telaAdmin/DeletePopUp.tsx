import React from 'react';

interface ConfirmDeletePopupProps {
  onConfirm: () => void;
  onCancel: () => void;
}

const ConfirmDeletePopup: React.FC<ConfirmDeletePopupProps> = ({ onConfirm, onCancel }) => {
  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center"
      style={{ backgroundColor: 'rgba(20,20,20,0.15)' }}
    >
      <div className="bg-stone-800 p-6 rounded shadow text-white z-[10000]">
        <p>Tem certeza que deseja deletar?</p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-stone-700 rounded hover:cursor-pointer"
          >
            Cancelar
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 bg-red-700 text-white rounded hover:cursor-pointer"
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDeletePopup;
