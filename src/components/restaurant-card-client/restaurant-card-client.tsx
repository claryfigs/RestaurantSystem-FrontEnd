import React from 'react';
import './restaurant-card-client.css';
import { useNavigate } from 'react-router-dom';
import Stars from '../stars/stars';
import RestaurantStatusLittle from '../restaurant-status-little/restaurant-status-little';

type RestaurantCardClientProps = {
  id: number;
  name: string;
  image: string;
  isOpen: boolean;
  openingTime: string;
  closingTime: string;
};

// Função para formatar como 06:00
const formatHour = (time: string) => {
  const [hour, minute] = time.split(':');
  return `${hour}:${minute}`;
};

const RestaurantCardClient: React.FC<RestaurantCardClientProps> = ({
  id,
  name,
  image,
  isOpen,
  openingTime,
  closingTime,
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/restaurant-client/${id}`);
  };

  return (
    <div className='restaurant-card-client' onClick={handleClick}>
      <div
        className='restaurant-card-client-image'
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className='restaurant-card-client-top'>
          <p className='restaurant-card-client-top-text'>{name}</p>
        </div>
      </div>

      <div className='restaurant-card-client-infos'>
        <RestaurantStatusLittle isOpen={isOpen} />
        <h2>
          {formatHour(openingTime)} às {formatHour(closingTime)}
        </h2>
        <Stars activeStars={5} />
      </div>
    </div>
  );
};

export default RestaurantCardClient;
