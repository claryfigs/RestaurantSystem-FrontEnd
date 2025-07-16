import "./style.css";
import { useState, useEffect } from "react";
import NavbarClient from "../../components/navbar-client/navbar-client";
import SelectPayment from "../../components/select-payment/select-payment";
import MoneyInput from "../../components/input-money/input-money";
import Button from "../../components/Button/Button";
import ModalAlert from "../../components/modal-alert/modal-alert";

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

function WalletClient() {
  const [value, setValue] = useState("00,00");
  const [paymentMethod, setPaymentMethod] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [userData, setUserData] = useState<UserData | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");

  const showModal = (
    type: "success" | "error",
    title: string,
    message: string
  ) => {
    setModalType(type);
    setModalTitle(title);
    setModalMessage(message);
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  // Buscar dados do usuário na inicialização
  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("accessToken");
      if (!token) {
        setError("Token não encontrado. Faça login novamente.");
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
  }, []);

  const handleSelectChange = (val: string) => {
    setPaymentMethod(val);
    setError("");
  };

  // Converte string tipo "12,34" para float 12.34
  const parseMoney = (str: string) => {
    return parseFloat(str.replace(/\./g, "").replace(",", "."));
  };

  const handleAddCredits = async () => {
    setError("");
    const amount = parseMoney(value);
    if (isNaN(amount) || amount < 5) {
      setError("O valor mínimo para adicionar é R$ 5,00.");
      return;
    }
    if (!["C", "B", "P"].includes(paymentMethod)) {
      setError("Selecione um método de pagamento válido.");
      return;
    }
    if (!userData?.id) {
      setError("Usuário não identificado. Faça login novamente.");
      return;
    }
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      const baseUrl = "http://localhost:8000";
      const response = await fetch(
        `${baseUrl}/api/v1/customers/${userData.id}/add-credits/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
          body: JSON.stringify({
            amount: amount.toFixed(2),
            payment_method: paymentMethod,
          }),
        }
      );
      if (!response.ok) {
        let data;
        try {
          data = await response.json();
        } catch {
          data = {};
        }
        throw new Error(
          data.detail || data.error || "Erro ao adicionar saldo."
        );
      }
      await response.json();

      // Buscar dados atualizados da API após adicionar créditos
      const updatedResponse = await fetch(`${baseUrl}/api/v1/my-data/`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      if (updatedResponse.ok) {
        const updatedData = await updatedResponse.json();
        setUserData(updatedData);
        // Disparar evento personalizado para atualizar a navbar
        window.dispatchEvent(
          new CustomEvent("balanceUpdated", { detail: updatedData })
        );
      }

      showModal(
        "success",
        "Saldo adicionado com sucesso!",
        `R$ ${amount
          .toFixed(2)
          .replace(".", ",")} foram adicionados à sua carteira.`
      );
      setValue("00,00");
      setPaymentMethod("");
    } catch (err: any) {
      setError(err.message || "Erro ao adicionar saldo. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <NavbarClient />
      <div className="wallet-client">
        <h1>Carteira</h1>
        <h2>Use o saldo da carteira para fazer compras.</h2>

        <div className="wallet-client-balance">
          <span className="wallet-client-balance-title">Seu saldo:</span>
          <span className="wallet-client-balance-text">
            {userData?.profile_data?.credit_balance || "R$ 0,00"}
          </span>
        </div>

        <h1>Adicionar saldo:</h1>
        <h2>Escolha um método para adicionar saldo na carteira.</h2>

        <div className="wallet-client-space">
          <SelectPayment onChange={handleSelectChange} value={paymentMethod} />
        </div>
        {/* <div style={{ margin: "8px 0" }}>
          <small>Métodos: Crédito (C), Boleto (B), Pix (P)</small>
        </div> */}

        <h2>Quanto você deseja adicionar?</h2>

        <div className="wallet-client-space">
          <div className="wallet-client-space2">
            <h1 className="wallet-client-space3">R$</h1>
            <MoneyInput
              value={value}
              onChange={setValue}
              placeholder="Digite o valor"
            />
          </div>
        </div>

        <div className="wallet-client-button">
          <Button
            label={loading ? "Processando..." : "Gerar pagamento"}
            variant="secondary"
            onClick={handleAddCredits}
            disabled={loading}
          />
        </div>
        {error && <div style={{ color: "red", marginTop: 10 }}>{error}</div>}
      </div>

      <ModalAlert
        isOpen={modalOpen}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
        onClose={closeModal}
      />
    </div>
  );
}

export default WalletClient;
