import React, { useState } from "react";
import "./style.css";
import NavbarInstitutional from "../../components/navbar-institutional";
import InputDefault from "../../components/input-default/input-default";
import Button from "../../components/Button/Button";
import hamburgerCuate from "../../assets/hamburger-cuate.png";
import { Link, useNavigate } from "react-router-dom";

const LoginCliente: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const response = await fetch("http://localhost:8000/api/v1/auth-token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      if (!response.ok) {
        let data;
        try {
          data = await response.json();
        } catch (jsonError) {
          throw new Error(`Erro HTTP ${response.status}: resposta não é JSON válido`);
        }
        const message = data.detail || data.error || `Erro HTTP ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();

      // Salvando no localStorage
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("userId", String(data.user_id));
      localStorage.setItem("userType", data.user_type);

      // Inicializando carrinho vazio no localStorage
      localStorage.setItem("cartItems", JSON.stringify([]));
      console.log("Carrinho inicializado:", []);

      // Logando no console
      console.log("Login realizado com sucesso!");
      console.log("Access Token:", data.access);
      console.log("Refresh Token:", data.refresh);
      console.log("User ID:", data.user_id);
      console.log("User Type:", data.user_type);

      navigate("/home-client");
    } catch (err: any) {
      setError(err.message || "Erro desconhecido ao fazer login.");
    }
  };

  return (
    <div className="login-bg">
      <NavbarInstitutional leftTitle="Login de Cliente" />
      <div className="login-container">
        <div className="login-content-form">
          <div className="login-img-box">
            <img
              src={hamburgerCuate}
              alt="Login Cliente"
              className="login-img"
            />
          </div>
          <form className="login-form" onSubmit={handleLogin}>
            <h1 className="login-title">Acesso Cliente</h1>
            <label>
              E-mail institucional:
              <InputDefault
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="aluno@aluno.uece.br"
              />
            </label>
            <label>
              Senha:
              <InputDefault
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="********"
              />
            </label>
            {error && <p className="login-error">{error}</p>}
            <Link to="#" className="login-link">
              Esqueci minha senha
            </Link>
            <Button label="Entrar" type="submit" />
            <div className="login-register">
              <span>Não possui conta?</span>
              <Link to="/cadastro-cliente">CADASTRE-SE</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginCliente;
