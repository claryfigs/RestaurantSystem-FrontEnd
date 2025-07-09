import React from 'react';
import './item-card-restaurant.css';
import FoodImage from '../../assets/sanduiche.jpg';
import ButtonEditRestaurant from '../button-edit-restaurant/button-edit-restaurant';

type ItemCardRestaurantProps = {
  onClick?: () => void;
  title: string;
  price: string;
  image?: string;
  isAvailable: boolean;  // nova prop para disponibilidade
};

const ItemCardRestaurant: React.FC<ItemCardRestaurantProps> = ({ onClick, title, price, image, isAvailable }) => {
  return (
    <div className='item-card-restaurant' onClick={onClick} style={{ cursor: 'pointer' }}>
      <div
        className='item-card-restaurant-image'
        style={{
          backgroundImage: `url(${image ?? FoodImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='item-card-restaurant-top'>
          <p className='item-card-restaurant-top-text'>{title}</p>
        </div>
      </div>

      <div className='item-card-restaurant-infos'>
        <ButtonEditRestaurant />
        <p
          className={`item-card-restaurant-infos-title ${
            !isAvailable ? 'unavailable' : ''
          }`}
        >
          {isAvailable ? price : 'Indisponível'}
        </p>
      </div>
    </div>
  );
};

export default ItemCardRestaurant;
