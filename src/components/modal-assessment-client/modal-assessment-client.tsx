import { useState } from 'react';
import './modal-assessment-client.css';
import Button from '../Button/Button';
import CloseIcon from '../../assets/close-icon.png';
import RestaurantIcon from '../../assets/ueceana.png';
import ObservationInput from '../input-observation/input-observation';
import StarAssessmentClient from '../stars-assessment-client/stars-assessment-client';

type ModalAssessmentClientProps = {
  onClose: () => void;
  orderId: number;
};

const ModalAssessmentClient: React.FC<ModalAssessmentClientProps> = ({ onClose, orderId }) => {
  const [observation, setObservation] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async () => {
    if (!observation) {
      alert('Por favor, preencha o comentário.');
      return;
    }

    const token = localStorage.getItem('accessToken');

    if (!token) {
      alert('Usuário não autenticado.');
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/api/v1/order-reviews/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          order: orderId,
          rating,
          review_text: observation
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Erro ao enviar avaliação:', errorData);
        alert('Erro ao enviar avaliação.');
      } else {
        alert('Avaliação enviada com sucesso!');
        onClose();
        window.location.reload();
      }
    } catch (error) {
      console.error('Erro inesperado:', error);
      alert('Erro ao enviar avaliação.');
    }
  };

  return (
    <div className="modal-assessment-client-overlay">
      <div className="modal-assessment-client-content">
        <div className='modal-assessment-client-header'>
          <img
            src={CloseIcon}
            alt='Ícone de fechamento'
            className='close-icon-modal-assessment-client'
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className='modal-client-assessment-infos'>
          <div className='modal-assessment-client-infosbox'>
            <h1>Avalie sua experiência</h1>
          </div>

          <div className='modal-assessment-client-infosrestaurant'>
            <div
              className='modal-assessment-client-image'
              style={{
                backgroundImage: `url(${RestaurantIcon})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <p>PEDIDO {orderId}</p>
          </div>
          
          <h2>Comentário:</h2>
          <ObservationInput
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Digite seu comentário"
          />

          <h2>Estrelas:</h2>
          <StarAssessmentClient onChange={(value) => setRating(value)} />

          <div className='modal-assessment-client-buttonspace'>
            <Button
              label='Enviar avaliação'
              variant='primary'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAssessmentClient;
