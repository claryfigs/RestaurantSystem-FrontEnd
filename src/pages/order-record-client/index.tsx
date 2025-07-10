import { useEffect, useState } from 'react';
import './style.css'
import NavbarClient from '../../components/navbar-client/navbar-client'
import RecordCardClient from '../../components/record-card-client/record-card-client'

const baseUrl = 'http://localhost:8000';

function OrderRecordClient() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);
      const token = localStorage.getItem('accessToken');

      try {
        const [deliveredRes, cancelledRes] = await Promise.all([
          fetch(`${baseUrl}/api/v1/orders/?status=D`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          }),
          fetch(`${baseUrl}/api/v1/orders/?status=C`, {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        ]);

        const deliveredData = await deliveredRes.json();
        const cancelledData = await cancelledRes.json();

        // junta os resultados
        const allOrders = [...deliveredData.results, ...cancelledData.results];

        setOrders(allOrders);
      } catch (error) {
        console.error('Erro ao buscar pedidos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <NavbarClient/>
      <div className='order-record-client'>
        <h1>Histórico de pedidos</h1>
        <h2>Seus pedidos antigos. Deixe avaliações para o restaurante</h2>

        {loading && <p>Carregando pedidos...</p>}
        {!loading && orders.length === 0 && <h2>Nenhum pedido encontrado.</h2>}

        {!loading && orders.map(order => (
          <RecordCardClient key={order.id} order={order} />
        ))}
      </div>
    </div>
  )
}

export default OrderRecordClient;
