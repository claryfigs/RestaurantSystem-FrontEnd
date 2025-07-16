import React, { useState } from "react";
import "./order-card-client.css";
import Button from "../Button/Button";
import StatusOrderClient from "../status-order-client/status-order-client";
import ModalCancelOrder from "../modal-cancel-order/modal-cancel-order";
import ModalAlert from "../modal-alert/modal-alert";
import { useNavigate } from "react-router-dom";

type OrderItem = {
  id: number;
  menu_item: number;
  menu_item_name: string;
  quantity: number;
  unit_price: string;
};

type DeliveryLocation = {
  id: number;
  description: string;
};

type OrderProps = {
  id: number;
  partner: string;
  order_items: OrderItem[];
  delivery_location: DeliveryLocation;
  total_amount: string;
  status: string;
  details: string;
  created_at: string;
};

const OrderCardClient: React.FC<{ order: OrderProps }> = ({ order }) => {
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("error");
  const [modalTitle, setModalTitle] = useState("");
  const [modalMessage, setModalMessage] = useState("");
  const navigate = useNavigate();

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
    // Se for um modal de sucesso de cancelamento, recarregar a página
    if (
      modalType === "success" &&
      modalTitle === "Pedido cancelado com sucesso!"
    ) {
      window.location.reload();
    }
    // Se for um modal de sucesso de entrega, navegar para o histórico
    if (
      modalType === "success" &&
      modalTitle === "Entrega confirmada com sucesso!"
    ) {
      navigate("/order-record-client");
    }
  };

  const openCancelModal = () => setShowCancelModal(true);
  const closeCancelModal = () => setShowCancelModal(false);

  const translateStatus = (status: string) => {
    switch (status) {
      case "S":
        return "enviado";
      case "P":
        return "em_preparo";
      case "O":
        return "saiu_pra_entrega";
      case "D":
        return "entregue";
      case "C":
        return "cancelado";
      default:
        return "desconhecido";
    }
  };

  const statusTranslated = translateStatus(order.status);

  // Filtrar apenas os status válidos para o StatusOrderClient
  const validStatuses = [
    "enviado",
    "em_preparo",
    "saiu_pra_entrega",
    "entregue",
  ];
  const statusForComponent = validStatuses.includes(statusTranslated)
    ? (statusTranslated as
        | "enviado"
        | "em_preparo"
        | "saiu_pra_entrega"
        | "entregue")
    : "enviado";

  // ✅ Confirmar entrega
  const handleConfirmDelivery = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token não encontrado.");

      const res = await fetch(
        `http://localhost:8000/api/v1/orders/${order.id}/update-status/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "D" }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Erro ${res.status}: ${text}`);
      }

      showModal(
        "success",
        "Entrega confirmada com sucesso!",
        "Obrigado por confirmar a entrega do seu pedido. Você será redirecionado para o histórico de pedidos."
      );
    } catch (err: any) {
      showModal(
        "error",
        "Erro ao confirmar entrega",
        `Erro ao confirmar entrega: ${err.message}`
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancelar pedido
  const handleCancelOrder = async () => {
    setLoading(true);
    try {
      const token = localStorage.getItem("accessToken");
      if (!token) throw new Error("Token não encontrado.");

      const res = await fetch(
        `http://localhost:8000/api/v1/orders/${order.id}/update-status/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "C" }),
        }
      );

      if (!res.ok) {
        const text = await res.text();

        // Se for erro de tempo de cancelamento, mostrar modal personalizado
        if (res.status === 400 && text.includes("minute")) {
          showModal(
            "error",
            "Cancelamento não permitido",
            "Você só pode cancelar o pedido em até 1 minuto após a realização. Tempo limite excedido."
          );
          setShowCancelModal(false);
          return;
        }

        // Para outros erros, também mostrar modal
        showModal(
          "error",
          "Erro no cancelamento",
          `Erro ao cancelar pedido: ${text}`
        );
        setShowCancelModal(false);
        return;
      }

      // Sucesso - mostrar modal
      showModal(
        "success",
        "Pedido cancelado com sucesso!",
        "O valor do pedido foi reembolsado para seu saldo da carteira."
      );
      setShowCancelModal(false);
      // Após 2 segundos, recarregar a página
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } catch (err: any) {
      showModal(
        "error",
        "Erro no cancelamento",
        `Erro ao cancelar pedido: ${err.message}`
      );
      setShowCancelModal(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="order-card-client">
      <div className="order-card-client-head">
        <h1>
          {order.partner} - PEDIDO {order.id}
        </h1>
        <h1>{order.created_at}</h1>
      </div>

      <div className="order-card-client-head2">
        <StatusOrderClient status={statusForComponent} />
        <Button
          label={loading ? "Confirmando..." : "Confirmar entrega"}
          variant="primary"
          disabled={statusTranslated !== "saiu_pra_entrega" || loading}
          onClick={handleConfirmDelivery}
        />
      </div>

      <div className="order-card-client-itensbox">
        <div className="order-card-client-itensbox-columns">
          <div className="order-card-client-itensbox-column1">
            <p className="order-card-client-itensbox-title">Nome</p>
            {order.order_items.map((item) => (
              <p key={item.id} className="order-card-client-itensbox-subtitle">
                {item.menu_item_name}
              </p>
            ))}
          </div>

          <div className="order-card-client-itensbox-column2">
            <p className="order-card-client-itensbox-title">Quantidade</p>
            {order.order_items.map((item) => (
              <p key={item.id} className="order-card-client-itensbox-subtitle">
                x{item.quantity}
              </p>
            ))}
          </div>

          <div className="order-card-client-itensbox-column2">
            <p className="order-card-client-itensbox-title">Valor</p>
            {order.order_items.map((item) => {
              const totalItem = parseFloat(item.unit_price) * item.quantity;
              return (
                <p
                  key={item.id}
                  className="order-card-client-itensbox-subtitle"
                >
                  R$ {totalItem.toFixed(2)}
                </p>
              );
            })}
          </div>
        </div>

        <div className="order-card-client-itensbox-boxvalue">
          <div className="order-card-client-itensbox-value">
            <p className="order-card-client-itensbox-value-title">
              Valor total:
            </p>
            <p className="order-card-client-itensbox-value-subtitle">
              R$ {order.total_amount}
            </p>
          </div>
        </div>
      </div>

      <div className="order-card-client-boxdescription">
        <div className="order-card-client-boxdescription2">
          <h3>Local de entrega:</h3>
          <h2>{order.delivery_location.description}</h2>
        </div>

        <div className="order-card-client-boxdescription2">
          <h3>Observação:</h3>
          <h2>{order.details}</h2>
        </div>
      </div>

      <div className="order-card-client-buttonspace">
        <Button
          label="Cancelar pedido"
          variant="primary"
          disabled={statusTranslated !== "enviado" || loading}
          onClick={openCancelModal}
        />
      </div>

      {showCancelModal && (
        <ModalCancelOrder
          onClose={closeCancelModal}
          onConfirmCancel={handleCancelOrder}
          loading={loading}
        />
      )}

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

export default OrderCardClient;
