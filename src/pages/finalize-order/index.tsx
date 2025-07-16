import "./style.css";
import { useState, useEffect } from "react";
import NavbarClient from "../../components/navbar-client/navbar-client";
import FinalizeOrderTable from "../../components/finalize-order-table/finalize-order-table";
import SelectLocal from "../../components/select-local/select-local";
import ButtonMap from "../../components/button-map/button-map";
import ObservationInput from "../../components/input-observation/input-observation";
import Button from "../../components/Button/Button";
import ModalAlert from "../../components/modal-alert/modal-alert";
import { useNavigate } from "react-router-dom";

function FinalizeOrder() {
  const [selectedLocationId, setSelectedLocationId] = useState<string>("");
  const [observation, setObservation] = useState("");
  const [creditBalance, setCreditBalance] = useState<string>("0.00");
  const [totalOrder, setTotalOrder] = useState<string>("0.00");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"success" | "error">("success");
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
    if (modalType === "success") {
      navigate("/track-order-client");
    }
  };

  const customerId = localStorage.getItem("userId") || "";
  const baseUrl = "http://localhost:8000";

  // Busca saldo do cliente
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `${baseUrl}/api/v1/customers/${customerId}/`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (!response.ok) {
          throw new Error("Erro ao buscar dados do cliente");
        }

        const data = await response.json();
        setCreditBalance(data.credit_balance);
      } catch (error) {
        console.error("Erro:", error);
      }
    };

    if (customerId) {
      fetchCustomerData();
    }
  }, [customerId, baseUrl]);

  // Calcula total do carrinho
  useEffect(() => {
    function calculateTotal() {
      const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");
      const sum = storedCart.reduce(
        (acc: number, item: any) => acc + parseFloat(item.price),
        0
      );
      setTotalOrder(sum.toFixed(2));
    }

    calculateTotal();

    window.addEventListener("cartUpdated", calculateTotal);
    return () => window.removeEventListener("cartUpdated", calculateTotal);
  }, []);

  const handleSelectChange = (value: string) => {
    console.log("Selecionado:", value);
    setSelectedLocationId(value);
  };

  const handleConfirmOrder = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);

    try {
      const storedCart = JSON.parse(localStorage.getItem("cartItems") || "[]");

      if (storedCart.length === 0) {
        showModal(
          "error",
          "Carrinho vazio",
          "Seu carrinho está vazio. Adicione itens antes de confirmar o pedido."
        );
        return;
      }

      // Verifica se todos os profileId são iguais
      const firstProfileId = storedCart[0].profileId;
      const allSameProfile = storedCart.every(
        (item: any) => item.profileId === firstProfileId
      );

      if (!allSameProfile) {
        showModal(
          "error",
          "Pedido inválido",
          "Não é possível fazer pedidos de restaurantes diferentes. Mantenha apenas itens do mesmo restaurante."
        );
        return;
      }

      // Verifica saldo
      const saldo = parseFloat(creditBalance);
      const pedido = parseFloat(totalOrder);

      if (pedido > saldo) {
        showModal(
          "error",
          "Saldo insuficiente",
          "Você não possui saldo suficiente para realizar este pedido. Adicione créditos à sua carteira."
        );
        return;
      }

      // Verifica local de entrega
      if (!selectedLocationId) {
        showModal(
          "error",
          "Local não selecionado",
          "Selecione um local de entrega para prosseguir com o pedido."
        );
        return;
      }

      // Monta order_items
      const order_items = storedCart.map((item: any) => ({
        menu_item: item.itemId,
        quantity: item.quantity,
      }));

      // Monta corpo do pedido
      const token = localStorage.getItem("accessToken");
      const requestBody = {
        delivery_location: Number(selectedLocationId),
        order_items,
        partner: Number(firstProfileId),
        customer: Number(customerId),
        details: observation,
      };

      console.log("Enviando pedido:", requestBody);

      const response = await fetch(`${baseUrl}/api/v1/orders/`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error("Erro na API:", errorData);
        showModal(
          "error",
          "Erro ao enviar pedido",
          "Erro ao enviar pedido. Verifique os dados e tente novamente."
        );
        return;
      }

      // Sucesso!
      showModal(
        "success",
        "Pedido confirmado com sucesso!",
        "Seu pedido foi enviado para o restaurante. Você pode acompanhar o status na página de pedidos."
      );
      localStorage.removeItem("cartItems");
    } catch (error) {
      console.error("Erro ao enviar pedido:", error);
      showModal(
        "error",
        "Erro ao enviar pedido",
        "Erro ao enviar pedido. Tente novamente mais tarde."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div>
      <NavbarClient />
      <div className="finalize-order">
        <h1>Seu pedido</h1>
        <h2>Itens adicionados no seu carrinho:</h2>

        <FinalizeOrderTable />

        <div className="finalize-order-balance-box">
          <h1>Seu saldo:</h1>
          <p className="finalize-order-balance">R$ {creditBalance}</p>
        </div>

        {/* <h2>Valor total do pedido:</h2>
        <p style={{ fontWeight: 'bold', fontSize: '1.5rem' }}>R$ {totalOrder}</p> */}

        <h2>
          • Ao finalizar a compra, o valor do pedido será descontado do saldo.
        </h2>
        <h2>• Você poderá cancelar o pedido e ser reembolsado em até 3min.</h2>

        <h1>Selecione o local de entrega:</h1>
        <h2>
          Use o mapa para selecionar em qual local da UECE você gostaria de
          receber o pedido:
        </h2>

        <div className="finalize-order-buttons">
          <SelectLocal onChange={handleSelectChange} />
          <ButtonMap />
        </div>

        <h2>Detalhes:</h2>
        <div className="finalize-order-inputspace">
          <ObservationInput
            value={observation}
            onChange={(e) => setObservation(e.target.value)}
            placeholder="Digite seu detalhe"
          />
        </div>

        <div className="finalize-order-buttonspace">
          <Button
            label={isSubmitting ? "Enviando..." : "Confirmar pedido"}
            variant="secondary"
            onClick={handleConfirmOrder}
            disabled={isSubmitting}
          />
        </div>
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

export default FinalizeOrder;
