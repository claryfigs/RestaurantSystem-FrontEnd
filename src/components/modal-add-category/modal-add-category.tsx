import { useState } from 'react';
import './modal-add-category.css';
import Button from '../Button/Button';
import CloseIcon from '../../assets/close-icon.png';
import InputDefault from '../input-default/input-default';

type ModalAddCategoryProps = {
  onClose: () => void;
};

const ModalAddCategory: React.FC<ModalAddCategoryProps> = ({ onClose }) => {

  const [itemName, setItemName] = useState('');

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

          <p>Nome da categoria</p>
          <InputDefault
            value={itemName}
            onChange={(e) => setItemName(e.target.value)}
            placeholder="Digite o nome da categoria"
          />

          <div className='modal-add-item-buttonspace'>
            <Button
              label='Criar categoria'
              variant='primary'
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddCategory;
