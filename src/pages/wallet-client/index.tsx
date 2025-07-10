import "./style.css";
import { useState, useEffect } from "react";
// import axios from "axios";
import NavbarClient from "../../components/navbar-client/navbar-client";
import SelectPayment from "../../components/select-payment/select-payment";
import MoneyInput from "../../components/input-money/input-money";
import Button from "../../components/Button/Button";

function WalletClient() {
  const [value, setValue] = useState("00,00"); // valor do input
  const [paymentMethod, setPaymentMethod] = useState("");
  const [balance, setBalance] = useState(0); // será carregado da API
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [userId, setUserId] = useState<number | null>(null); // ID do usuário autenticado

  // Buscar saldo atual do usuário na inicialização
  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const baseUrl = "http://localhost:8000";
        const response = await fetch(`${baseUrl}/api/v1/my-data/`, {
          headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
          },
        });

        if (!response.ok) {
          throw new Error("Erro ao carregar dados do usuário");
        }

        const userData = await response.json();
        if (userData && userData.balance !== undefined) {
          setBalance(userData.balance);
        }
        if (userData && userData.id) {
          setUserId(userData.id);
        }
      } catch (err: any) {
        console.error("Erro ao carregar saldo:", err);
        // Mantém o valor padrão se não conseguir carregar
      }
    };

    fetchBalance();
  }, []);

  const handleSelectChange = (val: string) => {
    setPaymentMethod(val);
    setError("");
    setSuccess("");
  };

  // Converte string tipo "12,34" para float 12.34
  const parseMoney = (str: string) => {
    return parseFloat(str.replace(/\./g, "").replace(",", "."));
  };

  const handleAddCredits = async () => {
    setError("");
    setSuccess("");
    const amount = parseMoney(value);
    if (isNaN(amount) || amount < 5) {
      setError("O valor mínimo para adicionar é R$ 5,00.");
      return;
    }
    if (!["C", "B", "P"].includes(paymentMethod)) {
      setError("Selecione um método de pagamento válido.");
      return;
    }
    if (!userId) {
      setError("Usuário não identificado. Faça login novamente.");
      return;
    }
    setLoading(true);
    try {
      // Busca token se necessário (ajuste conforme sua autenticação)
      const token = localStorage.getItem("accessToken");
      const baseUrl = "http://localhost:8000";
      const response = await fetch(
        `${baseUrl}/api/v1/customers/${userId}/add-credits/`,
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
      const data = await response.json();
      if (data && data.balance !== undefined) {
        setBalance(data.balance);
      } else {
        setBalance((prev) => prev + amount);
      }
      setSuccess("Saldo adicionado com sucesso!");
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
            R$ {balance.toFixed(2).replace(".", ",")}
          </span>
        </div>

        <h1>Adicionar saldo:</h1>
        <h2>Escolha um método para adicionar saldo na carteira.</h2>

        <div className="wallet-client-space">
          <SelectPayment onChange={handleSelectChange} />
        </div>
        <div style={{ margin: "8px 0" }}>
          <small>Métodos: Crédito (C), Boleto (B), Pix (P)</small>
        </div>

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
        {success && (
          <div style={{ color: "green", marginTop: 10 }}>{success}</div>
        )}
      </div>
    </div>
  );
}

export default WalletClient;
