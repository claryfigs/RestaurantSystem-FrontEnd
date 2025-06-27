import React from 'react';
import './restaurant-card-client.css';
import RestaurantImage from '../../assets/ueceana.png'; // Importe sua imagem aqui
import { useNavigate } from 'react-router-dom';
import Stars from '../stars/stars';

const RestaurantCardClient: React.FC = () => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/restaurant-client'); // Rota de destino
  };

  return (

    <div className='restaurant-card-client' onClick={handleClick}>

        <div className='restaurant-card-client-image'
            style={{
            backgroundImage: `url(${RestaurantImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            }}>
            
            <div className='restaurant-card-client-top'>
                <p className='restaurant-card-client-top-text'>Ueceana</p>
            </div>
        </div>

        <div className='restaurant-card-client-infos'>
            <h2>Seg-Sex: 7h ás 8h</h2>
            <p className='restaurant-card-client-infos-subtitle'>Aberto agora!</p>
            <Stars activeStars={3} />
        </div>
    
    </div>

  );
};

export default RestaurantCardClient;