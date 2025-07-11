import React, { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

interface BalanceContextType {
  balance: number;
  setBalance: (balance: number) => void;
  refreshBalance: () => Promise<void>;
}

const BalanceContext = createContext<BalanceContextType | undefined>(undefined);

export const useBalance = () => {
  const context = useContext(BalanceContext);
  if (!context) {
    throw new Error("useBalance must be used within a BalanceProvider");
  }
  return context;
};

interface BalanceProviderProps {
  children: ReactNode;
}

export const BalanceProvider: React.FC<BalanceProviderProps> = ({
  children,
}) => {
  const [balance, setBalance] = useState(0);

  const refreshBalance = async () => {
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
    } catch (err: any) {
      console.error("Erro ao carregar saldo:", err);
    }
  };

  useEffect(() => {
    refreshBalance();
  }, []);

  return (
    <BalanceContext.Provider value={{ balance, setBalance, refreshBalance }}>
      {children}
    </BalanceContext.Provider>
  );
};
