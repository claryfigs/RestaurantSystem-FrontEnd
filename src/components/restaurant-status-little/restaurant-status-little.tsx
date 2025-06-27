import React from 'react';
import './restaurant-status-little.css';

type RestaurantStatusLittleProps = {
  isOpen: boolean;
};

const RestaurantStatusLittle: React.FC<RestaurantStatusLittleProps> = ({ isOpen }) => {
  return (
    <div className={`restaurant-status-little ${isOpen ? '' : 'closed'}`}>
      <div className={`restaurant-iconstatus-little ${isOpen ? '' : 'closed'}`}></div>
      <p>{isOpen ? 'Aberto agora' : 'Fechado agora'}</p>
    </div>
  );
};

export default RestaurantStatusLittle;
