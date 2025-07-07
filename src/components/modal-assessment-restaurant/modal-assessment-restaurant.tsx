import './modal-assessment-restaurant.css';
import CloseIcon from '../../assets/close-icon.png';
import Stars from '../stars/stars';

type ModalAssessmentRestaurantProps = {
  onClose: () => void;
};

const ModalAssessmentRestaurant: React.FC<ModalAssessmentRestaurantProps> = ({ onClose }) => {

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
                <p>PEDIDO #1234</p>
            </div>

            <h2>Estrelas:</h2>
            <Stars activeStars={3} />

            <h2>Comentário:</h2>
            <div className='modal-assessment-comment-space'>
              <p>Não gostei da comida. Muito ruim!Não gostei da comida.
                Muito ruim! Não gostei da comida. Muito ruim!
                Não gostei da comida. Muito ruim! Não gostei da comida. Muito ruim!
                Não gostei da comida. Muito ruim! Não gostei da comida. Muito ruim!
                Não gostei da comida. Muito ruim! Não gostei da comida. Muito ruim!
                Não gostei da comida. Muito ruim! Não gostei da comida. Muito ruim!
                Não gostei da comida. Muito ruim! Não gostei da comida. Muito ruim!
                Não gostei da comida. Muito ruim! Não gostei da comida. Muito ruim!</p>
            </div>

        </div>
      </div>
    </div>
  );
};

export default ModalAssessmentRestaurant;
