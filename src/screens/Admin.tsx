import { useState } from 'react';
import AddButton from '../assets/components/telaAdmin/AddButton';
import EditableButton from '../assets/components/telaAdmin/EditableButton';

interface Item {
  id: number;
  input1: string;
  input2: string;
}

function Admin() {
  const [items, setItems] = useState<Item[]>([]);

  const handleAddNewItem = (input1: string, input2: string) => {
    setItems((prevItems) => [
      ...prevItems,
      { id: Date.now(), input1, input2 }
    ]);
  };

  const handleUpdateItem = (id: number, newInput1: string, newInput2: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, input1: newInput1, input2: newInput2 }
          : item
      )
    );
  };

  const handleDeleteItem = (id: number) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  };

  return (
    <div className="flex flex-row flex-wrap p-10 text-white">
      {/* Usando o AddButton com onSave */}
      <AddButton onSave={handleAddNewItem}/>

      {/* Lista de EditableButtons */}
      {items.map((item) => (
        <EditableButton
          key={item.id}
          id={item.id}
          input1={item.input1}
          input2={item.input2}
          onUpdate={(newInput1, newInput2) => handleUpdateItem(item.id, newInput1, newInput2)}
          onDelete={handleDeleteItem}
        />

      ))}
    </div>
  );
}

export default Admin;
