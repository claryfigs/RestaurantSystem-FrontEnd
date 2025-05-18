import './type-restaurant-buttons.css';
import FoodIcon from '../../assets/food-icon.png';
import HeartIcon from '../../assets/heart-icon.png';

const TypeRestaurantButtons: React.FC = () => {
    
  return (
    <div className='type-restaurant-buttons'>
        
        <div className='type-restaurant-all'>
            <img src={FoodIcon} alt="Ícone de comida" className="food-icon" />
            <p className='type-restaurant-all-text'>Todos os restaurantes</p>
        </div>

        <div className='type-restaurant-favorites'>
          <img src={HeartIcon} alt="Ícone de coração" className="heart-icon" />
          <p className='type-restaurant-favorites-text'>Favoritados</p>
        </div>

    </div>
  );
};

export default TypeRestaurantButtons;
