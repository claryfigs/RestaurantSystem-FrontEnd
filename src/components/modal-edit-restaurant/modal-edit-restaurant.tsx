import { useEffect, useState } from 'react';
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
  profile: any;               // Passe o profile do restaurante aqui como prop
};

const ModalEditRestaurant: React.FC<ModalEditRestaurantProps> = ({ onClose, profile }) => {
  // Estado para cada campo
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [description, setDescription] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [openingDays, setOpeningDays] = useState<string[]>([]);
  const [openingTime, setOpeningTime] = useState('12:00:00');
  const [closingTime, setClosingTime] = useState('18:00:00');
  const [isOpen, setIsOpen] = useState(false);
  const [locationId, setLocationId] = useState(0);

  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [profileImage, setProfileImage] = useState('');

  // Carrega os dados atuais do perfil para edição
  useEffect(() => {
    if (profile) {
      setEmail(profile.email || '');
      setFirstName(profile.first_name || '');
      setLastName(profile.last_name || '');
      setDescription(profile.profile_data?.description || '');
      setPhoneNumber(profile.phone_number || '');
      setOpeningDays(profile.profile_data?.opening_days || []);
      setOpeningTime(profile.profile_data?.opening_time || '12:00:00');
      setClosingTime(profile.profile_data?.closing_time || '18:00:00');
      setIsOpen(profile.profile_data?.is_currently_open || false);
      setLocationId(profile.profile_data?.location?.id || 0);
      setProfileImage(profile.profile_image || '');
    }
  }, [profile]);

  // Envio PATCH com FormData
  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        console.error('Token não encontrado');
        return;
      }

      const formData = new FormData();
      formData.append('email', email);
      formData.append('first_name', firstName);
      formData.append('last_name', lastName);
      formData.append('description', description);
      formData.append('phone_number', phoneNumber);

      if (selectedFile) {
        formData.append('profile_image', selectedFile);
      }

      openingDays.forEach((day) => formData.append('opening_days', day));
      formData.append('opening_time', openingTime);
      formData.append('closing_time', closingTime);
      formData.append('is_open', String(isOpen));
      formData.append('location', String(locationId));

      const response = await fetch(`http://localhost:8000/api/v1/partners/${profile.id}/`, {
        method: 'PATCH',
        headers: {
          Authorization: `Bearer ${token}`
        },
        body: formData
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao atualizar: ${response.status} ${JSON.stringify(errorData)}`);
      }

      console.log('Perfil atualizado com sucesso');
      onClose();
      window.location.reload();

    } catch (error) {
      console.error(error);
      alert('Erro ao enviar dados');
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

          {/* IMAGEM */}
          <div className='modal-add-item-spaceimage'>
            <div
              className="modal-add-item-image"
              style={{
                backgroundImage: `url(${profileImage || RestaurantImage})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                if (e.target.files && e.target.files.length > 0) {
                  setSelectedFile(e.target.files[0]);
                  setProfileImage(URL.createObjectURL(e.target.files[0]));
                }
              }}
            />
          </div>

          <p>Email:</p>
          <InputDefault
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Digite o email"
          />

          <p>Primeiro nome:</p>
          <InputDefault
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="Digite o primeiro nome"
          />

          <p>Último nome:</p>
          <InputDefault
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Digite o último nome"
          />

          <p>Descrição do restaurante:</p>
          <ObservationInput
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Digite a descrição"
          />

          <p>Telefone:</p>
          <InputDefault
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
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
            value={closingTime}
            onChange={setClosingTime}
            placeholder="Horário de fechamento"
          />

          <p>Dias de funcionamento:</p>
          <CheckboxDays
            value={openingDays}
            onChange={setOpeningDays}
          />

          <div className='modal-add-item-buttonspace'>
            <Button
              label='Enviar'
              variant='primary'
              onClick={handleSubmit}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditRestaurant;
