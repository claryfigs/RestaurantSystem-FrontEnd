import { useState } from 'react';
import './style.css';
import NavbarRestaurant from '../../components/navbar-restaurant/navbar-restaurant';
import Button from '../../components/Button/Button';
import RestaurantImage from '../../assets/ueceana.png';
import ItemListRestaurant from '../../components/item-list-restaurant/item-list-restaurant';
import ButtonMap from '../../components/button-map/button-map';
import ModalAddCategory from '../../components/modal-add-category/modal-add-category';
import ModalEditRestaurant from '../../components/modal-edit-restaurant/modal-edit-restaurant';

function RestaurantProfile() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);

  const handleOpenCategoryModal = () => setShowCategoryModal(true);
  const handleCloseCategoryModal = () => setShowCategoryModal(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  return (
    <div>
      <NavbarRestaurant />

      <div className='restaurant-profile'>
        <div className='restaurant-profile-box'>

          {/* Perfil do restaurante */}
          <div className='restaurant-profile-infos'>
            <div
              className='restaurant-profile-image'
              style={{
                backgroundImage: `url(${RestaurantImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            <div className='restaurant-profile-box2'>
              <div className='restaurant-profile-box3'>
                <h1>UECEANA - Saldo: 0,00</h1>
              </div>

              <div className='restaurant-profile-description'>
                <p>Descrição do restaurante</p>
              </div>
            </div>

            <div className='restaurant-profile-time'>
              <Button label="Editar perfil" variant="primary" onClick={handleOpenEditModal} />
              <p className='restaurant-profile-timeopen'>Seg-Sex 08:00-18:00</p>
            </div>
          </div>

          {/* Endereço e telefone */}
          <div className='restaurant-profile-box4'>
            <div className='restaurant-profile-box5'>
              <p style={{ marginRight: '1vh' }}>Av Rua Itaperi 123 UECE - Fortaleza</p>
              <ButtonMap />
            </div>
            <p>+55 85 99898-0000</p>
          </div>

          <ItemListRestaurant />

          {/* Botão para abrir o modal de categoria */}
          <Button
            label="Criar nova categoria"
            variant="secondary"
            onClick={handleOpenCategoryModal}
          />

          {/* Modal de adicionar categoria */}
          {showCategoryModal && <ModalAddCategory onClose={handleCloseCategoryModal} />}

          {/* Modal de editar restaurante */}
          {showEditModal && <ModalEditRestaurant onClose={handleCloseEditModal} />}

        </div>
      </div>
    </div>
  );
}

export default RestaurantProfile;
