import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sidebar-client.css';
import SidebarIcon from '../../assets/sidebar-icon.png';

const SidebarClient: React.FC = () => {
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
        <div className='sidebar-box' onClick={toggleSidebar}>
          <img src={SidebarIcon} alt="Ícone do menu" className="sidebar-icon" />
        </div>
      )}

      <div className={`sidebar-box-open ${isOpen ? 'open' : 'close'}`}>
        <div className='sidebar-box-version2' onClick={toggleSidebar}>
          <img src={SidebarIcon} alt="Ícone do menu" className="sidebar-icon" />
        </div>

        <p className='sidebar-buttons' onClick={() => handleNavigate('/home-client')}>Restaurantes</p>
        <p className='sidebar-buttons'onClick={() => handleNavigate('/track-order-client')}>Acompanhar pedido</p>
        
        <p className='sidebar-buttons' onClick={() => handleNavigate('/wallet-client')}>Carteira</p>

        <p className='sidebar-buttons' onClick={() => handleNavigate('/order-record-client')}>Histórico de pedidos</p>
        <p className='sidebar-buttons'>Perfil</p>
        <p className='sidebar-buttons'>Suporte</p>
        <p className='sidebar-buttons'>Sair</p>
      </div>
    </>
  );
};

export default SidebarClient;
