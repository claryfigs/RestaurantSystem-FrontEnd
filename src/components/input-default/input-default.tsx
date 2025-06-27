import React from 'react';
import './input-default.css';

interface InputDefaultProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
}

const InputDefault: React.FC<InputDefaultProps> = ({ value, onChange, placeholder }) => {
  return (
    <input
      type="text"
      className="input-default"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputDefault;
