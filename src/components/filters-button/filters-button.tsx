import React from 'react';
import './filters-button.css';
import FiltersIcon from '../../assets/filters-icon.png';

const FiltersButton: React.FC = () => {
  return (
    <div className='filters-button'>
        <img src={FiltersIcon} alt="Ícone de filtros" className="filters-icon" />
        <p className='filters-button-text'>Filtros</p>
    </div>
  );
};

export default FiltersButton;