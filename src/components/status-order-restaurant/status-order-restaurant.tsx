import React, { useState } from 'react';
import './status-order-restaurant.css';
import CheckedIcon from '../../assets/checked-icon.png';

const statuses = ['em_preparo', 'saiu_pra_entrega', 'entregue'] as const;
type Status = typeof statuses[number];

const StatusOrderRestaurant: React.FC = () => {
  const [currentStatusIndex, setCurrentStatusIndex] = useState(0);

  const handleClick = (index: number) => {
    if (index === currentStatusIndex) {
      setCurrentStatusIndex(index + 1);
    }
  };

  return (
    <div className="status-tracker">
      {statuses.map((status, index) => {
        const isActive = index <= currentStatusIndex;
        const isClickable = index === currentStatusIndex;

        return (
          <div
            key={status}
            className={`status-item ${isActive ? 'active' : ''}`}
            onClick={() => isClickable && handleClick(index)}
          >
            <div
              className={`checkbox-status-item ${
                index < currentStatusIndex ? 'completed' : ''
              }`}
            >
              {index < currentStatusIndex && (
                <img src={CheckedIcon} alt="Ícone de check" className="image-checked" />
              )}
            </div>
            {status === 'em_preparo' && 'Em preparo'}
            {status === 'saiu_pra_entrega' && 'Saiu pra entrega'}
            {status === 'entregue' && 'Entregue'}
          </div>
        );
      })}
    </div>
  );
};

export default StatusOrderRestaurant;
