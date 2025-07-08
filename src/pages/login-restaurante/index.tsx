import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "./style.css";
import NavbarInstitutional from "../../components/navbar-institutional";
import InputDefault from "../../components/input-default/input-default";
import Button from "../../components/Button/Button";
import hamburgerCuate from "../../assets/hamburger-cuate.png";

const LoginRestaurante: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError(null);
    try {
      console.log("Tentando fazer login com:", { email, senha });

      const response = await fetch("http://localhost:8000/api/v1/auth-token/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password: senha }),
      });

      console.log("Resposta recebida:", response);

      if (!response.ok) {
        let data;
        try {
          data = await response.json();
          console.log("Corpo da resposta de erro:", data);
        } catch (jsonError) {
          console.error("Erro ao parsear JSON da resposta:", jsonError);
          throw new Error(
            `Erro HTTP ${response.status}: resposta não é JSON válido`
          );
        }

        const message =
          data.detail || data.error || `Erro HTTP ${response.status}`;
        throw new Error(message);
      }

      const data = await response.json();
      console.log("Login bem-sucedido, dados recebidos:", data);

      // Salvar os dados no localStorage
      localStorage.setItem("accessToken", data.access);
      localStorage.setItem("refreshToken", data.refresh);
      localStorage.setItem("userId", data.user_id.toString());
      localStorage.setItem("userType", data.user_type);

      navigate("/restaurant-profile");
    } catch (err: any) {
      console.error("Erro durante o processo de login:", err);
      setError(err.message || "Erro desconhecido ao fazer login.");
    }
  };

  return (
    <div className="login-bg">
      <NavbarInstitutional leftTitle="Login de Restaurante" />
      <div className="login-container">
        <div className="login-content-form">
          <div className="login-img-box">
            <img
              src={hamburgerCuate}
              alt="Login Restaurante"
              className="login-img"
            />
          </div>
          <div className="login-form">
            <h1 className="login-title">Acesso Restaurante</h1>

            <label>
              E-mail institucional:
              <InputDefault
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="restaurante@uece.br"
              />
            </label>

            <label>
              Senha:
              <InputDefault
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="****"
              />
            </label>

            {error && <p className="login-error">{error}</p>}

            <Link to="#" className="login-link">
              Esqueci minha senha
            </Link>

            <Button label="Entrar" type="button" onClick={handleLogin} />

            <div className="login-register">
              <span>Não possui conta?</span>
              <Link to="/cadastro-restaurante">CADASTRE-SE</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRestaurante;
