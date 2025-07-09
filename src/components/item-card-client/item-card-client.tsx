import React from 'react';
import './item-card-client.css';

type Item = {
  id: number;
  name: string;
  description: string;
  price: string;
  categories: string[];
  image: string;
  is_available: boolean;
};

type ItemCardClientProps = {
  available: boolean;
  onClick?: () => void;
  item: Item;
};

const ItemCardClient: React.FC<ItemCardClientProps> = ({ available, onClick, item }) => {
  const handleClick = () => {
    if (available && onClick) {
      onClick();
    }
  };

  const imageUrl = item.image.startsWith('http') ? item.image : `http://localhost:8000${item.image}`;

  return (
    <div
      className={`item-card-client ${!available ? 'item-card-disabled' : ''}`}
      onClick={handleClick}
      style={{ cursor: available ? 'pointer' : 'default' }}
      title={item.description}
    >
      <div
        className='item-card-client-image'
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='item-card-client-top'>
          <p className='item-card-client-top-text'>{item.name}</p>
        </div>
      </div>

      <div className='item-card-client-infos'>
        <p className='item-card-client-infos-title'>
          {available ? `R$ ${Number(item.price).toFixed(2)}` : 'Indisponível'}
        </p>
      </div>
    </div>
  );
};

export default ItemCardClient;
