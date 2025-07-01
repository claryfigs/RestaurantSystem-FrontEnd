import React, { useState } from "react";
import "./style.css";
import NavbarInstitutional from "../../components/navbar-institutional";
import InputDefault from "../../components/input-default/input-default";
import Button from "../../components/Button/Button";
import hamburgerCuate from "../../assets/hamburger-cuate.png";
import { Link } from "react-router-dom";

const LoginRestaurante: React.FC = () => {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

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
          <form className="login-form">
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
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                placeholder="********"
              />
            </label>
            <Link to="#" className="login-link">
              Esqueci minha senha
            </Link>
            <Button label="Entrar" type="submit" />
            <div className="login-register">
              <span>Não possui conta?</span>
              <Link to="/cadastro-restaurante">CADASTRE-SE</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginRestaurante;
