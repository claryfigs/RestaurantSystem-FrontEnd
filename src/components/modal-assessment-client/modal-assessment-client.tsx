import { useState } from 'react';
import './modal-assessment-client.css';
import Button from '../Button/Button';
import CloseIcon from '../../assets/close-icon.png';
import RestaurantIcon from '../../assets/ueceana.png';
import ObservationInput from '../input-observation/input-observation';
import StarAssessmentClient from '../stars-assessment-client/stars-assessment-client';

type ModalAssessmentClientProps = {
  onClose: () => void;
};

const ModalAssessmentClient: React.FC<ModalAssessmentClientProps> = ({ onClose }) => {

    const [observation, setObservation] = useState('');

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
                }}>
                </div>
                <p>UECEANA - PEDIDO #1234</p>
            </div>
            
            <h2>Deixe um comentário:</h2>

            <ObservationInput
              value={observation}
              onChange={(e) => setObservation(e.target.value)}
              placeholder="Digite seu comentário"
            />

            <h2>Avalie em estrelas:</h2>
            <StarAssessmentClient/>

          <div className='modal-assessment-client-buttonspace'>
            <Button
              label='Enviar avaliação'
              variant='primary'
              onClick={onClose}
            />
          </div>

        </div>
      </div>
    </div>
  );
};

export default ModalAssessmentClient;
