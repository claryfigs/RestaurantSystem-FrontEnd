import React from "react";
import "./input-default.css";

interface InputDefaultProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
}

const InputDefault: React.FC<InputDefaultProps> = ({
  value,
  onChange,
  placeholder,
  type = "text",
}) => {
  return (
    <input
      type={type}
      className="input-default"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputDefault;
