import React, { useState } from 'react';
import './record-card-client.css';
import Button from '../Button/Button';
import StatusOrderClient from '../status-order-client/status-order-client';
import ModalAssessmentClient from '../modal-assessment-client/modal-assessment-client';
import ModalAssessmentEdit from '../modal-assessment-edit/modal-assessment-edit';

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

type Review = {
  id: number;
  order: number;
  rating: number;
  review_text: string;
};

type Props = {
  order: Order;
  customerReviews: Review[];
};

const RecordCardClient: React.FC<Props> = ({ order, customerReviews }) => {
  const [openModalType, setOpenModalType] = useState<'new' | 'edit' | null>(null);

  // Busca a avaliação existente para este pedido
  const existingReview = customerReviews.find(review => review.order === order.id);

  let statusForComponent: 'entregue' | 'cancelado' = order.status === 'D' ? 'entregue' : 'cancelado';

  return (
    <>
      <div className='order-card-client'>
        <div className='order-card-client-head'>
          <h1>
            {order.partner} - PEDIDO {order.id} {order.status === 'C' && '(Cancelado)'}
          </h1>
          <h1>{order.created_at}</h1>
        </div>

        <div className='order-card-client-head2'>
          <StatusOrderClient status={statusForComponent} />

          {order.status === 'D' && (
            <div className='buttons-order-space'>
              {existingReview ? (
                <>
                  <Button
                    label="Editar avaliação"
                    variant="tertiary"
                    onClick={() => setOpenModalType('edit')}
                  />
                  <Button
                    label="Avaliar pedido"
                    variant="tertiary"
                    disabled
                  />
                </>
              ) : (
                <Button
                  label="Avaliar pedido"
                  variant="tertiary"
                  onClick={() => setOpenModalType('new')}
                />
              )}
            </div>
          )}
        </div>

        <div className='order-card-client-itensbox'>
          <div className='order-card-client-itensbox-columns'>
            <div className='order-card-client-itensbox-column1'>
              <p className='order-card-client-itensbox-title'>Nome</p>
              {order.order_items.map(item => (
                <p className='order-card-client-itensbox-subtitle' key={item.id}>
                  {item.menu_item_name}
                </p>
              ))}
            </div>

            <div className='order-card-client-itensbox-column2'>
              <p className='order-card-client-itensbox-title'>Quantidade</p>
              {order.order_items.map(item => (
                <p className='order-card-client-itensbox-subtitle' key={item.id}>
                  x{item.quantity}
                </p>
              ))}
            </div>

            <div className='order-card-client-itensbox-column2'>
              <p className='order-card-client-itensbox-title'>Valor</p>
              {order.order_items.map(item => {
                const totalItem = parseFloat(item.unit_price) * item.quantity;
                return (
                  <p className='order-card-client-itensbox-subtitle' key={item.id}>
                    R$ {totalItem.toFixed(2)}
                  </p>
                );
              })}
            </div>
          </div>

          <div className='order-card-client-itensbox-boxvalue'>
            <div className='order-card-client-itensbox-value'>
              <p className='order-card-client-itensbox-value-title'>Valor total:</p>
              <p className='order-card-client-itensbox-value-subtitle'>
                R$ {parseFloat(order.total_amount).toFixed(2)}
              </p>
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

      {openModalType === 'new' && (
        <ModalAssessmentClient
          onClose={() => setOpenModalType(null)}
          orderId={order.id}
        />
      )}

      {openModalType === 'edit' && existingReview && (
        <ModalAssessmentEdit
          onClose={() => setOpenModalType(null)}
          review={existingReview}
        />
      )}
    </>
  );
};

export default RecordCardClient;
