import React from 'react';
import './modal-map.css';
import Button from '../Button/Button';
import MapImage from '../../assets/mapa-uece.png';

type ModalMapProps = {
  onClose: () => void;
  onConfirmCancel: () => void;
  loading: boolean;
};

const ModalMap: React.FC<ModalMapProps> = ({ onClose, onConfirmCancel, loading }) => {
  return (
    <div className="modal-map-overlay">
      <div className="modal-map-box">
        <h1>Mapa da universidade</h1>
        <h2>Visualize as localizações no mapa.</h2>

        <div
          className="modal-map-image"
          style={{
            backgroundImage: `url(${MapImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        ></div>

        <div className='modal-map-buttons'>
          <Button
            label="Fechar"
            variant="primary"
            onClick={onClose}
            disabled={loading}
          />
        </div>
      </div>
    </div>
  );
};

export default ModalMap;
