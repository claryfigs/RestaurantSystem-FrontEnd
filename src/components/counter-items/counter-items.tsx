import React, { useState } from 'react';
import './counter-items.css';

const CounterItems: React.FC = () => {
  const [count, setCount] = useState<number>(1);

  const increase = () => {
    if (count < 10) setCount(count + 1);
  };

  const decrease = () => {
    if (count > 1) setCount(count - 1);
  };

  return (
    <div className='counter-container'>
      <div className='counter-button' onClick={decrease}>-</div>
      <div className='counter-display'>{count}</div>
      <div className='counter-button' onClick={increase}>+</div>
      {count === 10 && (
        <p className='counter-text'>O máximo de itens solicitáveis é 10</p>
      )}
    </div>
  );
};

export default CounterItems;
