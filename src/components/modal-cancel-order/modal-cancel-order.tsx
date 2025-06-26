import React from 'react';
import './modal-cancel-order.css';
import Button from '../Button/Button';

type ModalCancelOrderProps = {
  onClose: () => void;
};

const ModalCancelOrder: React.FC<ModalCancelOrderProps> = ({ onClose }) => {
  const handleCancel = () => {
    // Aqui você pode colocar lógica real de cancelamento do pedido
    console.log("Pedido cancelado!");
    onClose();
  };

  return (
    <div className="modal-cancel-order-overlay">
      <div className="modal-cancel-order-box">
        <h1>Deseja mesmo cancelar o pedido?</h1>
        <h2>O valor do pedido será reembolsado para seu saldo da carteira.</h2>
        
        <div className="modal-cancel-order-buttons">
          <Button label="Manter pedido" variant="primary" onClick={onClose} />
          <Button label="Cancelar pedido" variant="secondary" onClick={handleCancel} />
        </div>
      
      </div>
    </div>
  );
};

export default ModalCancelOrder;
