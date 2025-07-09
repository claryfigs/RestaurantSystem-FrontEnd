import React, { useEffect, useState } from 'react';
import './item-list-restaurant.css';
import ItemCardRestaurant from '../item-card-restaurant/item-card-restaurant';
import Button from '../Button/Button';
import ModalAddItem from '../modal-add-item/modal-add-item';
import ModalEditItem from '../modal-edit-item/modal-edit-item';

type MenuItem = {
  id: number;
  name: string;
  price: string;
  image?: string;
};

const ItemListRestaurant: React.FC = () => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [items, setItems] = useState<MenuItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<any | null>(null);

  const handleOpenAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedItem(null);
  };

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

  const handleCardClick = async (id: number) => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Token não encontrado.');
        return;
      }

      const response = await fetch(`http://localhost:8000/api/v1/menu-items/${id}/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Erro ao buscar detalhes do item');
      }

      const data = await response.json();
      setSelectedItem(data);
      setShowEditModal(true);
    } catch (error) {
      console.error('Erro ao buscar o item:', error);
    }
  };

  return (
    <div className='item-list-restaurant'>
      <div className='item-list-restaurant-header'>
        <h1>Lista de itens</h1>
        <div className='item-list-restaurant-buttons'>
          <Button label="Adicionar item" variant="primary" onClick={handleOpenAddModal} />
        </div>
      </div>

      <div className='restaurant-list-restaurant'>
        {items.map((item) => (
          <ItemCardRestaurant
            key={item.id}
            title={item.name}
            price={item.price}
            image={item.image}
            onClick={() => handleCardClick(item.id)}
          />
        ))}
      </div>

      {showAddModal && <ModalAddItem onClose={handleCloseAddModal} />}
      {showEditModal && selectedItem && (
        <ModalEditItem
          onClose={handleCloseEditModal}
          item={selectedItem}
        />
      )}
    </div>
  );
};

export default ItemListRestaurant;
