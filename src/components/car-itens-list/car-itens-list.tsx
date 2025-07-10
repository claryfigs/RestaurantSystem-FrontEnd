import React, { useEffect, useState } from 'react';
import './car-itens-list.css';
import CarItenClient from '../car-iten-client/car-iten-client';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

type CartItem = {
  name: string;
  category: string;
  quantity: number;
  price: string;
  image: string;
  itemId: number;
  profileId: number | null;
};

const CarItensList: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  // Carrega carrinho do localStorage ao montar
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('cartItems') || '[]');
    setCartItems(stored);
  }, []);

  // Função para remover item por índice
  const handleDelete = (index: number) => {
    const updated = [...cartItems];
    updated.splice(index, 1);
    setCartItems(updated);
    localStorage.setItem('cartItems', JSON.stringify(updated));
  };

  // Calcula total
  const totalPrice = cartItems.reduce((sum, item) => sum + parseFloat(item.price), 0).toFixed(2);

  const handleFinishClick = () => {
    navigate('/finalize-order');
  };

  return (
    <div className='car-itens-list'>
      {cartItems.length === 0 ? (
        <p className='car-list-text1'>O carrinho está vazio.</p>
      ) : (
        cartItems.map((item, index) => (
          <CarItenClient
            key={index}
            name={item.name}
            category={item.category}
            quantity={item.quantity}
            price={item.price}
            image={item.image}
            onDelete={() => handleDelete(index)}
          />
        ))
      )}

      <div className='finish-space'>
        <div className='car-list-value'>
          <p className='car-list-text1'>Valor total:</p>
          <p className='car-list-text2'>R$ {totalPrice}</p>
        </div>

        <div className='car-list-button'>
          <Button label="Ir para finalização" variant="secondary" onClick={handleFinishClick} />
        </div>
      </div>
    </div>
  );
};

export default CarItensList;
