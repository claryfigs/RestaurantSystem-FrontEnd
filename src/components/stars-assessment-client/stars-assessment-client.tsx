import React, { useState } from 'react';
import './stars-assessment-client.css';
import StarOn from '../../assets/star-on-icon.png';
import StarOff from '../../assets/star-off-icon.png';

const StarAssessmentClient: React.FC = () => {
  const [rating, setRating] = useState(5); // Começa com todas as estrelas ativas

  const handleClick = (index: number) => {
    setRating(index + 1); // index começa do 0, por isso +1
  };

  return (
    <div className='stars-container'>
      {[0, 1, 2, 3, 4].map((index) => (
        <img
          key={index}
          src={index < rating ? StarOn : StarOff}
          alt={`Estrela ${index + 1}`}
          className='star-icon'
          style={{ cursor: 'pointer' }}
          onClick={() => handleClick(index)}
        />
      ))}
    </div>
  );
};

export default StarAssessmentClient;
