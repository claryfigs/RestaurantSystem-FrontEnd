import React, { useState } from "react";
import "./style.css";
import NavbarInstitutional from "../../components/navbar-institutional";
import InputDefault from "../../components/input-default/input-default";
import Button from "../../components/Button/Button";
import manEating from "../../assets/man-eating.png";
import pizzaDelivering from "../../assets/pizza-delivering.png";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="login-bg">
      <NavbarInstitutional />
      <div className="login-content">
        <div className="login-card login-card-client">
          <img src={manEating} alt="Cliente comendo" className="login-img" />
          <div className="login-info">
            <h2>Cliente</h2>
            <p>Faça seus pedidos no restaurante desejado da universidade</p>
            <Button
              label="Acesse Aqui"
              onClick={() => navigate("/login-cliente")}
            />
          </div>
        </div>
        <div className="login-card login-card-restaurant">
          <img
            src={pizzaDelivering}
            alt="Entregador de pizza"
            className="login-img"
          />
          <div className="login-info">
            <h2>Restaurante</h2>
            <p>Disponibilize seus produtos e gerencie pedidos</p>
            <Button
              label="Acesse Aqui"
              onClick={() => navigate("/login-restaurante")}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
