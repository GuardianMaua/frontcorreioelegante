import React, { useState } from 'react';
import AddPopup from './AddPopUp';
import ConfirmDeletePopup from './DeletePopUp';
import { X } from 'lucide-react';

interface EditableButtonProps {
  id: string;
  input1: string;
  input2: string;
  onUpdate: (newInput1: string, newInput2: string) => void;
  onDelete: (id: string) => void;
}

const EditableButton: React.FC<EditableButtonProps> = ({
  id, input1, input2, onUpdate, onDelete
}) => {
  const [showPopup, setShowPopup] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleClosePopup = () => setShowPopup(false);
  const handleOpenDeleteConfirm = () => setShowDeleteConfirm(true);
  const handleCloseDeleteConfirm = () => setShowDeleteConfirm(false);
  const handleConfirmDelete = () => {
    onDelete(id);
    setShowDeleteConfirm(false);
  };

  return (
    <>
      <div className="relative">
        <button
          className="w-72 h-32 rounded shadow text-white flex flex-col justify-center items-start p-4 m-2"
          style={{ backgroundColor: '#5C0E5D' }}
        >
          <div className="flex flex-col gap-2 w-full">
            <div className="flex flex-row items-center gap-2 w-full">
              <span className="text-sm w-16">Código:</span>
              <div className="bg-[#141414] text-white px-2 py-1 rounded text-sm flex-1 overflow-hidden text-ellipsis select-text">
                {input1}
              </div>
            </div>
            <div className="flex flex-row items-center gap-2 w-full">
              <span className="text-sm w-16">Chave:</span>
              <div className="bg-[#141414] text-white px-2 py-1 rounded text-sm flex-1 overflow-hidden text-ellipsis select-text">
                {input2}
              </div>
            </div>
          </div>
        </button>
        <button
          onClick={handleOpenDeleteConfirm}
          className="absolute top-3 right-3 text-white rounded-full p-1 hover:text-neutral-700 hover:cursor-pointer transition"
        >
          <X size={16} />
        </button>
      </div>
      {showPopup && (
        <AddPopup
          onClose={handleClosePopup}
          onSave={(newInput1: string, newInput2: string) => {
            onUpdate(newInput1, newInput2);
            handleClosePopup();
          }}
          initialInput1={input1}
          initialInput2={input2}
        />
      )}
      {showDeleteConfirm && (
        <ConfirmDeletePopup
          onConfirm={handleConfirmDelete}
          onCancel={handleCloseDeleteConfirm}
        />
      )}
    </>
  );
};

export default EditableButton;
