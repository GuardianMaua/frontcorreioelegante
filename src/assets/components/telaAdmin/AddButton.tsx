import { useState } from 'react';
import { Plus } from "lucide-react";
import AddPopup from './AddPopUp';

interface AddButtonProps {
  onSave: (input1: string, input2: string) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onSave }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => setShowPopup(true);
  const handleClosePopup = () => setShowPopup(false);

  return (
    <>
      <button
        onClick={handleOpenPopup}
        className="
          w-72 h-32
          min-w-[18rem] min-h-[8rem]
          flex flex-col items-center justify-center
          rounded shadow hover:cursor-pointer m-2
          transition-all duration-150
        "
        style={{ backgroundColor: '#5C0E5D', color: 'white' }}
        aria-label="Adicionar novo"
      >
        <div className="flex flex-col justify-center items-center w-full h-full">
          <Plus size={36} />
        </div>
      </button>
      {showPopup && (
        <AddPopup
          onClose={handleClosePopup}
          onSave={(input1, input2) => {
            onSave(input1, input2);
            handleClosePopup();
          }}
        />
      )}
    </>
  );
};

export default AddButton;
