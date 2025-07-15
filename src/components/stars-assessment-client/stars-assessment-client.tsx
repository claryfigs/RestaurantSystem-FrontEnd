import React, { useState } from 'react';
import './stars-assessment-client.css';
import StarOn from '../../assets/star-on-icon.png';
import StarOff from '../../assets/star-off-icon.png';

type Props = {
  onChange: (rating: number) => void;
};

const StarAssessmentClient: React.FC<Props> = ({ onChange }) => {
  const [rating, setRating] = useState(5);

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
