import { useState } from 'react';
import './modal-assessment-edit.css';
import Button from '../Button/Button';
import CloseIcon from '../../assets/close-icon.png';
import RestaurantIcon from '../../assets/ueceana.png';
import ObservationInput from '../input-observation/input-observation';
import StarAssessmentClient from '../stars-assessment-client/stars-assessment-client';

type ModalAssessmentEditProps = {
  onClose: () => void;
  review: {
    id: number;
    order: number;
    rating: number;
    review_text: string;
  };
};

const baseUrl = 'http://localhost:8000';

const ModalAssessmentEdit: React.FC<ModalAssessmentEditProps> = ({ onClose, review }) => {
  const [observation, setObservation] = useState(review.review_text || '');
  const [rating, setRating] = useState(review.rating || 0);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    setSaving(true);
    setError(null);

    try {
      const token = localStorage.getItem('accessToken');

      const response = await fetch(`${baseUrl}/api/v1/order-reviews/${review.id}/`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          order: review.order,
          rating: rating,
          review_text: observation
        })
      });

      if (!response.ok) {
        throw new Error(`Erro ao salvar alterações: ${response.statusText}`);
      }

      // ✅ Sucesso: fecha modal
      onClose();
      window.location.reload();

    } catch (err: any) {
      console.error(err);
      setError('Erro ao salvar alterações. Tente novamente.');
    } finally {
      setSaving(false);
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
            <h1>Editar avaliação</h1>
          </div>

          <div className='modal-assessment-client-infosrestaurant'>
            <div
              className='modal-assessment-client-image'
              style={{
                backgroundImage: `url(${RestaurantIcon})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}>
            </div>
            <p>PEDIDO {review.order}</p>
          </div>

          <h2>Altere o comentário:</h2>
          <ObservationInput
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Digite seu comentário"
          />

          <h2>Altere a quantidade de estrelas:</h2>
          <StarAssessmentClient
            initialRating={rating}
            onChange={(value) => setRating(value)}
          />

          {error && <p className="modal-error-message">{error}</p>}

          <div className='modal-assessment-client-buttonspace'>
            <Button
              label={saving ? 'Salvando...' : 'Salvar alterações'}
              variant='primary'
              onClick={handleSave}
              disabled={saving}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAssessmentEdit;
