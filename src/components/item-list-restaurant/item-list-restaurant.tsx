import React, { useEffect, useState } from 'react';
import './item-list-restaurant.css';
import ItemCardRestaurant from '../item-card-restaurant/item-card-restaurant';
import Button from '../Button/Button';
import ModalAddItem from '../modal-add-item/modal-add-item';
import ModalEditItem from '../modal-edit-item/modal-edit-item';
// import ModalCategory from '../modal-category/modal-category';
// import ModalDeleteCategory from '../modal-delete-category/modal-delete-category';

type MenuItem = {
  id: number;
  name: string;
  price: string;
  image?: string;
};

const ItemListRestaurant: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  // const [showCategoryModal, setShowCategoryModal] = useState(false);
  // const [showDeleteModal, setShowDeleteModal] = useState(false); // <-- Novo estado

  const [items, setItems] = useState<MenuItem[]>([]);

  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);

  // const handleOpenCategoryModal = () => setShowCategoryModal(true);
  // const handleCloseCategoryModal = () => setShowCategoryModal(false);

  // const handleOpenDeleteModal = () => setShowDeleteModal(true);
  // const handleCloseDeleteModal = () => setShowDeleteModal(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const profileId = localStorage.getItem('profileId');
        const token = localStorage.getItem('accessToken');

        if (!profileId || !token) {
          console.error('Token ou profileId não encontrado.');
          return;
        }

        const response = await fetch(
          `http://localhost:8000/api/v1/menu-items/?partner=${profileId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Erro ao buscar os itens');
        }

        const data = await response.json();

        setItems(data.results);
      } catch (error) {
        console.error('Erro ao carregar itens:', error);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className='item-list-restaurant'>
      <div className='item-list-restaurant-header'>
        <h1>Lista de itens</h1>
        <div className='item-list-restaurant-buttons'>
          {/* <Button label="Editar categoria" variant="primary" onClick={handleOpenCategoryModal} /> */}
          <Button label="Adicionar item" variant="primary" onClick={handleOpenAddModal} />
          {/* <Button label="Deletar categoria" variant="secondary" onClick={handleOpenDeleteModal} /> */}
        </div>
      </div>

      <div className='restaurant-list-restaurant'>
        {items.map((item) => (
          <ItemCardRestaurant
            key={item.id}
            title={item.name}
            price={item.price}
            image={item.image}
            onClick={handleOpenEditModal}
          />
        ))}
      </div>

      {showAddModal && <ModalAddItem onClose={handleCloseAddModal} />}
      {showEditModal && <ModalEditItem onClose={handleCloseEditModal} />}
      {/* {showCategoryModal && <ModalCategory onClose={handleCloseCategoryModal} />}
      {showDeleteModal && <ModalDeleteCategory onClose={handleCloseDeleteModal} />} */}
    </div>
  );
};

export default ItemListRestaurant;
