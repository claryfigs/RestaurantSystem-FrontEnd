import { useState } from 'react';
import './modal-edit-item.css';
import Button from '../Button/Button';
import CloseIcon from '../../assets/close-icon.png';
import InputDefault from '../input-default/input-default';
import ObservationInput from '../input-observation/input-observation';
import MoneyInput from '../input-money/input-money'; // importação adicionada
import SelecItemStatus from '../select-item-status/select-item-status';

type ModalEditItemProps = {
  onClose: () => void;
};

const ModalEditItem: React.FC<ModalEditItemProps> = ({ onClose }) => {
  const [itemName, setItemName] = useState('');
  const [observation, setObservation] = useState('');
  const [price, setPrice] = useState(''); // novo estado para o preço

  const handleSelectChange = (value: string) => {
    console.log('Selecionado:', value);
  };

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

            <div className='modal-add-item-image'></div>

            <div>
            <Button label='Alterar imagem' variant='primary'/>
            </div>
          </div>

          <p>Nome do item:</p>
          <InputDefault
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Digite o nome do item"
          />

          <p>Descrição do item:</p>
          <ObservationInput
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Digite a descrição"
          />

          <p>Preço do item:</p>
          <MoneyInput
            value={price}
            onChange={setPrice}
            placeholder="0,00"
          />

          <p>Disponibilidade:</p>
            <SelecItemStatus onChange={handleSelectChange}/>

          <div className='modal-add-item-buttonspace'>
            <Button
              label='Enviar alterações'
              variant='primary'
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditItem;
