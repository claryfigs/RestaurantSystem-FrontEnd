import React from "react";
import "./style.css";
import NavbarInstitutional from "../../components/navbar-institutional";
import InfoCard from "../../components/info-card";
import Button from "../../components/Button/Button";
import deliverFood from "../../assets/deliver-food.png";
import askingFood from "../../assets/asking-food.png";

const Home: React.FC = () => {
  return (
    <div className="home-bg">
      <NavbarInstitutional />
      <div className="home-content">
        <div className="home-welcome">
          Bem-vindo ao <b>Tô Brocado</b>
        </div>
        <div className="home-cards-row">
          <InfoCard
            title="Aqui os alunos de"
            boldText="UECE"
            description="podem fazer pedidos dos restaurantes dentro da universidade, escolhendo um local de entrega."
            image={askingFood}
            alt="Ícone de pedido"
          />
          <InfoCard
            title="Os"
            boldText="restaurantes"
            description="podem cadastrar seu cardápio e gerenciar os pedidos do restaurante pelo sistema."
            image={deliverFood}
            alt="Ícone de restaurante"
          />
        </div>
        <div className="home-btn-row">
          <Button label="Entrar" />
        </div>
      </div>
    </div>
  );
};

export default Home;
