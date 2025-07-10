import React from 'react';
import './counter-items.css';

type CounterItemsProps = {
  count: number;
  onChange: (newCount: number) => void;
};

const CounterItems: React.FC<CounterItemsProps> = ({ count, onChange }) => {
  const increase = () => {
    if (count < 10) onChange(count + 1);
  };

  const decrease = () => {
    if (count > 1) onChange(count - 1);
  };

  return (
    <div className='counter-container'>
      <div className='counter-button' onClick={decrease}>-</div>
      <div className='counter-display'>{count}</div>
      <div className='counter-button' onClick={increase}>+</div>
      {count === 10 && (
        <p className='counter-text'>O máximo de solicitáveis é 10</p>
      )}
    </div>
  );
};

export default CounterItems;
