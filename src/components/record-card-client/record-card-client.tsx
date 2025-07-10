import React, { useState } from 'react';
import './record-card-client.css';
import Button from '../Button/Button';
import StatusOrderClient from '../status-order-client/status-order-client';
import ModalAssessmentClient from '../modal-assessment-client/modal-assessment-client';

type OrderItem = {
  id: number;
  menu_item_name: string;
  quantity: number;
  unit_price: string;
};

type DeliveryLocation = {
  description: string;
};

type Order = {
  id: number;
  partner: string;
  order_items: OrderItem[];
  delivery_location: DeliveryLocation;
  total_amount: string;
  status: string;
  details: string;
  created_at: string;
};

type Props = {
  order: Order;
};

const RecordCardClient: React.FC<Props> = ({ order }) => {
  const [showModal, setShowModal] = useState(false);

  // traduzir status para o componente de status
  let statusForComponent: 'entregue' | 'cancelado';
  if (order.status === 'D') statusForComponent = 'entregue';
  else statusForComponent = 'cancelado';

  return (
    <>
    <div className='order-card-client'>
      <div className='order-card-client-head'>
        <h1>{order.partner} - PEDIDO {order.id} {order.status === 'C' && '(Cancelado)'}</h1>
        <h1>{order.created_at}</h1>
      </div>

      <div className='order-card-client-head2'>
        <StatusOrderClient status={statusForComponent} />
        {order.status === 'D' && (
          <Button
            label="Avaliar pedido"
            variant="primary"
            onClick={() => setShowModal(true)}
          />
        )}
      </div>

      <div className='order-card-client-itensbox'>
        <div className='order-card-client-itensbox-columns'>
          <div className='order-card-client-itensbox-column1'>
            <p className='order-card-client-itensbox-title'>Nome</p>
            {order.order_items.map(item => (
              <p className='order-card-client-itensbox-subtitle' key={item.id}>{item.menu_item_name}</p>
            ))}
          </div>

          <div className='order-card-client-itensbox-column2'>
            <p className='order-card-client-itensbox-title'>Quantidade</p>
            {order.order_items.map(item => (
              <p className='order-card-client-itensbox-subtitle' key={item.id}>x{item.quantity}</p>
            ))}
          </div>

          <div className='order-card-client-itensbox-column2'>
            <p className='order-card-client-itensbox-title'>Valor</p>
            {order.order_items.map(item => (
              <p className='order-card-client-itensbox-subtitle' key={item.id}>R$ {parseFloat(item.unit_price).toFixed(2)}</p>
            ))}
          </div>
        </div>

        <div className='order-card-client-itensbox-boxvalue'>
          <div className='order-card-client-itensbox-value'>
            <p className='order-card-client-itensbox-value-title'>Valor total:</p>
            <p className='order-card-client-itensbox-value-subtitle'>R$ {parseFloat(order.total_amount).toFixed(2)}</p>
          </div>
        </div>
      </div>

      <div className='order-card-client-boxdescription'>
        <div className='order-card-client-boxdescription2'>
          <h3>Local de entrega:</h3>
          <h2>{order.delivery_location.description}</h2>
        </div>

        <div className='order-card-client-boxdescription2'>
          <h3>Observação:</h3>
          <h2>{order.details}</h2>
        </div>
      </div>
    </div>

    {showModal && <ModalAssessmentClient onClose={() => setShowModal(false)} />}
    </>
  );
};

export default RecordCardClient;
