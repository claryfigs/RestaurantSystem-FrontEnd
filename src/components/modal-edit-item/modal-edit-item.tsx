import { useEffect, useState } from 'react';
import './modal-edit-item.css';
import Button from '../Button/Button';
import CloseIcon from '../../assets/close-icon.png';
import InputDefault from '../input-default/input-default';
import ObservationInput from '../input-observation/input-observation';
import MoneyInput from '../input-money/input-money';
import SelecItemStatus from '../select-item-status/select-item-status';

type ModalEditItemProps = {
  onClose: () => void;
  item: any;
};

const ModalEditItem: React.FC<ModalEditItemProps> = ({ onClose, item }) => {
  const [itemName, setItemName] = useState(item?.name || '');
  const [observation, setObservation] = useState(item?.description || '');
  const [price, setPrice] = useState(item?.price || '');
  const [category, setCategory] = useState(item?.categories?.[0] || '');
  const [isAvailable, setIsAvailable] = useState(item?.is_available ? 'Disponível' : 'Indisponível');

  useEffect(() => {
    setItemName(item?.name || '');
    setObservation(item?.description || '');
    setPrice(item?.price || '');
    setCategory(item?.categories?.[0] || '');
    setIsAvailable(item?.is_available ? 'Disponível' : 'Indisponível');
  }, [item]);

  const handleSelectChange = (value: string) => {
    setIsAvailable(value);
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
            <div
              className='modal-add-item-image'
              style={{
                backgroundImage: item?.image ? `url(${item.image})` : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            ></div>
            <div>
              <Button label='Alterar imagem' variant='primary' />
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

          <p>Categoria do item:</p>
          <InputDefault
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            placeholder="Digite a categoria"
          />

          <p>Preço do item:</p>
          <MoneyInput
            value={price}
            onChange={setPrice}
            placeholder="0,00"
          />

          <p>Disponibilidade:</p>
          <SelecItemStatus
            value={isAvailable}
            onChange={handleSelectChange}
          />

          <div className='modal-add-item-buttonspace'>
            <Button
              label='Enviar alterações'
              variant='primary'
              onClick={onClose}
            />
            <Button
              label='Deletar item'
              variant='secondary'
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditItem;
