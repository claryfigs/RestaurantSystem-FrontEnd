import React from 'react';
import './status-order-client.css';

type Status = 'enviado' | 'em_preparo' | 'saiu_pra_entrega' | 'entregue';

interface StatusTrackerProps {
  status: Status;
}

const StatusOrderClient: React.FC<StatusTrackerProps> = ({ status }) => {
  return (
    <div className="status-tracker">
      <div className={`status-item ${status === 'enviado' ? 'active' : ''}`}>Recebido</div>
      <div className={`status-item ${status === 'em_preparo' ? 'active' : ''}`}>Em preparo</div>
      <div className={`status-item ${status === 'saiu_pra_entrega' ? 'active' : ''}`}>Saiu pra entrega</div>
      <div className={`status-item ${status === 'entregue' ? 'active' : ''}`}>Entregue</div>
    </div>
  );
};

export default StatusOrderClient;
