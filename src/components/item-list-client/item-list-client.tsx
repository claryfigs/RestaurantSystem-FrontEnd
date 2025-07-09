import React from 'react';
import './item-list-client.css';
import ItemCardClient from '../item-card-client/item-card-client';

type Item = {
  id: number;
  name: string;
  description: string;
  price: string;
  categories: string[];
  image: string;
  is_available: boolean;
};

type ItemListClientProps = {
  onCardClick?: (item: Item) => void;
  items: Item[];
};

const ItemListClient: React.FC<ItemListClientProps> = ({ onCardClick, items }) => {
  return (
    <div className='restaurant-list-client'>
      {items.length === 0 ? (
        <p>Nenhum item disponível.</p>
      ) : (
        items.map(item => (
          <ItemCardClient
            key={item.id}
            available={item.is_available}
            onClick={() => onCardClick && onCardClick(item)}
            item={item}
          />
        ))
      )}
    </div>
  );
};

export default ItemListClient;
