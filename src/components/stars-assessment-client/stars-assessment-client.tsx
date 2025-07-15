import React, { useState, useEffect } from 'react';
import './stars-assessment-client.css';
import StarOn from '../../assets/star-on-icon.png';
import StarOff from '../../assets/star-off-icon.png';

type Props = {
  onChange: (rating: number) => void;
  initialRating?: number;  // prop opcional para rating inicial
};

const StarAssessmentClient: React.FC<Props> = ({ onChange, initialRating = 5 }) => {
  const [rating, setRating] = useState(initialRating);

  // Atualiza o rating se initialRating mudar (útil quando for editando)
  useEffect(() => {
    setRating(initialRating);
  }, [initialRating]);

  const handleClick = (index: number) => {
    const newRating = index + 1;
    setRating(newRating);
    onChange(newRating);
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
