import React from 'react';
import './restaurant-list-client.css';
import RestaurantCardClient from '../restaurant-card-client/restaurant-card-client';

const RestaurantListClient: React.FC = () => {
  return (

    <div className='restaurant-list-client'>
        <RestaurantCardClient/>
        <RestaurantCardClient/>
        <RestaurantCardClient/>
        <RestaurantCardClient/>
        <RestaurantCardClient/>
        <RestaurantCardClient/>
    </div>

  );
};

export default RestaurantListClient;