import { useState } from 'react';
import CartaFechadaSVG from '../assets/svg/carta-fechada.svg';

const mensagem = "\"Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.\""

function TelaMensagem() {
  const [mensagemAberta, setMensagemAberta] = useState(false);

  function ExibirMensagem() {
    setMensagemAberta(true);
  }

  return (
    <div className="grid justify-items-center h-screen">
      <h1 className="mt-[7rem] text-[4rem] text-white text-outline">Alguém te enviou uma mensagem especial!</h1>
      {mensagemAberta ? <CartaAberta /> : <CartaFechada onReveal={ExibirMensagem} />}
    </div>
  )
}

interface CartaFechadaProps {
  onReveal: () => void;
}

const CartaFechada: React.FC<CartaFechadaProps> = ({ onReveal }) => {
  return (
    <div className="relative w-[81.25rem] h-[40.625rem] flex items-center justify-center" onClick={onReveal}>
      <img src={CartaFechadaSVG} alt="My Icon" className="w-full h-full object-contain" />
      <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[#5C0E5D] text-[2.5rem] animate-pulse">Clique para Revelar</p>
    </div>
  );
};

const CartaAberta = () => {
  return (
    <div className="relative w-[81.25rem] h-[40.625rem] flex items-center justify-center bg-white border-[6px] border-[#5C0E5D]">
      <p className="absolute top-1/2 -translate-y-1/2 text-[#5C0E5D] text-[2.25rem] inset-x-0 text-center px-16">{mensagem}</p>
    </div>
  );
};

export default TelaMensagem