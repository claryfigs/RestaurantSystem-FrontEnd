import React, { useEffect, useState } from 'react';
import './modal-assessment-restaurant.css';
import CloseIcon from '../../assets/close-icon.png';
import Stars from '../stars/stars';

type ModalAssessmentRestaurantProps = {
  onClose: () => void;
  reviewId: number;
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

const ModalAssessmentRestaurant: React.FC<ModalAssessmentRestaurantProps> = ({ onClose, reviewId }) => {
  const [review, setReview] = useState<Review | null>(null);

  useEffect(() => {
    const fetchReview = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }
      try {
        const res = await fetch(`http://localhost:8000/api/v1/order-reviews/${reviewId}/`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error('Erro ao buscar avaliação');
        const data = await res.json();
        setReview(data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchReview();
  }, [reviewId]);

  if (!review) {
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
          <p>Carregando avaliação...</p>
        </div>
      </div>
    );
  }

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
            <h1>Avaliação do pedido</h1>
          </div>

          <div className='modal-assessment-client-infosrestaurant'>
            <p>PEDIDO #{review.order}</p>
            {/* <p>Cliente: {review.customer_email}</p>
            <p>Parceiro: {review.partner_email}</p>
            {review.partner_image && <img src={review.partner_image} alt='Parceiro' style={{ maxWidth: '150px' }} />} */}
          </div>

          <h2>Estrelas:</h2>
          <Stars activeStars={review.rating} />

          <h2>Comentário:</h2>
          <div className='modal-assessment-comment-space'>
            <p>{review.review_text || '-'}</p>
          </div>

          {review.partner_response && (
            <>
              <h2>Resposta do parceiro:</h2>
              <div className='modal-assessment-comment-space'>
                <p>{review.partner_response}</p>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ModalAssessmentRestaurant;
