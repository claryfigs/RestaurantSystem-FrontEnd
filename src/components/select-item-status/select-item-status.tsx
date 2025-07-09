import React from 'react';
import './select-item-status.css';

type SelectItemStatusProps = {
  label?: string;
  value: string;
  onChange: (value: string) => void;
};

const SelecItemStatus: React.FC<SelectItemStatusProps> = ({ label, value, onChange }) => {
  const options = [
    { label: 'Disponível', value: 'true' },
    { label: 'Indisponível', value: 'false' },
  ];

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };

  return (
    <div className="select-container">
      {label && <label>{label}</label>}
      
      <select value={value} onChange={handleChange} className="custom-select">
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
