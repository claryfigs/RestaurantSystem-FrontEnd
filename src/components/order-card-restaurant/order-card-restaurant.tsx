import React, { useState } from 'react';
import './order-card-restaurant.css';
import StatusOrderRestaurant from '../status-order-restaurant/status-order-restaurant';
import ButtonMap from '../button-map/button-map';

const OrderCardRestaurant: React.FC = () => {
  const [status] = useState<'em_preparo' | 'saiu_pra_entrega' | 'entregue'>('em_preparo');

  return (
    <div className='order-card-client'>
      <div className='order-card-client-head'>
        <h1>PEDIDO #1234</h1>
        <h1>24/05/2025 10:45</h1>
      </div>

      <div className='order-card-client-head2'>
        <StatusOrderRestaurant status={status} />
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

      <div className='order-card-client-buttonspace'>
        <div>
          <ButtonMap/>
        </div>
      </div>
      

    </div>
  );
};

export default OrderCardRestaurant;
