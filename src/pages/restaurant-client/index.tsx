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
  const open = openingTime.slice(0, 5);
  const close = closingTime.slice(0, 5);
  return `${open} às ${close}`;
}

type MenuItem = {
  id: number;
  name: string;
  description: string;
  price: string;
  categories: string[];
  image: string;
  is_available: boolean;
  partner_id: number;
  partner_name: string;
};

const RestaurantClient: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [restaurant, setRestaurant] = useState<any>(null);
  const [menuItems, setMenuItems] = useState<MenuItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [favorited, setFavorited] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
  const [profileId, setProfileId] = useState<number | null>(null); // novo

  const handleCardClick = (item: MenuItem) => {
    if (!isOpen) {
      alert("O restaurante está fechado, não é possível fazer pedidos no momento");
      return;
    }
    openModal(item);
  };

  useEffect(() => {
    const fetchRestaurantAndMenu = async () => {
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

        if (!response.ok) throw new Error("Erro ao carregar restaurante");

        const restaurantData = await response.json();
        setRestaurant(restaurantData);
        setProfileId(restaurantData.profile_data?.id || null); // novo

        const responseMenu = await fetch(`${baseUrl}/api/v1/partners/${id}/menu-items/`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!responseMenu.ok) throw new Error("Erro ao carregar itens do menu");

        const itemsData = await responseMenu.json();
        setMenuItems(itemsData);

      } catch (err: any) {
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchRestaurantAndMenu();
    }
  }, [id]);

  const toggleFavorite = () => {
    setFavorited(prev => !prev);
  };

  const openModal = (item: MenuItem) => {
    setSelectedItem(item);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
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
                <Stars activeStars={5} />
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
              <p className="restaurant-client-timeopen2">
                {formatDays(openingDays)}
              </p>
            </div>
          </div>

          <div className="restaurant-client-box4">
            <div className="restaurant-client-box5">
              <p style={{ marginRight: "1vh" }}>{locationDesc}</p>
              <ButtonMap />
            </div>
            <p>{phone}</p>
            {/* <p>ID do profile_data: {restaurant.profile_data?.id}</p> */}
          </div>

          <h1>Lista de itens:</h1>
          <ItemListClient
            onCardClick={handleCardClick}
            items={menuItems}
          />

          {isModalOpen && selectedItem && (
            <ModalClientItem
              onClose={closeModal}
              item={selectedItem}
              profileId={profileId}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default RestaurantClient;
