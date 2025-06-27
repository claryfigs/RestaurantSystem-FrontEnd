import React from 'react';
import './button-edit-restaurant.css';
import EditIcon from '../../assets/edit-icon.png';

const ButtonEditRestaurant: React.FC = () => {
  return (
    <div className='button-edit-restaurant'>
        <img src={EditIcon} alt="Ícone de edição" className='button-edit-restaurant-image'/>
    </div>
  );
};

export default ButtonEditRestaurant;