import React, { useState } from 'react';
import './order-card-client.css';
import Button from '../Button/Button';
import StatusOrderClient from '../status-order-client/status-order-client';
import ModalCancelOrder from '../modal-cancel-order/modal-cancel-order'; // importe aqui

const OrderCardClient: React.FC = () => {
  const [status] = useState<'em_preparo' | 'saiu_pra_entrega' | 'entregue'>('em_preparo');
  const [showCancelModal, setShowCancelModal] = useState(false); // controle do modal

  const openCancelModal = () => {
    setShowCancelModal(true);
  };

  const closeCancelModal = () => {
    setShowCancelModal(false);
  };

  return (
    <div className='order-card-client'>
      <div className='order-card-client-head'>
        <h1>UEACEANA - PEDIDO #1234</h1>
        <h1>24/05/2025 10:45</h1>
      </div>

      <div className='order-card-client-head2'>
        <StatusOrderClient status={status} />
        <Button
          label="Confirmar entrega"
          variant="primary"
          disabled={status !== 'entregue'}
        />
      </div>

      <div className='order-card-client-itensbox'>
        <div className='order-card-client-itensbox-columns'>
          <div className='order-card-client-itensbox-column1'>
            <p className='order-card-client-itensbox-title'>Categoria</p>
            <p className='order-card-client-itensbox-subtitle'>Sanduíches</p>
            <p className='order-card-client-itensbox-subtitle'>Bebidas</p>
          </div>

          <div className='order-card-client-itensbox-column1'>
            <p className='order-card-client-itensbox-title'>Nome</p>
            <p className='order-card-client-itensbox-subtitle'>Presunto</p>
            <p className='order-card-client-itensbox-subtitle'>Suco de laranja</p>
          </div>

          <div className='order-card-client-itensbox-column1'>
            <p className='order-card-client-itensbox-title'>Restaurante</p>
            <p className='order-card-client-itensbox-subtitle'>UECEANA</p>
            <p className='order-card-client-itensbox-subtitle'>UECEANA</p>
          </div>

          <div className='order-card-client-itensbox-column2'>
            <p className='order-card-client-itensbox-title'>Quantidade</p>
            <p className='order-card-client-itensbox-subtitle'>x1</p>
            <p className='order-card-client-itensbox-subtitle'>x1</p>
          </div>

          <div className='order-card-client-itensbox-column2'>
            <p className='order-card-client-itensbox-title'>Valor</p>
            <p className='order-card-client-itensbox-subtitle'>R$ 20,00</p>
            <p className='order-card-client-itensbox-subtitle'>R$ 15,00</p>
          </div>
        </div>

        <div className='order-card-client-itensbox-boxvalue'>
          <div className='order-card-client-itensbox-value'>
            <p className='order-card-client-itensbox-value-title'>Valor total:</p>
            <p className='order-card-client-itensbox-value-subtitle'>R$ 35,00</p>
          </div>
        </div>
      </div>

      <div className='order-card-client-boxdescription'>
        <div className='order-card-client-boxdescription2'>
          <h3>Local de entrega:</h3>
          <h2>Bloco P</h2>
        </div>

        <div className='order-card-client-boxdescription2'>
          <h3>Observação:</h3>
          <h2>"Estou na sala 13 estou deixando uma observação bem grande pra ver até onde vai o texto adicionado"</h2>
        </div>
      </div>

      <Button
        label="Cancelar pedido"
        variant="primary"
        disabled={status !== 'em_preparo'}
        onClick={openCancelModal}
      />

      {showCancelModal && <ModalCancelOrder onClose={closeCancelModal} />}
    </div>
  );
};

export default OrderCardClient;
