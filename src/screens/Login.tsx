import { useState } from 'react';
import axios from 'axios';
import "../index.css";
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({ email: "", senha: "" });
  const [loading, setLoading] = useState(false);
  const apiKey = import.meta.env.VITE_API_KEY;
  const navigate = useNavigate();
  const validateEmail = (email: string) => {
    return email.includes("@") && email.includes(".");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: "", senha: "" };

    if (email.trim() === "") {
      newErrors.email = "O campo de email é obrigatório.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Formato de email inválido. Exemplo: exemplo@dominio.com";
    }

    if (senha.trim() === "") {
      newErrors.senha = "O campo de senha é obrigatório.";
    } else if (senha.length < 4) {
      newErrors.senha = "A senha deve ter pelo menos 4 caracteres.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.senha) {
      setLoading(true);
      try {
        const response = await axios.post(
          apiKey + '/login',
          {
            email: email,
            password: senha
          },
          {
            headers: { 'Content-Type': 'application/json' }
          }
        );

        if (response.data && response.data.token) {
          localStorage.setItem('token', response.data.token);
          alert("Login realizado com sucesso!");
          setEmail("");
          setSenha("");
          navigate('/admin')
        } else {
          alert("Erro. Tente novamente.");
        }
      } catch (error: any) {
        if (error.response && error.response.data && error.response.data.message) {
          alert(error.response.data.message);
        } else {
          alert("Erro ao fazer login. Verifique suas credenciais.");
        }
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex justify-center items-center min-h-screen bg-[#141414] font-[Poppins]"
    >
      <div className="bg-gray-100 p-8 pb-15 rounded-xl shadow-lg w-full max-w-md">
        <div className="flex justify-center mb-6">
          <img
            src="/favicon.jpeg"
            alt="Logo da Guardian"
            className="h-20 w-20"
          />
        </div>

        <div className="mb-6">
          <div className="text-sm font-semibold mb-2 block text-[#5C0E5D]">Login</div>
          <div className={`flex items-center rounded-md px-3 py-2 bg-white border-2 ${errors.email ? "border-red-500" : "border-white"} shadow-[0_2px_4px_rgba(0,0,0,0.2)]`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2 text-[#5C0E5D]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5A2.25 2.25 0 012.25 17.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5H4.5a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.007 1.874l-7.5 4.5a2.25 2.25 0 01-2.486 0l-7.5-4.5A2.25 2.25 0 012.25 6.993V6.75"
              />
            </svg>
            <input
              type="email"
              placeholder="email"
              className="bg-transparent border-none outline-none w-full text-black"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={loading}
            />
          </div>
          {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
        </div>

        <div className="mb-6">
          <div className="text-sm font-semibold mb-2 block text-[#5C0E5D]">Senha</div>
          <div className={`flex items-center rounded-md px-3 py-2 bg-white border-2 ${errors.senha ? "border-red-500" : "border-white"} shadow-[0_2px_4px_rgba(0,0,0,0.2)]`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 h-5 mr-2 text-[#5C0E5D]"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 10.5v-1.875a4.5 4.5 0 10-9 0V10.5m-.75 0h10.5A1.5 1.5 0 0118.75 12v6.75a1.5 1.5 0 01-1.5 1.5H6.75a1.5 1.5 0 01-1.5-1.5V12a1.5 1.5 0 011.5-1.5z"
              />
            </svg>
            <input
              type="password"
              placeholder="***********"
              className="bg-transparent border-none outline-none w-full text-black"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              disabled={loading}
            />
          </div>
          {errors.senha && <p className="text-red-500 text-xs mt-1">{errors.senha}</p>}
        </div>

        <button
          className="w-full text-white py-2 rounded-md transition duration-300 bg-[#5C0E5D] mt-10 shadow-[0_4px_6px_rgba(0,0,0,0.3)] hover:bg-[#4a0b4a] cursor-pointer"
          type="submit"
          disabled={loading}
        >
          {loading ? "Entrando..." : "Entrar"}
        </button>
      </div>
    </form>
  );
}

export default Login;
