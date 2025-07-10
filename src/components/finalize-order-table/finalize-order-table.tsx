import React, { useEffect, useState } from 'react';
import './finalize-order-table.css';

type CartItem = {
  name: string;
  category: string;
  quantity: number;
  price: string;
  image: string;
  itemId: number;
  profileId: number | null;
};

const FinalizeOrderTable: React.FC = () => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [total, setTotal] = useState<string>('0.00');

  useEffect(() => {
    function updateCart() {
      const stored = JSON.parse(localStorage.getItem('cartItems') || '[]');
      setCartItems(stored);
      const sum = stored.reduce(
        (acc: number, item: CartItem) => acc + parseFloat(item.price),
        0
      );
      setTotal(sum.toFixed(2));
    }

    updateCart();

    window.addEventListener('cartUpdated', updateCart);

    return () => {
      window.removeEventListener('cartUpdated', updateCart);
    };
  }, []);

  return (
    <div className='finalize-order-box'>

      <div className='finalize-order-box-columns'>

        <div className='finalize-order-column'>
          <p className='finalize-order-column-title'>Nome</p>
          {cartItems.map((item, index) => (
            <p key={index} className='finalize-order-column-subtitle'>{item.name}</p>
          ))}
        </div>

        <div className='finalize-order-column'>
          <p className='finalize-order-column-title'>Categoria</p>
          {cartItems.map((item, index) => (
            <p key={index} className='finalize-order-column-subtitle'>{item.category}</p>
          ))}
        </div>

        <div className='finalize-order-column'>
          <p className='finalize-order-column-title'>Restaurante</p>
          {cartItems.map((item, index) => (
            <p key={index} className='finalize-order-column-subtitle'>
              {item.profileId ?? 'N/A'}
            </p>
          ))}
        </div>

        <div className='finalize-order-column2'>
          <p className='finalize-order-column-title'>Quantidade</p>
          {cartItems.map((item, index) => (
            <p key={index} className='finalize-order-column-subtitle'>x{item.quantity}</p>
          ))}
        </div>

        <div className='finalize-order-column2'>
          <p className='finalize-order-column-title'>Valor</p>
          {cartItems.map((item, index) => (
            <p key={index} className='finalize-order-column-subtitle'>R$ {item.price}</p>
          ))}
        </div>

      </div>

      <div className='finalize-order-box-value'>
        <div className='finalize-order-value'>
          <p className='finalize-order-value-title'>Valor total:</p>
          <p className='finalize-order-value-subtitle'>R$ {total}</p>
        </div>
      </div>

    </div>
  );
};

export default FinalizeOrderTable;
