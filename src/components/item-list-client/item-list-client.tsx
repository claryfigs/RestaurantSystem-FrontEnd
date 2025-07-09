import React from 'react';
import './item-list-client.css';
import ItemCardClient from '../item-card-client/item-card-client';

type ItemListClientProps = {
  onCardClick?: () => void;
};

const ItemListClient: React.FC<ItemListClientProps> = ({ onCardClick }) => {
  return (
    <div className='restaurant-list-client'>
      <ItemCardClient available={true} onClick={onCardClick} />
      <ItemCardClient available={false} onClick={onCardClick} />
    </div>
  );
};

export default ItemListClient;
