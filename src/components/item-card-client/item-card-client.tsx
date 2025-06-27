import React from 'react';
import './item-card-client.css';
import FoodImage from '../../assets/sanduiche.jpg';

type ItemCardClientProps = {
  available: boolean;
  onClick?: () => void;
};

const ItemCardClient: React.FC<ItemCardClientProps> = ({ available, onClick }) => {
  const handleClick = () => {
    if (available && onClick) {
      onClick();
    }
  };

  return (
    <div
      className={`item-card-client ${!available ? 'item-card-disabled' : ''}`}
      onClick={handleClick}
      style={{ cursor: available ? 'pointer' : 'default' }}
    >
      <div
        className='item-card-client-image'
        style={{
          backgroundImage: `url(${FoodImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='item-card-client-top'>
          <p className='item-card-client-top-text'>Presunto</p>
        </div>
      </div>

      <div className='item-card-client-infos'>
        <p className='item-card-client-infos-title'>
          {available ? 'R$ 20,00' : 'Indisponível'}
        </p>
      </div>
    </div>
  );
};

export default ItemCardClient;