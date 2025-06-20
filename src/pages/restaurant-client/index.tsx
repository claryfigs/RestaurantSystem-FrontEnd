import React, { useState } from 'react';
import './style.css';
import NavbarClient from '../../components/navbar-client/navbar-client';
import StarsIcon from '../../assets/stars-icon.png';
import Button from '../../components/Button/Button';
import ItemListClient from '../../components/item-list-client/item-list-client';
import RestaurantImage from '../../assets/ueceana.png';
import ModalClientItem from '../../components/modal-client-item/modal-client-item';

function RestaurantClient() {
  const [favorited, setFavorited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const toggleFavorite = () => {
    setFavorited(prev => !prev);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      <NavbarClient />

      <div className='restaurant-client'>
        <div className='restaurant-client-box'>

          {/* Perfil do restaurante */}
          <div className='restaurant-client-infos'>
            <div
              className='restaurant-client-profile'
              style={{
                backgroundImage: `url(${RestaurantImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            <div className='restaurant-client-box2'>
              <div className='restaurant-client-box3'>
                <p className='restaurant-client-name'>UECEANA</p>
                <img className='restaurant-client-stars' src={StarsIcon} alt="estrelas restaurant" />
              </div>

              <div className='restaurant-client-description'>
                <p>Descrição do restaurante</p>
              </div>
            </div>

            <div className='restaurant-client-time'>
              <Button
                label={favorited ? 'Desfavoritar' : 'Favoritar'}
                variant="primary"
                onClick={toggleFavorite}
              />
              <div className='restaurant-client-status'>
                <div className='restaurant-client-iconstatus'></div>
                <p className='restaurant-client-statustext'>Aberto Agora</p>
              </div>
              <p className='restaurant-client-timeopen'>Seg-Sex 08:00-18:00</p>
            </div>
            
          </div>

          {/* Endereço e telefone */}
          <div className='restaurant-client-box4'>
            <div className='restaurant-client-box5'>
              <p style={{ marginRight: '1vh' }}>Av Rua Itaperi 123 UECE - Fortaleza</p>
              <Button label="Ver mapa" variant="primary" />
            </div>
            <p>+55 85 99898-0000</p>
          </div>

          {/* Lista de itens */}
          <h1>Sanduíches</h1>
          <ItemListClient onCardClick={openModal} />

          <h1>Bebidas</h1>
          <ItemListClient onCardClick={openModal} />

          {/* Modal */}
          {isModalOpen && <ModalClientItem onClose={closeModal} />}

        </div>
      </div>
    </div>
  );
}

export default RestaurantClient;
