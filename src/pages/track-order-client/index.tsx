// src/pages/track-order-client/TrackOrderClient.tsx

import './style.css';
import NavbarClient from '../../components/navbar-client/navbar-client';
import OrderCardClient from '../../components/order-card-client/order-card-client';
import React, { useEffect, useState } from 'react';

function TrackOrderClient() {
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          throw new Error('Token não encontrado. Faça login novamente.');
        }

        const res = await fetch('http://localhost:8000/api/v1/orders/', {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          }
        });

        if (!res.ok) {
          const text = await res.text();
          throw new Error(`Erro ${res.status}: ${text}`);
        }

        const data = await res.json();

        // Filtrar somente pedidos em preparo ou saiu pra entrega
        const ALLOWED_STATUSES = ['S', 'P', 'O'];
        const activeOrders = data.results.filter(
          (order: any) => ALLOWED_STATUSES.includes(order.status)
        );

        setOrders(activeOrders);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div>
      <NavbarClient />
      <div className='track-order-client'>
        <h1>Pedidos em aberto</h1>
        <h2>Suas compras ativas no momento:</h2>

        {loading && <p>Carregando...</p>}
        {error && <p>Erro: {error}</p>}
        {!loading && !error && orders.length === 0 && (
          <h2>Você não tem pedidos em aberto.</h2>
        )}

        {orders.map((order) => (
          <OrderCardClient key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
}

export default TrackOrderClient;
