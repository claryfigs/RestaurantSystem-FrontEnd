import React, { useState } from 'react';
import './select-item-status.css';

type SelectItemStatusProps = {
  label?: string;
  onChange: (value: string) => void;
};

const SelecItemStatus: React.FC<SelectItemStatusProps> = ({ label, onChange }) => {
  const [selectedValue, setSelectedValue] = useState('true');

  const options = [
    { label: 'Disponível', value: 'true' },
    { label: 'Indisponível', value: 'false' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <div className="select-container">
      {label && <label>{label}</label>}
      
      <select value={selectedValue} onChange={handleChange} className="custom-select">
        <option value="" disabled hidden>Selecione</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelecItemStatus;