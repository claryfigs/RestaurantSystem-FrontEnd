import React from 'react';
import './stars.css';
import StarOn from '../../assets/star-on-icon.png';
import StarOff from '../../assets/star-off-icon.png';

type StarsProps = {
  activeStars: number; // Quantidade de estrelas ativas (de 0 a 5)
};

const Stars: React.FC<StarsProps> = ({ activeStars }) => {
  const totalStars = 5;

  return (
    <div className="stars-container">
      {Array.from({ length: totalStars }, (_, index) => (
        <img
          key={index}
          src={index < activeStars ? StarOn : StarOff}
          alt={index < activeStars ? 'Estrela ativa' : 'Estrela inativa'}
          className="close-icon-modal-assessment-client"
          style={{ cursor: 'pointer' }}
        />
      ))}
    </div>
  );
};

export default Stars;