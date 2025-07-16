import React from 'react';
import './button-map.css';
import MapIcon from '../../assets/map-icon.png';

type ButtonMapProps = {
  onClick: () => void;
};

const ButtonMap: React.FC<ButtonMapProps> = ({ onClick }) => {
  return (
    <div className='button-map' onClick={onClick}>
      <img src={MapIcon} alt="Ícone de mapa" className='button-map-image'/>
      <p>Ver mapa</p>
    </div>
  );
};

export default ButtonMap;