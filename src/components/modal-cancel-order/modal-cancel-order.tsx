import React from 'react';
import './modal-cancel-order.css';
import Button from '../Button/Button';

type ModalCancelOrderProps = {
  onClose: () => void;
  onConfirmCancel: () => void;
  loading: boolean;
};

const ModalCancelOrder: React.FC<ModalCancelOrderProps> = ({ onClose, onConfirmCancel, loading }) => {
  return (
    <div className="modal-cancel-order-overlay">
      <div className="modal-cancel-order-box">
        <h1>Deseja cancelar o pedido?</h1>
        <h2>O valor do pedido será reembolsado para seu saldo da carteira.</h2>
        
        <div className="modal-cancel-order-buttons">
          <Button label="Manter pedido" variant="primary" onClick={onClose} />
          <Button label={loading ? "Cancelando..." : "Cancelar pedido"} variant="secondary" onClick={onConfirmCancel} disabled={loading} />
        </div>
      </div>
    </div>
  );
};

export default ModalCancelOrder;
