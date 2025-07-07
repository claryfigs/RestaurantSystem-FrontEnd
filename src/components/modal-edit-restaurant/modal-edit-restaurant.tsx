import { useState } from 'react';
import './modal-edit-restaurant.css';
import Button from '../Button/Button';
import CloseIcon from '../../assets/close-icon.png';
import InputDefault from '../input-default/input-default';
import ObservationInput from '../input-observation/input-observation';
import CheckboxDays from '../checkbox-days/checkbox-days';
import InputTime from '../input-time/input-time';
import RestaurantImage from '../../assets/ueceana.png';

type ModalEditRestaurantProps = {
  onClose: () => void;
};

const ModalEditRestaurant: React.FC<ModalEditRestaurantProps> = ({ onClose }) => {
  const [itemName, setItemName] = useState('');
  const [observation, setObservation] = useState('');
  const [openingTime, setOpeningTime] = useState('2023-01-01T15:09:09.413Z');


  return (
    <div className="modal-add-item-overlay">
      <div className="modal-add-item-content">

        <div className='modal-add-item-header'>
          <img
            src={CloseIcon}
            alt='Ícone de fechamento'
            className='close-icon-modal-add-item'
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className='modal-add-item-infos'>

          <div className='modal-add-item-spaceimage'>

          <div
            className="modal-add-item-image"
            style={{
              backgroundImage: `url(${RestaurantImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          ></div>

            <div>
            <Button label='Alterar imagem de perfil' variant='primary'/>
            </div>
          </div>

          <p>Nome do restaurante:</p>
          <InputDefault
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Digite o nome do restaurante"
          />

          <p>Descrição do restaurante:</p>
          <ObservationInput
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Digite a descrição"
          />

          <p>Endereço:</p>
          <InputDefault
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Digite o endereço"
          />

          <p>Telefone:</p>
          <InputDefault
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Digite o telefone"
          />

          <p>Horário de abertura:</p>
            <InputTime
              value={openingTime}
              onChange={setOpeningTime}
              placeholder="Horário de abertura"
            />

            <p>Horário de fechamento:</p>
            <InputTime
              value={openingTime}
              onChange={setOpeningTime}
              placeholder="Horário de abertura"
            />

          <p>Dias de funcionamento:</p>
          <CheckboxDays />

          <div className='modal-add-item-buttonspace'>
            <Button
              label='Enviar'
              variant='primary'
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditRestaurant;
