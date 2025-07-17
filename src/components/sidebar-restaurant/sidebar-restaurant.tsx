import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidebar-restaurant.css";
import SidebarIcon from "../../assets/sidebar-icon.png";

const SidebarRestaurant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsOpen(false); // Fecha o menu após navegar
  };

  return (
    <>
      {!isOpen && (
        <div className="sidebar-box" onClick={toggleSidebar}>
          <img src={SidebarIcon} alt="Ícone do menu" className="sidebar-icon" />
        </div>
      )}

      <div className={`sidebar-box-open ${isOpen ? "open" : "close"}`}>
        <div className="sidebar-box-version2" onClick={toggleSidebar}>
          <img src={SidebarIcon} alt="Ícone do menu" className="sidebar-icon" />
        </div>

        <p
          className="sidebar-buttons"
          onClick={() => handleNavigate("/restaurant-profile")}
        >
          Perfil
        </p>
        <p
          className="sidebar-buttons"
          onClick={() => handleNavigate("/track-order-restaurant")}
        >
          Pedidos em aberto
        </p>
        <p
          className="sidebar-buttons"
          onClick={() => handleNavigate("/order-record-restaurant")}
        >
          Histórico de pedidos
        </p>
        <p
          className="sidebar-buttons"
          onClick={() => handleNavigate("/suport-restaurant")}
        >
          Suporte
        </p>
        <p className="sidebar-buttons" onClick={() => handleNavigate("/")}>
          Sair
        </p>
      </div>
    </>
  );
};

export default SidebarRestaurant;
