import { useEffect, useState } from 'react';
import './style.css';
import NavbarClient from '../../components/navbar-client/navbar-client';
import Button from '../../components/Button/Button';
import ModalEditClient from '../../components/modal-edit-client/modal-edit-client';

interface ProfileData {
  id: number;
  enrollment_id: string;
  credit_balance: string;
}

interface UserData {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  phone_number: string;
  profile_image: string | null;
  profile_data: ProfileData;
}

function ProfileClient() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [showEditModal, setShowEditModal] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('accessToken');
      if (!token) {
        setError('Token não encontrado. Faça login novamente.');
        return;
      }

      try {
        const response = await fetch('http://localhost:8000/api/v1/my-data/', {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.status}`);
        }

        const data = await response.json();
        console.log('Dados do usuário:', data);
        setUserData(data);
      } catch (err: any) {
        setError(err.message || 'Erro ao carregar dados do usuário.');
      }
    };

    fetchUserData();
  }, []);

  return (
    <div>
      <NavbarClient />
      <div className='client-profile'>
        <div className='client-profile-box'>
          {error && <p className="client-profile-error">{error}</p>}

          {!userData ? (
            <p>Carregando...</p>
          ) : (
            <>
              <div className='client-profile-infos1'>
                <div
                  className='client-profile-image'
                  style={{
                    backgroundImage: userData.profile_image
                      ? `url(${userData.profile_image})`
                      : 'none',
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundColor: userData.profile_image ? 'transparent' : '#ccc',
                  }}
                >
                  {!userData.profile_image && (
                    <div className="client-profile-placeholder-image"></div>
                  )}
                </div>

                <div className='client-profile-infos2'>
                  <h1>{userData.first_name} {userData.last_name}</h1>
                  <h1>Saldo da carteira: {userData.profile_data.credit_balance}</h1>
                </div>
              </div>

              <div className='client-profile-infos3'>
                <h2>Matrícula: {userData.profile_data.enrollment_id}</h2>
                <h2>Telefone: {userData.phone_number}</h2>
                <h2>Email: {userData.email}</h2>
                <Button
                  label="Editar informações"
                  variant="primary"
                  onClick={() => setShowEditModal(true)}
                />
              </div>

              <h1>Restaurantes Favoritos:</h1>
              <h2>Em breve</h2>
            </>
          )}
        </div>
      </div>

      {showEditModal && userData && (
        <ModalEditClient
          onClose={() => setShowEditModal(false)}
          userData={userData}
        />
      )}
    </div>
  );
}

export default ProfileClient;
