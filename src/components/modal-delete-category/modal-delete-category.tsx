import React from 'react';
import './modal-delete-category.css';
import Button from '../Button/Button';

type ModalDeleteCategoryProps = {
  onClose: () => void;
};

const ModalDeleteCategory: React.FC<ModalDeleteCategoryProps> = ({ onClose }) => {
  const handleCancel = () => {
    // Aqui você pode colocar lógica real de cancelamento do pedido
    console.log("Categoria deletada.");
    onClose();
  };

  return (
    <div className="modal-cancel-order-overlay">
      <div className="modal-cancel-order-box">
        <h1>Deseja deletar categoria?</h1>
        <h2>Deletar a categoria deleta todos os itens dela.</h2>
        
        <div className="modal-cancel-order-buttons">
          <Button label="Manter categoria" variant="primary" onClick={onClose} />
          <Button label="Deletar categoria" variant="secondary" onClick={handleCancel} />
        </div>
      
      </div>
    </div>
  );
};

export default ModalDeleteCategory;
