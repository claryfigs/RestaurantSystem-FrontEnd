import { useState } from 'react';
import './modal-add-item.css';
import Button from '../Button/Button';
import CloseIcon from '../../assets/close-icon.png';
import InputDefault from '../input-default/input-default';
import ObservationInput from '../input-observation/input-observation';
import MoneyInput from '../input-money/input-money';
import SelecItemStatus from '../select-item-status/select-item-status';

type ModalAddItemProps = {
  onClose: () => void;
};

const ModalAddItem: React.FC<ModalAddItemProps> = ({ onClose }) => {
  const [itemName, setItemName] = useState('');
  const [observation, setObservation] = useState('');
  const [price, setPrice] = useState('');
  const [categories, setCategories] = useState('');
  const [isAvailable, setIsAvailable] = useState('true');
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (value: string) => {
    setIsAvailable(value);
  };

  const handleCreateItem = async () => {
    const token = localStorage.getItem('accessToken');
    const partnerId = localStorage.getItem('profileId');

    if (!token || !partnerId) {
      alert('Token ou parceiro não encontrado.');
      return;
    }

    setLoading(true);

    try {
      const categoriesArray = categories
        .split(',')
        .map((cat) => cat.trim())
        .filter((cat) => cat !== '');

      const formData = new FormData();
      formData.append('name', itemName);
      formData.append('description', observation);
      formData.append('price', price.replace(',', '.'));
      formData.append('is_available', isAvailable === 'true' ? 'true' : 'false');
      formData.append('partner', partnerId);

      categoriesArray.forEach((cat) => {
        formData.append('categories', cat);
      });

      if (selectedImageFile) {
        formData.append('image', selectedImageFile);
      }

      const response = await fetch(`http://localhost:8000/api/v1/menu-items/`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('Erro ao criar item:', errorData);
          alert('Erro ao criar item: ' + JSON.stringify(errorData));
        } else {
          const text = await response.text();
          console.error('Erro ao criar item (não JSON):', text);
          alert('Erro ao criar item: ' + text);
        }
        setLoading(false);
        return;
      }

      alert('Item criado com sucesso!');
      window.location.reload();
    } catch (error: any) {
      console.error('Erro na requisição de criação:', error);
      alert('Erro inesperado ao criar item: ' + (error.message || error));
    } finally {
      setLoading(false);
    }
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
            <input
              type="file"
              accept="image/*"
              style={{ display: 'none' }}
              id="imageInput"
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedImageFile(e.target.files[0]);
                }
              }}
            />

            <div
              className='modal-add-item-image'
              style={{
                backgroundImage: selectedImageFile
                  ? `url(${URL.createObjectURL(selectedImageFile)})`
                  : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            <div>
              <Button
                label='Enviar imagem'
                variant='primary'
                onClick={() => {
                  const fileInput = document.getElementById('imageInput');
                  fileInput?.click();
                }}
              />
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

          <p>Categorias do item (separe por vírgula):</p>
          <InputDefault
            value={categories}
            onChange={(e) => setCategories(e.target.value)}
            placeholder="Ex: bebidas, refrigerantes"
          />

          <p>Preço do item:</p>
          <MoneyInput
            value={price}
            onChange={setPrice}
            placeholder="0,00"
          />

          <p>Disponibilidade:</p>
          <SelecItemStatus value={isAvailable} onChange={handleSelectChange} />

          <div className='modal-add-item-buttonspace'>
            <Button
              label={loading ? 'Enviando...' : 'Enviar'}
              variant='primary'
              onClick={handleCreateItem}
              disabled={loading}
            />
            <Button
              label='Cancelar'
              variant='secondary'
              onClick={onClose}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddItem;
