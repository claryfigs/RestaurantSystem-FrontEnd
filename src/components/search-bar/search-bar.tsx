import React from 'react';
import './search-bar.css';
import SearchIcon from '../../assets/search-icon.png';

const SearchBar: React.FC = () => {
  return (
    <div className='search-bar'>
      <img src={SearchIcon} alt="Ícone da lupa" className="search-icon" />
      <input
        type="text"
        className="search-input"
        placeholder="Pesquisar restaurante"
      />
    </div>
  );
};

export default SearchBar;
