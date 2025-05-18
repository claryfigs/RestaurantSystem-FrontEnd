import React, { useState } from 'react';
import './sidebar-client.css';
import SidebarIcon from '../../assets/sidebar-icon.png';

const SidebarClient: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <>
      {!isOpen && (
        <div className='sidebar-box' onClick={toggleSidebar}>
          <img src={SidebarIcon} alt="Ícone do menu" className="sidebar-icon" />
        </div>
      )}

      {/* Sempre renderiza a sidebar, com animação controlada por classe */}
      <div className={`sidebar-box-open ${isOpen ? 'open' : 'close'}`}>
        <div className='sidebar-box-version2' onClick={toggleSidebar}>
          <img src={SidebarIcon} alt="Ícone do menu" className="sidebar-icon" />
        </div>
        <p className='sidebar-buttons'>Restaurantes</p>
        <p className='sidebar-buttons'>Acompanhar pedido</p>
        <p className='sidebar-buttons'>Histórico de pedidos</p>
        <p className='sidebar-buttons'>Suporte</p>
        <p className='sidebar-buttons'>Sair</p>
      </div>
    </>
  );
};

export default SidebarClient;
