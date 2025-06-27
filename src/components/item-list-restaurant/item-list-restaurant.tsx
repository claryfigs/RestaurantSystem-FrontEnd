import React, { useState } from 'react';
import './item-list-restaurant.css';
import ItemCardRestaurant from '../item-card-restaurant/item-card-restaurant';
import Button from '../Button/Button';
import ModalAddItem from '../modal-add-item/modal-add-item';
import ModalEditItem from '../modal-edit-item/modal-edit-item';
import ModalCategory from '../modal-category/modal-category'; // <-- Importa o modal de categoria

const ItemListRestaurant: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showCategoryModal, setShowCategoryModal] = useState(false); // <-- Novo estado

  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  const handleOpenCategoryModal = () => setShowCategoryModal(true); // <-- Abrir modal de categoria
  const handleCloseCategoryModal = () => setShowCategoryModal(false); // <-- Fechar modal

  return (
    <div className='item-list-restaurant'>
      <div className='item-list-restaurant-header'>
        <h1>Sanduíche</h1>
        <div className='item-list-restaurant-buttons'>
          <Button label="Editar categoria" variant="primary" onClick={handleOpenCategoryModal} />
          <Button label="Adicionar item" variant="primary" onClick={handleOpenAddModal} />
          <Button label="Deletar categoria" variant="secondary" onClick={handleOpenAddModal} />
        </div>
      </div>

      <div className='restaurant-list-restaurant'>
        <ItemCardRestaurant onClick={handleOpenEditModal} />
        <ItemCardRestaurant onClick={handleOpenEditModal} />
      </div>

      {showAddModal && <ModalAddItem onClose={handleCloseAddModal} />}
      {showEditModal && <ModalEditItem onClose={handleCloseEditModal} />}
      {showCategoryModal && <ModalCategory onClose={handleCloseCategoryModal} />} {/* <-- Renderiza modal de categoria */}
    </div>
  );
};

export default ItemListRestaurant;
