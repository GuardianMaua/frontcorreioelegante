import { useState } from 'react';
import "../index.css";

interface Item {
  id: number;
  input1: string;
  input2: string;
}

function Login() {
  const [items, setItems] = useState<Item[]>([]);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [errors, setErrors] = useState({ email: "", senha: "" });

  const validateEmail = (email: string) => {
    return email.includes("@") && email.includes(".");
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors = { email: "", senha: "" };

    // Validação do Email
    if (email.trim() === "") {
      newErrors.email = "O campo de email é obrigatório.";
    } else if (!validateEmail(email)) {
      newErrors.email = "Formato de email inválido. Exemplo: exemplo@dominio.com";
    }

    // Validação da Senha
    if (senha.trim() === "") {
      newErrors.senha = "O campo de senha é obrigatório.";
    } else if (senha.length < 6) {
      newErrors.senha = "A senha deve ter pelo menos 6 caracteres.";
    }

    setErrors(newErrors);

    if (!newErrors.email && !newErrors.senha) {
      setItems((prevItems) => [
        ...prevItems,
        { id: Date.now(), input1: email, input2: senha }
      ]);

      console.log("Login:", email, "Senha:", senha);
      alert("Login enviado com sucesso!");

      setEmail("");
      setSenha("");
    }
  };

  // const handleLogin = () => {
  //   setItems((prevItems) => [
  //     ...prevItems,
  //     { id: Date.now(), input1: email, input2: senha }
  //   ]);
  //   setEmail('');
  //   setSenha('');
  // };

  return (
    <form onSubmit={handleSubmit} className="login-container">
      <div className="login-card">
        <div className="logo-container">
          <img
            src="/favicon.jpeg"
            alt="Logo da Guardian"
            className="logo-image"
          />
        </div>

        <div className="form-group">
          <div className="form-label">Login</div>
          <div className={`input-wrapper ${errors.email ? "error-border" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="input-icon"
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
              className="form-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          {errors.email && <p className="error-message">{errors.email}</p>}
        </div>

        <div className="form-group">
          <div className="form-label">Senha</div>
          <div className={`input-wrapper ${errors.senha ? "error-border" : ""}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="input-icon"
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
              className="form-input"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
            />
          </div>
          {errors.senha && <p className="error-message">{errors.senha}</p>}
        </div>

        <button className="login-button" type="submit">
          Entrar
        </button>
      </div>
    </form>
  );
}

export default Login
