import React, { useEffect, useState } from 'react';
import './order-card-restaurant.css';
import StatusOrderRestaurant from '../status-order-restaurant/status-order-restaurant';
import ButtonMap from '../button-map/button-map';
import ModalMap from '../modal-map/modal-map';

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
  customer: string;
  partner: string;
  order_items: OrderItem[];
  delivery_location: DeliveryLocation;
  total_amount: string;
  status: string;
  details: string;
  created_at: string;
  updated_at: string;
};

const OrderCardRestaurant: React.FC = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showMapModal, setShowMapModal] = useState(false);

  const handleOpenMapModal = () => setShowMapModal(true);
  const handleCloseMapModal = () => setShowMapModal(false);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('Usuário não autenticado');
          setLoading(false);
          return;
        }

        const response = await fetch('http://localhost:8000/api/v1/orders/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar pedidos: ${response.statusText}`);
        }

        const data = await response.json();
        setOrders(data.results);
      } catch (err: any) {
        setError(err.message || 'Erro desconhecido');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) return <p>Carregando pedidos...</p>;
  if (error) return <p style={{ color: 'red' }}>Erro: {error}</p>;
  if (orders.length === 0) return <p>Nenhum pedido encontrado.</p>;

  const visibleOrders = orders.filter(order => order.status !== 'D' && order.status !== 'C');

  if (visibleOrders.length === 0) return <p>Nenhum pedido disponível para exibir.</p>;

  return (
    <>
      {visibleOrders.map(order => (
        <div key={order.id} className='order-card-client'>
          <div className='order-card-client-head'>
            <h1>PEDIDO #{order.id}</h1>
            <h1>{order.created_at}</h1>
          </div>

          <div className='order-card-client-head2'>
            <StatusOrderRestaurant 
              apiStatus={order.status}
              orderId={order.id} 
            />
          </div>

          <div className='order-card-client-itensbox'>
            <div className='order-card-client-itensbox-columns'>
              <div className='order-card-client-itensbox-column1'>
                <p className='order-card-client-itensbox-title'>Nome</p>
                {order.order_items.map(item => (
                  <p key={item.id} className='order-card-client-itensbox-subtitle'>{item.menu_item_name}</p>
                ))}
              </div>

              <div className='order-card-client-itensbox-column2'>
                <p className='order-card-client-itensbox-title'>Quantidade</p>
                {order.order_items.map(item => (
                  <p key={item.id} className='order-card-client-itensbox-subtitle'>x{item.quantity}</p>
                ))}
              </div>

              <div className='order-card-client-itensbox-column2'>
                <p className='order-card-client-itensbox-title'>Valor</p>
                {order.order_items.map(item => {
                  const totalItem = Number(item.unit_price) * item.quantity;
                  return (
                    <p key={item.id} className='order-card-client-itensbox-subtitle'>
                      R$ {totalItem.toFixed(2)}
                    </p>
                  );
                })}
              </div>
            </div>

            <div className='order-card-client-itensbox-boxvalue'>
              <div className='order-card-client-itensbox-value'>
                <p className='order-card-client-itensbox-value-title'>Valor total:</p>
                <p className='order-card-client-itensbox-value-subtitle'>R$ {Number(order.total_amount).toFixed(2)}</p>
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

          <div className='order-card-client-buttonspace'>
            <div>
              <ButtonMap onClick={handleOpenMapModal} />
            </div>
          </div>
        </div>
      ))}

      {showMapModal && (
        <ModalMap
          onClose={handleCloseMapModal}
          onConfirmCancel={() => {}}
          loading={false}
        />
      )}
    </>
  );
};

export default OrderCardRestaurant;
