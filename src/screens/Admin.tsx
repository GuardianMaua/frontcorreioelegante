import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AddButton from '../assets/components/telaAdmin/AddButton';
import EditableButton from '../assets/components/telaAdmin/EditableButton';

interface Item {
  id: string;
  input1: string;
  input2: string;
  created_at: string;
}

function Admin() {
  const [items, setItems] = useState<Item[]>([]);
  const navigate = useNavigate();
  const apiKey = import.meta.env.VITE_API_KEY;
  const verifyToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login', { replace: true });
      return;
    }
    try {
      await axios.post(
        apiKey + '/verify-token',
        { token },
        { headers: { 'Content-Type': 'application/json' } }
      );
    } catch (error) {
      localStorage.removeItem('token');
      navigate('/login', { replace: true });
    }
  };

  useEffect(() => {
    let isMounted = true;

    verifyToken();

    const fetchMessages = async () => {
      try {
        const response = await axios.get(apiKey + '/messages/all');
        if (isMounted) {
          const mapped = response.data
            .map((msg: any) => ({
              id: msg.code,
              input1: msg.code,
              input2: msg.key,
              created_at: msg.created_at
            }))
            .sort((a: Item, b: Item) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
          setItems(mapped);
        }
      } catch (error) {
      }
    };

    fetchMessages();

    const interval = setInterval(() => {
      if (isMounted) verifyToken();
    }, 1000000);

    return () => {
      isMounted = false;
      clearInterval(interval);
    };
  }, []);

  const handleAddNewItem = () => {
    let isMounted = true;

    verifyToken();

    const fetchMessages = async () => {
      try {
        const response = await axios.get(apiKey + '/messages/all');
        if (isMounted) {
          const mapped = response.data
            .map((msg: any) => ({
              id: msg.code,
              input1: msg.code,
              input2: msg.key,
              created_at: msg.created_at
            }))
            .sort((a: Item, b: Item) =>
              new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
            );
          setItems(mapped);
        }
      } catch (error) {
      }
    };

    fetchMessages();
  };

  const handleUpdateItem = (id: string, newInput1: string, newInput2: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, input1: newInput1, input2: newInput2 }
          : item
      )
    );
  };

  const handleDeleteItem = async (id: string) => {
  try {
    await axios.delete(apiKey + '/messages', {
      data: { code: id },
      headers: { 'Content-Type': 'application/json' }
    });
    setItems((prevItems) => prevItems.filter((item) => item.id !== id));
  } catch (error) {
    alert('Erro ao deletar mensagem');
  }
};

  return (
    <div className="flex flex-row flex-wrap p-10 text-white">
      <AddButton onSave={handleAddNewItem} />
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
