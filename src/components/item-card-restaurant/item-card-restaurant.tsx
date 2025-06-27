import React from 'react';
import './item-card-restaurant.css';
import FoodImage from '../../assets/sanduiche.jpg';
import ButtonEditRestaurant from '../button-edit-restaurant/button-edit-restaurant';

type ItemCardRestaurantProps = {
  onClick?: () => void;
};

const ItemCardRestaurant: React.FC<ItemCardRestaurantProps> = ({ onClick }) => {
  return (
    <div className='item-card-restaurant' onClick={onClick} style={{ cursor: 'pointer' }}>
      <div
        className='item-card-restaurant-image'
        style={{
          backgroundImage: `url(${FoodImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='item-card-restaurant-top'>
          <p className='item-card-restaurant-top-text'>Presunto</p>
        </div>
      </div>

      <div className='item-card-restaurant-infos'>
        <ButtonEditRestaurant />
        <p className='item-card-restaurant-infos-title'>20,00</p>
      </div>
    </div>
  );
};

export default ItemCardRestaurant;
