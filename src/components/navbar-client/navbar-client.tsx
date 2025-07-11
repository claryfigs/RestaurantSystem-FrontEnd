import "./navbar-client.css";
import { useState, useEffect } from "react";
import SidebarClient from "../sidebar-client/sidebar-client";
import CarClient from "../car-client/car-client";

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

const NavbarClient: React.FC = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        return;
      }

      try {
        const response = await fetch("http://localhost:8000/api/v1/my-data/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error(`Erro ao buscar dados: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data);
      } catch (err: any) {
        console.error("Erro ao carregar dados do usuário:", err);
      }
    };

    fetchUserData();

    // Escutar eventos de atualização de saldo
    const handleBalanceUpdate = (event: CustomEvent) => {
      setUserData(event.detail);
    };

    window.addEventListener(
      "balanceUpdated",
      handleBalanceUpdate as EventListener
    );

    // Cleanup
    return () => {
      window.removeEventListener(
        "balanceUpdated",
        handleBalanceUpdate as EventListener
      );
    };
  }, []);

  return (
    <div className="navbar-box">
      <div className="navbar-sidebar-space">
        <SidebarClient />
      </div>
      <p className="navbar-title">Tô brocado</p>
      <div className="navbar-balance-car-space">
        <span className="navbar-balance">
          Saldo atual: {userData?.profile_data?.credit_balance || "R$ 0,00"}
        </span>
        <div className="navbar-car-space">
          <CarClient />
        </div>
      </div>
    </div>
  );
};

export default NavbarClient;
