import React from "react";
import "./style.css";
import NavbarInstitutional from "../../components/navbar-institutional";
import streetFood from "../../assets/street-food.png";
import { Link } from "react-router-dom";

const CadastroRestaurante: React.FC = () => {
  return (
    <div className="cadastro-bg">
      <NavbarInstitutional leftTitle="Cadastro de Restaurantes" />
      <div className="cadastro-container">
        <div className="cadastro-content-restaurante">
          <div className="cadastro-img-box">
            <img
              src={streetFood}
              alt="Cadastro Restaurante"
              className="cadastro-img"
            />
          </div>
          <div className="cadastro-restaurante-info">
            <h1 className="cadastro-title">Cadastre seu negócio</h1>
            <p>
              Entre em contato com administradores
              <br />
              para se cadastrar no sistema de vendas:
            </p>
            <p>
              <b>Whatsapp:</b>
              <br />
              +55 85 9999-0000
            </p>
            <p>
              <b>Email:</b>
              <br />
              Tobrocado@uece.br
            </p>
            <p>
              Iremos avaliar sua solicitação e entraremos
              <br />
              em contato em breve.
            </p>
            <p className="cadastro-restaurante-login">
              Já possui conta?
              <br />
              <Link to="/login-restaurante">FAÇA LOGIN</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CadastroRestaurante;
