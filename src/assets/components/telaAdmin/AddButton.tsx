import { useState } from 'react';
import { Plus } from "lucide-react";
import AddPopup from './AddPopUp';

interface AddButtonProps {
  onSave: (input1: string, input2: string) => void;
}

const AddButton: React.FC<AddButtonProps> = ({ onSave }) => {
  const [showPopup, setShowPopup] = useState(false);

  const handleOpenPopup = () => {
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
  };

  return (
    <>
      <button
        onClick={handleOpenPopup}
        className="flex items-center justify-center w-72 h-32 rounded shadow hover:cursor-pointer m-2"
        style={{ backgroundColor: '#5C0E5D', color: 'white' }}
      >
        <Plus />
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
