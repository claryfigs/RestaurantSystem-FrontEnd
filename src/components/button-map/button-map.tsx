import React from 'react';
import './button-map.css';
import MapIcon from '../../assets/map-icon.png';

const ButtonMap: React.FC = () => {
  return (
    <div className='button-map'>
        <img src={MapIcon} alt="Ícone de mapa" className='button-map-image'/>
        <p>Ver mapa</p>
    </div>
  );
};

export default ButtonMap;