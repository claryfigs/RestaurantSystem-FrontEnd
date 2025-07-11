import { useEffect, useState } from 'react';
import './style.css';
import NavbarRestaurant from '../../components/navbar-restaurant/navbar-restaurant';
import Button from '../../components/Button/Button';
import ItemListRestaurant from '../../components/item-list-restaurant/item-list-restaurant';
import ButtonMap from '../../components/button-map/button-map';
import ModalAddCategory from '../../components/modal-add-category/modal-add-category';
import ModalEditRestaurant from '../../components/modal-edit-restaurant/modal-edit-restaurant';
import RestaurantImagePlaceholder from '../../assets/ueceana.png';

interface LocationData {
  id: number;
  description: string;
}

interface ProfileData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  phone_number: string;
  profile_image: string;
  profile_data: {
    id: number;
    description: string;
    location: LocationData;
    revenue: string;
    is_currently_open: boolean;
    opening_time: string;
    closing_time: string;
    opening_days: string[];
  };
}

function RestaurantProfile() {
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [profile, setProfile] = useState<ProfileData | null>(null);

  // const handleOpenCategoryModal = () => setShowCategoryModal(true);
  const handleCloseCategoryModal = () => setShowCategoryModal(false);

  const handleOpenEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);


  function formatTime(time: string | undefined) {
  if (!time) return '';
  const [h, m] = time.split(':');
  return `${h}:${m}`;
  }

  const dayMap: Record<string, string> = {
  MON: 'SEG',
  TUE: 'TER',
  WED: 'QUA',
  THU: 'QUI',
  FRI: 'SEX',
  SAT: 'SAB',
  SUN: 'DOM'
  };

  function translateDays(days: string[]): string[] {
  return days.map(day => dayMap[day] || day);
  }


  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        console.error("Token não encontrado");
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/v1/my-data/", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dados do restaurante:", data);
        setProfile(data);
      } catch (error) {
        console.error("Erro ao buscar perfil:", error);
      }
    };

    fetchProfile();
  }, []);

  return (
    <div>
      <NavbarRestaurant />

      <div className="restaurant-profile">
        <div className="restaurant-profile-box">
          {/* Perfil do restaurante */}
          <div className="restaurant-profile-infos">
            <div
              className="restaurant-profile-image"
              style={{
                backgroundImage: `url(${profile?.profile_image || RestaurantImagePlaceholder})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            ></div>

            <div className="restaurant-profile-box2">
              <div className="restaurant-profile-box3">
                <h1>
                  {profile
                    ? `${profile.first_name} ${profile.last_name}`
                    : 'Carregando...'}
                </h1>
              </div>

              <div className="restaurant-profile-description">
                <p>
                  {profile?.profile_data?.description ||
                    'Descrição do restaurante'}
                </p>
              </div>
            </div>

            <div className="restaurant-profile-time">
              <Button
                label="Editar perfil"
                variant="primary"
                onClick={handleOpenEditModal}
              />

              {profile?.profile_data && (
                <p className="restaurant-profile-timeopen">
                  {formatTime(profile.profile_data.opening_time)} às{' '}
                  {formatTime(profile.profile_data.closing_time)}
                </p>
              )}

              <p className="restaurant-profile-timeopen">
                  Dias abertos:{' '}
              </p>

              {profile?.profile_data && (
                <p className="restaurant-profile-timeopen2">
                  {translateDays(profile.profile_data.opening_days).join(', ')}
                </p>
              )}

            </div>
          </div>

          {/* Endereço e telefone */}
          <div className="restaurant-profile-box4">
            <div className="restaurant-profile-box5">
              <p style={{ marginRight: '1vh' }}>
                {profile?.profile_data?.location?.description ||
                  'Endereço não informado'}
              </p>
              <ButtonMap />
            </div>
            <p>{profile?.phone_number || '+55 85 00000-0000'}</p>
          </div>

          <ItemListRestaurant />

          {/* Botão para abrir o modal de categoria */}
          {/* <Button
            label="Criar nova categoria"
            variant="secondary"
            onClick={handleOpenCategoryModal}
          /> */}

          {showCategoryModal && (
            <ModalAddCategory onClose={handleCloseCategoryModal} />
          )}

          {showEditModal && (
            <ModalEditRestaurant onClose={handleCloseEditModal} />
          )}
        </div>
      </div>
    </div>
  );
}

export default RestaurantProfile;
