import React, { useEffect, useState } from 'react';
import './select-local.css';

type LocationOption = {
  id: number;
  description: string;
};

type SelectProps = {
  label?: string;
  onChange: (value: string) => void;
};

const SelectLocal: React.FC<SelectProps> = ({ label, onChange }) => {
  const [selectedValue, setSelectedValue] = useState('');
  const [options, setOptions] = useState<LocationOption[]>([]);

  useEffect(() => {
    const fetchLocations = async () => {
      try {
        const token = localStorage.getItem('accessToken');
        const response = await fetch('http://localhost:8000/api/v1/locations/', {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar localizações');
        }

        const data = await response.json();
        setOptions(data.results);
      } catch (error) {
        console.error('Erro ao carregar localizações:', error);
      }
    };

    fetchLocations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange(newValue); // envia o id da localização
  };

  return (
    <div className="select-container">
      {label && <label>{label}</label>}
      
      <select value={selectedValue} onChange={handleChange} className="custom-select">
        <option value="" disabled>Escolha um local</option>
        
        {options.map((option) => (
          <option key={option.id} value={option.id}>
            {option.description}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectLocal;
