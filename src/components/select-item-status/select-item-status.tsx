import React, { useState } from 'react';
import './select-item-status.css'; // crie esse arquivo

type SelectItemStatusProps = {
  label?: string;
  onChange: (value: string) => void;
};

const SelecItemStatus: React.FC<SelectItemStatusProps> = ({ label, onChange }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const options = [
    { label: 'Disponível', value: 'A' },
    { label: 'Indisponível', value: 'B' },
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
        
        <option value="" disabled>Selecione</option>
        
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
