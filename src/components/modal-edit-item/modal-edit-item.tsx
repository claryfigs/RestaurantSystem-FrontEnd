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
  const [categories, setCategories] = useState('');
  const [isAvailable, setIsAvailable] = useState(item?.is_available ? 'true' : 'false');
  const [loading, setLoading] = useState(false);
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);

  useEffect(() => {
    setItemName(item?.name || '');
    setObservation(item?.description || '');
    setPrice(item?.price || '');
    setIsAvailable(item?.is_available ? 'true' : 'false');
    setSelectedImageFile(null);
    setCategories(item?.categories?.join(', ') || '');
  }, [item]);

  const handleSelectChange = (value: string) => {
    setIsAvailable(value);
  };

  const handleUpdateItem = async () => {
    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Token não encontrado.');
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

      categoriesArray.forEach((cat) => {
        formData.append('categories', cat);
      });

      if (selectedImageFile) {
        formData.append('image', selectedImageFile);
      }

      const response = await fetch(`http://localhost:8000/api/v1/menu-items/${item.id}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!response.ok) {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('Erro ao atualizar item:', errorData);
          alert('Erro ao atualizar item: ' + JSON.stringify(errorData));
        } else {
          const text = await response.text();
          console.error('Erro ao atualizar item (não JSON):', text);
          alert('Erro ao atualizar item: ' + text);
        }
        setLoading(false);
        return;
      }

      alert('Item atualizado com sucesso!');
      onClose();
      window.location.reload();
    } catch (error: any) {
      console.error('Erro na requisição de atualização:', error);
      alert('Erro inesperado ao atualizar item: ' + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteItem = async () => {
    const confirmDelete = window.confirm('Tem certeza que deseja deletar este item?');
    if (!confirmDelete) return;

    const token = localStorage.getItem('accessToken');
    if (!token) {
      alert('Token não encontrado.');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:8000/api/v1/menu-items/${item.id}/`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.ok) {
        alert('Item deletado com sucesso!');
        onClose();
        window.location.reload();
      } else {
        const contentType = response.headers.get('content-type') || '';
        if (contentType.includes('application/json')) {
          const errorData = await response.json();
          console.error('Erro ao deletar item:', errorData);
          alert('Erro ao deletar item: ' + JSON.stringify(errorData));
        } else {
          const text = await response.text();
          console.error('Erro ao deletar item (não JSON):', text);
          alert('Erro ao deletar item: ' + text);
        }
      }
    } catch (error: any) {
      console.error('Erro na requisição de deleção:', error);
      alert('Erro inesperado ao deletar item: ' + (error.message || error));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-add-item-overlay">
      <div className="modal-add-item-content">
        <div className="modal-add-item-header">
          <img
            src={CloseIcon}
            alt="Ícone de fechamento"
            className="close-icon-modal-add-item"
            onClick={onClose}
            style={{ cursor: 'pointer' }}
          />
        </div>

        <div className="modal-add-item-infos">
          <div className="modal-add-item-spaceimage">
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
              className="modal-add-item-image"
              style={{
                backgroundImage: selectedImageFile
                  ? `url(${URL.createObjectURL(selectedImageFile)})`
                  : item?.image
                  ? `url(${item.image})`
                  : 'none',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            <div>
              <Button
                label="Alterar imagem"
                variant="primary"
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
          <MoneyInput value={price} onChange={setPrice} placeholder="0,00" />

          <p>Disponibilidade:</p>
          <SelecItemStatus value={isAvailable} onChange={handleSelectChange} />

          <div className="modal-add-item-buttonspace">
            <Button
              label={loading ? 'Enviando...' : 'Enviar alterações'}
              variant="primary"
              onClick={handleUpdateItem}
              disabled={loading}
            />
            <Button
              label={loading ? 'Processando...' : 'Deletar item'}
              variant="secondary"
              onClick={handleDeleteItem}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditItem;
