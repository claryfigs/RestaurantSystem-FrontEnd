import React, { useEffect, useState } from 'react';
import './record-card-restaurant.css';
import Button from '../Button/Button';
import StatusOrderClient from '../status-order-client/status-order-client';
import ModalAssessmentRestaurant from '../modal-assessment-restaurant/modal-assessment-restaurant';

type OrderItem = {
  id: number;
  menu_item: number;
  menu_item_name: string;
  quantity: number;
  unit_price: string;
};

type DeliveryLocation = {
  id: number;
  description: string;
};

type Order = {
  id: number;
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
  partner_response: string | null;
  customer_email: string;
  partner_email: string;
  partner_image: string;
  created_at: string;
  updated_at: string;
};

const RecordCardRestaurant: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReviewId, setSelectedReviewId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      console.error('Token não encontrado no localStorage');
      return;
    }

    const fetchOrders = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/orders/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Erro ao buscar pedidos');
        const data = await res.json();
        setOrders(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    const fetchReviews = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/v1/order-reviews/', {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Erro ao buscar avaliações');
        const data = await res.json();
        setReviews(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchOrders();
    fetchReviews();
  }, []);

  const handleOpenModal = (orderId: number) => {
    // Procura avaliação para o pedido
    const review = reviews.find(r => r.order === orderId);
    if (review) {
      setSelectedReviewId(review.id);
      setShowModal(true);
    } else {
      alert('Nenhuma avaliação encontrada para este pedido.');
    }
  };

  const handleCloseModal = () => {
    setSelectedReviewId(null);
    setShowModal(false);
  };

  const mapStatus = (status: string) => {
    switch (status) {
      case 'S': return 'enviado';
      case 'P': return 'em_preparo';
      case 'O': return 'saiu_pra_entrega';
      case 'D': return 'entregue';
      case 'C': return 'enviado';
      default: return 'enviado';
    }
  };

  return (
    <>
      {orders
        .filter(order => order.status === 'D' || order.status === 'C')
        .map((order) => (
          <div key={order.id} className='order-card-client'>
            <div className='order-card-client-head'>
              <h1>PEDIDO #{order.id} {order.status === 'C' && '(cancelado)'}</h1>
              <h1>{order.created_at}</h1>
            </div>

            <div className='order-card-client-head2'>
              <StatusOrderClient status={mapStatus(order.status)} />
              <Button
                label="Ver avaliação"
                variant="tertiary"
                onClick={() => handleOpenModal(order.id)}
              />
            </div>

            <div className='order-card-client-itensbox'>
              <div className='order-card-client-itensbox-columns'>
                <div className='order-card-client-itensbox-column1'>
                  <p className='order-card-client-itensbox-title'>Nome</p>
                  {order.order_items.map(item => (
                    <p key={item.id} className='order-card-client-itensbox-subtitle'>
                      {item.menu_item_name}
                    </p>
                  ))}
                </div>

                <div className='order-card-client-itensbox-column2'>
                  <p className='order-card-client-itensbox-title'>Quantidade</p>
                  {order.order_items.map(item => (
                    <p key={item.id} className='order-card-client-itensbox-subtitle'>
                      x{item.quantity}
                    </p>
                  ))}
                </div>

                <div className='order-card-client-itensbox-column2'>
                  <p className='order-card-client-itensbox-title'>Valor</p>
                  {order.order_items.map(item => (
                    <p key={item.id} className='order-card-client-itensbox-subtitle'>
                      R$ {(Number(item.unit_price) * item.quantity).toFixed(2).replace('.', ',')}
                    </p>
                  ))}
                </div>
              </div>

              <div className='order-card-client-itensbox-boxvalue'>
                <div className='order-card-client-itensbox-value'>
                  <p className='order-card-client-itensbox-value-title'>Valor total:</p>
                  <p className='order-card-client-itensbox-value-subtitle'>
                    R$ {Number(order.total_amount).toFixed(2).replace('.', ',')}
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
                <h2>{order.details || '-'}</h2>
              </div>
            </div>
          </div>
        ))}

      {showModal && selectedReviewId && (
        <ModalAssessmentRestaurant
          onClose={handleCloseModal}
          reviewId={selectedReviewId}
        />
      )}
    </>
  );
};

export default RecordCardRestaurant;
