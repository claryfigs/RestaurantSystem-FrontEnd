import React, { useState } from 'react';
import './modal-client-item.css';
import CounterItems from '../counter-items/counter-items';
import Button from '../Button/Button';
import CloseIcon from '../../assets/close-icon.png';

type Item = {
  id: number;
  name: string;
  description: string;
  price: string;
  categories: string[];
  image: string;
  is_available: boolean;
};

type ModalClientItemProps = {
  onClose: () => void;
  item: Item;
  profileId: number | null;
};

const ModalClientItem: React.FC<ModalClientItemProps> = ({ onClose, item, profileId }) => {
  const [count, setCount] = useState<number>(1);

  const imageUrl = item.image?.startsWith('http')
    ? item.image
    : `http://localhost:8000${item.image}`;

  const handleAddToCart = () => {
    const cartItem = {
      name: item.name,
      category: item.categories.join(', '),
      quantity: count,
      price: (Number(item.price) * count).toFixed(2),
      itemId: item.id,
      profileId: profileId,
      image: imageUrl,
    };

    // Ler carrinho atual (ou inicializa vazio)
    const existingCart = JSON.parse(localStorage.getItem('cartItems') || '[]');

    // Adiciona novo item
    existingCart.push(cartItem);

    // Salva de volta no localStorage
    localStorage.setItem('cartItems', JSON.stringify(existingCart));

    console.log('Item adicionado ao carrinho:', cartItem);
    console.log('Carrinho atualizado:', existingCart);

    onClose();
    window.location.reload();
  };

  return (
    <div className="modal-client-item-overlay">
      <div className="modal-client-item-content">
        <div className='modal-client-item-header'>
          <img
            src={CloseIcon}
            alt='Ícone de fechamento'
            className='close-icon-modal-client'
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className='modal-client-item-imagespace'>
          <div
            className='modal-client-item-image'
            style={{
              backgroundImage: `url(${imageUrl})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>
        </div>

        <div className='modal-client-item-infos'>
          <div className='modal-client-item-infos2'>
            <p className='modal-client-item-title'>Nome do item:</p>
            <p className='modal-client-item-subtitle'>{item.name}</p>
          </div>

          <div className='modal-client-item-infos2'>
            <p className='modal-client-item-title'>Categoria:</p>
            <p className='modal-client-item-subtitle'>{item.categories.join(', ')}</p>
          </div>

          <p className='modal-client-item-title'>Descrição:</p>
          <div className='modal-client-item-description'>
            <p>{item.description}</p>
          </div>

          <p className='modal-client-item-title'>Quantidade desejada:</p>
          <CounterItems count={count} onChange={setCount} />

          <p className='modal-client-item-title'>ID do restaurante (profile_data.id):</p>
          <h2>{profileId ?? 'ID não disponível'}</h2>

          <div className='modal-client-item-infos2'>
            <p className='modal-client-item-title'>Valor total:</p>
            <p className='modal-client-item-price'>R$ {(Number(item.price) * count).toFixed(2)}</p>
          </div>

          <div className='modal-client-item-buttonspace'>
            <Button
              label='Adicionar ao carrinho'
              variant='secondary'
              onClick={handleAddToCart}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalClientItem;
