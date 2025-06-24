import React from 'react';
import './input-money.css';

type MoneyInputProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

const MoneyInput: React.FC<MoneyInputProps> = ({ value, onChange, placeholder }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let rawValue = e.target.value;

    // Remove tudo que não for número
    rawValue = rawValue.replace(/\D/g, '');

    // Garante pelo menos 3 dígitos para fazer a conversão correta
    if (rawValue.length < 3) {
      rawValue = rawValue.padStart(3, '0');
    }

    const numericValue = (parseInt(rawValue, 10) / 100).toFixed(2);
    const formattedValue = numericValue.replace('.', ',');

    onChange(formattedValue);
  };

  return (
    <input
      type="text"
      inputMode="numeric"
      className="input-money"
      value={value}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default MoneyInput;
