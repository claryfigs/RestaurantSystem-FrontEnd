import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import NavbarClient from "../../components/navbar-client/navbar-client";
import Button from "../../components/Button/Button";
import ButtonMap from "../../components/button-map/button-map";
import ItemListClient from "../../components/item-list-client/item-list-client";
import ModalClientItem from "../../components/modal-client-item/modal-client-item";
import Stars from "../../components/stars/stars";
import RestaurantStatus from "../../components/restaurant-status/restaurant-status";
import "./style.css";

const baseUrl = "http://localhost:8000";

// Mapeamento dos dias da semana inglês → português abreviado
const daysMap: Record<string, string> = {
  MON: "SEG",
  TUE: "TER",
  WED: "QUA",
  THU: "QUI",
  FRI: "SEX",
  SAT: "SAB",
  SUN: "DOM",
};

function formatDays(openingDays: string[]) {
  return openingDays.map(day => daysMap[day] || day).join(", ");
}

function formatTimeRange(openingTime: string, closingTime: string) {
  const open = openingTime.slice(0, 5);   // pega "HH:mm"
  const close = closingTime.slice(0, 5);  // pega "HH:mm"
  return `${open} às ${close}`;
}

const RestaurantClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorited, setFavorited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchRestaurant = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        if (!token) {
          setError("Usuário não autenticado");
          setLoading(false);
          return;
        }

        const response = await fetch(`${baseUrl}/api/v1/partners/${id}/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar restaurante");
        }

        const data = await response.json();
        setRestaurant(data);
      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRestaurant();
    }
  }, [id]);

  const toggleFavorite = () => {
    setFavorited(prev => !prev);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (loading) return <p>Carregando restaurante...</p>;
  if (error) return <p>Erro: {error}</p>;
  if (!restaurant) return <p>Restaurante não encontrado</p>;

  const fullName = `${restaurant.first_name} ${restaurant.last_name}`;
  const description = restaurant.profile_data?.description || "";
  const locationDesc = restaurant.profile_data?.location?.description || "";
  const phone = restaurant.phone_number || "";
  const profileImage = restaurant.profile_image || "";
  const isOpen = restaurant.profile_data?.is_currently_open || false;
  const openingTime = restaurant.profile_data?.opening_time || "";
  const closingTime = restaurant.profile_data?.closing_time || "";
  const openingDays = restaurant.profile_data?.opening_days || [];

  return (
    <div>
      <NavbarClient />

      <div className="restaurant-client">
        <div className="restaurant-client-box">
          {/* Perfil do restaurante */}
          <div className="restaurant-client-infos">
            <div
              className="restaurant-client-profile"
              style={{
                backgroundImage: `url(${profileImage})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            ></div>

            <div className="restaurant-client-box2">
              <div className="restaurant-client-box3">
                <p className="restaurant-client-name">{fullName}</p>
                <Stars activeStars={3} />
              </div>

              <div className="restaurant-client-description">
                <p>{description}</p>
              </div>
            </div>

            <div className="restaurant-client-time">
              <Button
                label={favorited ? "Desfavoritar" : "Favoritar"}
                variant="primary"
                onClick={toggleFavorite}
              />
              <RestaurantStatus isOpen={isOpen} />
              <p className="restaurant-client-timeopen">
                {formatTimeRange(openingTime, closingTime)}
              </p>
              
              <p className="restaurant-client-timeopen">Dias abertos:</p>
              <p className="restaurant-client-timeopen">
                {formatDays(openingDays)}
              </p>
            </div>
          </div>

          {/* Endereço e telefone */}
          <div className="restaurant-client-box4">
            <div className="restaurant-client-box5">
              <p style={{ marginRight: "1vh" }}>{locationDesc}</p>
              <ButtonMap />
            </div>
            <p>{phone}</p>
          </div>

          <h1>Lista de itens:</h1>
          <ItemListClient onCardClick={openModal} restaurantId={restaurant.id} />

          {/* Modal */}
          {isModalOpen && <ModalClientItem onClose={closeModal} />}
        </div>
      </div>
    </div>
  );
};

export default RestaurantClient;
