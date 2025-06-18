import React from 'react';
import './car-itens-list.css';
import CarItenClient from '../car-iten-client/car-iten-client';
import Button from '../Button/Button';

const CarItensList: React.FC = () => {
  return (
    <div className='car-itens-list'>
      <CarItenClient/>
      <CarItenClient/>
      <CarItenClient/>


      <div className='finish-space'>
      
      <div className='car-list-value'>
        <p className='car-list-text1'>Valor total:</p>
        <p className='car-list-text2'>R$ 20,00</p>
      </div>

      <div className='car-list-button'>
      <Button label="Ir para finalização" variant="secondary" />
      </div>
      
      </div>

    </div>
  );
};

export default CarItensList;