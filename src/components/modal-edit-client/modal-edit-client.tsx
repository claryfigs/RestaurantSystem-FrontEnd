import { useEffect, useState } from 'react';
import './modal-edit-client.css';
import Button from '../Button/Button';
import CloseIcon from '../../assets/close-icon.png';
import InputDefault from '../input-default/input-default';
import RestaurantImage from '../../assets/ueceana.png';

type UserData = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  phone_number: string;
  profile_image: string | null;
  profile_data: {
    id: number;
    enrollment_id: string;
    credit_balance: string;
  };
};

type ModalEditClientProps = {
  onClose: () => void;
  userData: UserData;
};

const ModalEditClient: React.FC<ModalEditClientProps> = ({ onClose, userData }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [selectedImageFile, setSelectedImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setFirstName(userData.first_name || '');
    setLastName(userData.last_name || '');
    setPhoneNumber(userData.phone_number || '');
    setProfileImage(userData.profile_image || '');
    setSelectedImageFile(null);
  }, [userData]);

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId');
    const token = localStorage.getItem('accessToken');

    if (!userId || !token) {
      alert('ID ou token não encontrados. Faça login novamente.');
      return;
    }

    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('user_type', 'C');
      formData.append('phone_number', phoneNumber);

      if (selectedImageFile) {
        formData.append('profile_image', selectedImageFile);
      }

      const response = await fetch(`http://localhost:8000/api/v1/customers/${userId}/`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData,
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`Erro ao atualizar: ${text}`);
      }

      alert('Dados atualizados com sucesso!');
      onClose();
      window.location.reload();
    } catch (err: any) {
      alert(`Erro ao enviar PATCH: ${err.message}`);
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
            {/* INPUT FILE escondido */}
            <input
              type="file"
              accept="image/*"
              id="profileImageInput"
              style={{ display: 'none' }}
              onChange={(e) => {
                if (e.target.files && e.target.files[0]) {
                  setSelectedImageFile(e.target.files[0]);
                }
              }}
            />

            {/* PREVIEW da imagem */}
            <div
              className="modal-add-item-image"
              style={{
                backgroundImage: selectedImageFile
                  ? `url(${URL.createObjectURL(selectedImageFile)})`
                  : profileImage
                  ? `url(${profileImage})`
                  : `url(${RestaurantImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            <div>
              <Button
                label="Alterar imagem de perfil"
                variant="primary"
                onClick={() => {
                  document.getElementById('profileImageInput')?.click();
                }}
              />
            </div>
          </div>

          <p>Primeiro nome:</p>
          <InputDefault
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />

          <p>Segundo nome:</p>
          <InputDefault
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />

          <p>Telefone:</p>
          <InputDefault
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <div className='modal-add-item-buttonspace'>
            <Button
              label={loading ? 'Enviando...' : 'Enviar'}
              variant='primary'
              onClick={handleSubmit}
              disabled={loading}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditClient;
