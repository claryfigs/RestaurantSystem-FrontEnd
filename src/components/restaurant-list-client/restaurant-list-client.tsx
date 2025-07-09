import React, { useEffect, useState } from 'react';
import './restaurant-list-client.css';
import RestaurantCardClient from '../restaurant-card-client/restaurant-card-client';

type Location = {
  id: number;
  description: string;
};

type ProfileData = {
  id: number;
  description: string;
  location: Location;
  is_currently_open: boolean;
  opening_time: string;
  closing_time: string;
  opening_days: string[];
};

type Restaurant = {
  id: number;
  email: string;
  first_name: string;
  last_name: string;
  user_type: string;
  phone_number: string;
  profile_image: string;
  profile_data: ProfileData;
};

const baseUrl = 'http://localhost:8000'; // ajuste para sua API

const RestaurantListClient: React.FC = () => {
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRestaurants = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        if (!token) {
          setError('Usuário não autenticado');
          setLoading(false);
          return;
        }

        const response = await fetch(`${baseUrl}/api/v1/partners/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao carregar restaurantes');
        }

        const data = await response.json();
        setRestaurants(data.results);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRestaurants();
  }, []);

  if (loading) return <p>Carregando restaurantes...</p>;
  if (error) return <p>Erro: {error}</p>;

  return (
    <div className='restaurant-list-client'>
      {restaurants.map((rest) => (
        <RestaurantCardClient
          key={rest.id}
          id={rest.id}
          name={`${rest.first_name} ${rest.last_name}`}
          image={rest.profile_image}
          isOpen={rest.profile_data.is_currently_open}
          openingTime={rest.profile_data.opening_time}
          closingTime={rest.profile_data.closing_time}
        />
      ))}
    </div>
  );
};

export default RestaurantListClient;
