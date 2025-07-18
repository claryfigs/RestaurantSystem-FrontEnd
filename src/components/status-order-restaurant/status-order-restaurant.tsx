import React, { useState, useEffect } from "react";
import "./status-order-restaurant.css";
import CheckedIcon from "../../assets/checked-icon.png";
import ModalAlert from "../modal-alert/modal-alert";

const statuses = [
  "recebido",
  "em_preparo",
  "saiu_pra_entrega",
  "entregue",
] as const;
type Status = (typeof statuses)[number];

const statusToApi = {
  recebido: "S",
  em_preparo: "P",
  saiu_pra_entrega: "O",
  entregue: "D",
};

const mapApiStatusToStatus = (apiStatus: string): Status | "cancelado" => {
  switch (apiStatus) {
    case "S":
      return "recebido";
    case "P":
      return "em_preparo";
    case "O":
      return "saiu_pra_entrega";
    case "D":
      return "entregue";
    case "C":
      return "cancelado";
    default:
      return "recebido";
  }
};

type Props = {
  apiStatus: string;
  orderId: number;
};

const StatusOrderRestaurant: React.FC<Props> = ({ apiStatus, orderId }) => {
  const initialStatus = mapApiStatusToStatus(apiStatus);
  const initialIndex =
    initialStatus === "cancelado" ? -1 : statuses.indexOf(initialStatus);

  const [currentStatusIndex, setCurrentStatusIndex] = useState(initialIndex);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("error");
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

  useEffect(() => {
    const mapped = mapApiStatusToStatus(apiStatus);
    setCurrentStatusIndex(
      mapped === "cancelado" ? -1 : statuses.indexOf(mapped)
    );
  }, [apiStatus]);

  const handleClick = async () => {
    if (currentStatusIndex === -1 || currentStatusIndex >= statuses.length - 1)
      return;

    const nextIndex = currentStatusIndex + 1;
    const nextStatus = statuses[nextIndex];

    // Se o próximo status for 'entregue', mostra modal e não avança
    if (nextStatus === "entregue") {
      showModal(
        "error",
        "Aguarde o cliente receber o pedido",
        "O status 'Entregue' só pode ser atualizado pelo cliente quando ele receber o pedido."
      );
      return;
    }

    if (!orderId) {
      showModal("error", "Erro interno", "Erro interno: orderId não definido!");
      return;
    }

    const apiStatusValue = statusToApi[nextStatus];
    const token = localStorage.getItem("accessToken");
    if (!token) {
      showModal(
        "error",
        "Token não encontrado",
        "Token não encontrado. Faça login novamente."
      );
      return;
    }

    try {
      const response = await fetch(
        `http://localhost:8000/api/v1/orders/${orderId}/update-status/`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ status: apiStatusValue }),
        }
      );

      const responseData = await response.json();
      if (!response.ok) {
        showModal(
          "error",
          "Erro do servidor",
          `Erro do servidor: ${response.status}\n${JSON.stringify(
            responseData
          )}`
        );
        return;
      }

      setCurrentStatusIndex(nextIndex);
    } catch (error) {
      showModal(
        "error",
        "Erro ao atualizar status",
        `Erro ao atualizar status do pedido: ${error}`
      );
      console.error(error);
    }
  };

  if (currentStatusIndex === -1) {
    return (
      <div className="status-tracker cancelado">
        <h1>Pedido Cancelado</h1>
      </div>
    );
  }

  return (
    <div className="status-tracker">
      {statuses.map((status, index) => {
        // "enviado" sempre ativo e concluído (checado)
        // O primeiro status clicável é o próximo após o status atual
        const isCompleted = index <= currentStatusIndex || index === 0;
        const isActive = index <= currentStatusIndex;
        const isClickable = index === currentStatusIndex + 1;

        return (
          <div
            key={status}
            className={`status-item ${isActive ? "active" : ""}`}
            onClick={() => isClickable && handleClick()}
            style={{ cursor: isClickable ? "pointer" : "default" }}
          >
            <div
              className={`checkbox-status-item ${
                isCompleted ? "completed" : ""
              }`}
            >
              {isCompleted && (
                <img
                  src={CheckedIcon}
                  alt="Ícone de check"
                  className="image-checked"
                />
              )}
            </div>
            {status === "recebido" && "Recebido"}
            {status === "em_preparo" && "Em preparo"}
            {status === "saiu_pra_entrega" && "Saiu pra entrega"}
            {status === "entregue" && "Entregue"}
          </div>
        );
      })}

      <ModalAlert
        isOpen={modalOpen}
        title={modalTitle}
        message={modalMessage}
        type={modalType}
        onClose={closeModal}
      />
    </div>
  );
};

export default StatusOrderRestaurant;
