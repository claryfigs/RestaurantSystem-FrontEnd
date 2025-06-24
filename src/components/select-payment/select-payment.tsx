import React, { useState } from 'react';
import './select-payment.css'; // crie esse arquivo

type SelectProps = {
  label?: string;
  onChange: (value: string) => void;
};

const SelectPayment: React.FC<SelectProps> = ({ label, onChange }) => {
  const [selectedValue, setSelectedValue] = useState('');

  const options = [
    { label: 'Pix', value: 'A' },
    { label: 'Boleto', value: 'B' },
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
        
        <option value="" disabled>Escolha um método</option>
        
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
