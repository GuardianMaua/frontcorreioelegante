import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import CartaFechadaSVG from '../assets/svg/carta-fechada.svg';

const HeartSVG = ({ className = '', style = {} }) => (
  <svg
    viewBox="0 0 32 29.6"
    width="32"
    height="29.6"
    fill="#5C0E5D"
    className={className}
    style={style}
  >
    <path d="M23.6,0c-2.6,0-5,1.2-6.6,3.2C15.4,1.2,13,0,10.4,0C4.7,0,0,4.7,0,10.4
      c0,11.1,16,19.2,16,19.2s16-8.1,16-19.2C32,4.7,27.3,0,23.6,0z"/>
  </svg>
);

const HeartsAnimation = ({ count = 16 }) => {
  const hearts = Array.from({ length: count }).map((_, i) => ({
    id: i,
    left: Math.random() * 100,
    size: 18 + Math.random() * 24,
    delay: Math.random() * 3,
    duration: 3.5 + Math.random() * 2.5,
    opacity: 0.6 + Math.random() * 0.4,
    rotate: Math.random() * 40 - 20,
  }));

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {hearts.map(heart => (
        <HeartSVG
          key={heart.id}
          style={{
            position: 'absolute',
            left: `${heart.left}%`,
            bottom: '-40px',
            width: `${heart.size}px`,
            height: `${heart.size * 0.9}px`,
            opacity: heart.opacity,
            animation: `floatUp ${heart.duration}s ${heart.delay}s infinite cubic-bezier(.44,0,.77,1)`,
            transform: `rotate(${heart.rotate}deg)`,
            fill: '#5C0E5D',
          }}
        />
      ))}
    </div>
  );
};

function useQueryParams() {
  const { search } = useLocation();
  return new URLSearchParams(search);
}

function TelaMensagem() {
  const [mensagemAberta, setMensagemAberta] = useState(false);
  const [mensagem, setMensagem] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [carregando, setCarregando] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const query = useQueryParams();
  const code = query.get('code');
  const key = query.get('key');

  useEffect(() => {
    if (!code || !key) {
      setErro('Código inexistente ou chave inválida');
    }
  }, [code, key]);

  useEffect(() => {
    if (code && key) {
      setCarregando(true);
      fetch(apiKey + '/messages/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, key })
      })
        .then(async (res) => {
          if (!res.ok) throw new Error();
          const data = await res.json();
          setMensagem(data.message);
        })
        .catch(() => setErro('Código inexistente ou chave inválida'))
        .finally(() => setCarregando(false));
    }
  }, [code, key]);

  useEffect(() => {
    if (code && key) {
      setCarregando(true);
      fetch(apiKey + '/messages/get', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ code, key })
      })
        .then(async (res) => {
          if (!res.ok) throw new Error();
          const data = await res.json();
          setMensagem(data.message);
        })
        .catch(() => setErro('Código inexistente ou chave inválida'))
        .finally(() => setCarregando(false));
    }
  }, [code, key]);

  function ExibirMensagem() {
    setMensagemAberta(true);
  }

  function FecharMensagem() {
    setMensagemAberta(false);
  }

  if (erro) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-2 bg-transparent relative">
        <div className="relative z-10 w-full flex flex-col items-center">
          <h1 className="text-xl sm:text-2xl md:text-3xl text-white text-outline font-semibold text-center drop-shadow-lg">
            {erro}
          </h1>
        </div>
      </div>
    );
  }

  if (carregando && code && key) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-2 bg-transparent relative">
        <HeartsAnimation />
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-[#5C0E5D] border-t-transparent rounded-full animate-spin mb-2"></div>
          <h1 className="text-xl sm:text-2xl md:text-3xl text-white text-outline font-semibold text-center drop-shadow-lg">
            Carregando...
          </h1>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-2 bg-transparent relative">
      <HeartsAnimation />
      <div className="relative z-10 w-full flex flex-col items-center">
        <h1
          className={`
            mb-6 mt-2 text-xl sm:text-2xl md:text-3xl lg:text-4xl text-white text-outline font-bold text-center drop-shadow-lg
            ${mensagemAberta ? 'hidden sm:block' : ''}
          `}
        >
          Alguém te enviou uma mensagem especial!
        </h1>
        {mensagemAberta
          ? <CartaAberta mensagem={mensagem} onClose={FecharMensagem} />
          : <CartaFechada onReveal={ExibirMensagem} />}
      </div>
    </div>
  );
}

interface CartaFechadaProps {
  onReveal: () => void;
}

const CartaFechada: React.FC<CartaFechadaProps> = ({ onReveal }) => (
  <div
    className="
      relative z-10
      w-full max-w-[98vw] sm:max-w-[440px] md:max-w-[600px] lg:max-w-[800px]
      h-[60vw] min-h-[320px] max-h-[70vh] sm:h-[340px] md:h-[400px] lg:h-[480px]
      flex items-center justify-center
      cursor-pointer
      shadow-xl
      transition-transform duration-200 hover:scale-105
      bg-transparent
      my-3
    "
    onClick={onReveal}
  >
    <img src={CartaFechadaSVG} alt="My Icon" className="w-full h-full object-contain select-none pointer-events-none" draggable={false} />
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
      <span className="flex items-center gap-2">
        <span className="text-[#5C0E5D] text-base sm:text-xl md:text-2xl font-semibold animate-pulse text-center px-2 drop-shadow">
          Clique para Revelar
        </span>
      </span>
    </div>
  </div>
);

interface CartaAbertaProps {
  mensagem: string | null;
  onClose: () => void;
}

const CartaAberta: React.FC<CartaAbertaProps> = ({ mensagem, onClose }) => (
  <div
    className={`
      fixed inset-0 z-30
      flex items-center justify-center
      bg-black/60
      animate-fadeIn
      sm:relative sm:bg-transparent
      w-full max-w-[98vw] sm:max-w-[440px] md:max-w-[600px] lg:max-w-[800px]
      h-full sm:h-[400px] md:h-[480px] lg:h-[560px]
      my-0 sm:my-3
      overflow-hidden
      transition-all
    `}
    style={{ animation: 'fadeIn 0.6s' }}
  >
    <div
      className={`
        w-full h-full flex flex-col justify-between
        px-4 sm:px-8 md:px-14 py-4 sm:py-8
        text-[#5C0E5D]
        font-serif
        text-base sm:text-lg md:text-xl
        leading-relaxed
        text-left
        whitespace-pre-line
        break-words
        rounded-none sm:rounded-md
        bg-white/90
        border-[6px] border-[#5C0E5D]
        shadow-2xl
        shadow-inner
        overflow-y-auto
        max-h-full
      `}
      style={{
        fontSize: 'clamp(1.05rem, 3vw, 1.25rem)',
        maxHeight: '100%',
      }}
    >
      <div className="flex-1">
        {mensagem || "Carregando..."}
      </div>
      <div className="flex justify-center mt-8">
        <button
          onClick={onClose}
          className="
            bg-[#5C0E5D] hover:bg-[#7b2280] text-white font-semibold
            rounded-full px-6 py-2 shadow-lg transition
            text-base sm:text-lg
            focus:outline-none focus:ring-2 focus:ring-[#5C0E5D]
          "
          aria-label="Fechar carta"
          type="button"
        >
          Fechar carta
        </button>
      </div>
    </div>
  </div>
);

export default TelaMensagem;
