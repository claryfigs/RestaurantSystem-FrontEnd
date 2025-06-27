import React from 'react';
import './restaurant-status.css';

type RestaurantStatusProps = {
  isOpen: boolean;
};

const RestaurantStatus: React.FC<RestaurantStatusProps> = ({ isOpen }) => {
  return (
    <div className={`restaurant-status ${isOpen ? '' : 'closed'}`}>
      <div className={`restaurant-iconstatus ${isOpen ? '' : 'closed'}`}></div>
      <p>{isOpen ? 'Aberto agora' : 'Fechado agora'}</p>
    </div>
  );
};

export default RestaurantStatus;
