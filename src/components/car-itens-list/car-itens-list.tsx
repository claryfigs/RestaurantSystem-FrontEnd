import React from 'react';
import './car-itens-list.css';
import CarItenClient from '../car-iten-client/car-iten-client';

const CarItensList: React.FC = () => {
  return (
    <div className='car-itens-list'>
      <CarItenClient/>
      <CarItenClient/>
      <CarItenClient/>
      <CarItenClient/>
      <CarItenClient/>
      <CarItenClient/>
      <div className='finish-shopping-button'>
        Finalizar compra
      </div>
    </div>
  );
};

export default CarItensList;