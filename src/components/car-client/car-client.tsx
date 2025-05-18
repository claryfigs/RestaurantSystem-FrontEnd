import React, { useState } from 'react';
import './car-client.css';
import CarIcon from '../../assets/car-icon.png';
import CarItensList from '../car-itens-list/car-itens-list';

const CarClient: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {!isOpen && (
        <div className='car-box' onClick={toggleSidebar}>
          <img src={CarIcon} alt="Ícone do menu" className="car-icon" />
        </div>
      )}

      {/* Sempre renderiza a sidebar aberta, controla animação por classe */}
      <div className={`car-box-open ${isOpen ? 'open' : 'close'}`}>
        <div className='car-head-space'>
          <div className='car-box-version2' onClick={toggleSidebar}>
            <p className='car-head-text'>Seu Carrinho</p>
            <img src={CarIcon} alt="Ícone do carrinho" className="car-icon" />
          </div>
        </div>
        <CarItensList/>
      </div>
    </>
  );
};

export default CarClient;
