import React from 'react';
import './item-list-restaurant.css';
import ItemCardRestaurant from '../item-card-restaurant/item-card-restaurant';
import Button from '../Button/Button';

type ItemListRestaurantProps = {
  onCardClick?: () => void;
};

const ItemListRestaurant: React.FC<ItemListRestaurantProps> = ({ onCardClick }) => {
  return (
    <div className='item-list-restaurant'>

      <div className='item-list-restaurant-header'>
        <h1>Sanduíche</h1>
        <div className='item-list-restaurant-buttons'>
          <Button label="Editar categoria" variant="primary"/>
          <Button label="Adicionar item" variant="primary"/>
        </div>
      </div>
      
      <div className='restaurant-list-restaurant'>
        <ItemCardRestaurant/>
        <ItemCardRestaurant/>
      </div>

    </div>
  );
};

export default ItemListRestaurant;
