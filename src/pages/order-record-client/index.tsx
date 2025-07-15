import { useEffect, useState } from 'react';
import './style.css';
import NavbarClient from '../../components/navbar-client/navbar-client';
import RecordCardClient from '../../components/record-card-client/record-card-client';

const baseUrl = 'http://localhost:8000';

function OrderRecordClient() {
  const [orders, setOrders] = useState<any[]>([]);
  const [reviews, setReviews] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrdersAndReviews = async () => {
      setLoading(true);
      const token = localStorage.getItem('accessToken');

      try {
        // ✅ busca pedidos entregues e cancelados
        const [deliveredRes, cancelledRes, reviewsRes] = await Promise.all([
          fetch(`${baseUrl}/api/v1/orders/?status=D`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${baseUrl}/api/v1/orders/?status=C`, {
            headers: { 'Authorization': `Bearer ${token}` }
          }),
          fetch(`${baseUrl}/api/v1/order-reviews/`, {
            headers: { 'Authorization': `Bearer ${token}` }
          })
        ]);

        const deliveredData = await deliveredRes.json();
        const cancelledData = await cancelledRes.json();
        const reviewsData = await reviewsRes.json();

        // ✅ junta pedidos
        const allOrders = [
          ...deliveredData.results,
          ...cancelledData.results
        ];

        // ✅ salva estado
        setOrders(allOrders);
        setReviews(reviewsData.results);
      } catch (error) {
        console.error('Erro ao buscar dados:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrdersAndReviews();
  }, []);

  return (
    <div>
      <NavbarClient />
      <div className='order-record-client'>
        <h1>Histórico de pedidos</h1>
        <h2>Seus pedidos antigos. Deixe avaliações para o restaurante</h2>

        {loading && <p>Carregando pedidos...</p>}
        {!loading && orders.length === 0 && <h2>Nenhum pedido encontrado.</h2>}

        {!loading && orders.map(order => (
          <RecordCardClient
            key={order.id}
            order={order}
            customerReviews={reviews}
          />
        ))}
      </div>
    </div>
  );
}

export default OrderRecordClient;
