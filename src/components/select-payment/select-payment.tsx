import React, { useState, useEffect } from "react";
import "./select-payment.css"; // crie esse arquivo

type SelectProps = {
  label?: string;
  onChange: (value: string) => void;
  value?: string;
};

const SelectPayment: React.FC<SelectProps> = ({ label, onChange, value }) => {
  const [selectedValue, setSelectedValue] = useState(value || "");

  useEffect(() => {
    setSelectedValue(value || "");
  }, [value]);

  const options = [
    { label: "Crédito", value: "C" },
    { label: "Boleto", value: "B" },
    { label: "Pix", value: "P" },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="select-container">
      {label && <label>{label}</label>}

      <select
        value={selectedValue}
        onChange={handleChange}
        className="custom-select"
      >
        <option value="" disabled>
          Escolha um método
        </option>

        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectPayment;
