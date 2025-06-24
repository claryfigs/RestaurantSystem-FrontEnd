import React from 'react';
import './input-observation.css';

interface ObservationInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
}

const ObservationInput: React.FC<ObservationInputProps> = ({ value, onChange, placeholder }) => {
  return (
    <textarea
      className="input-observation"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default ObservationInput;
