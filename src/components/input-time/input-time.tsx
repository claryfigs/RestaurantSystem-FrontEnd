import React from "react";
import "./input-time.css";

interface InputTimeProps {
  value: string;         // esperado: "HH:mm:ss.SSSZ"
  onChange: (value: string) => void;
  placeholder?: string;
}

/**
 * Converte "HH:mm:ss.SSSZ" para "HH:mm" para exibir no <input type="time">
 */
const formatToHHMM = (apiTime: string): string => {
  if (!apiTime) return '';
  return apiTime.substring(0, 5); // "20:48:53.336Z" -> "20:48"
};

/**
 * Converte "HH:mm" (do input) para "HH:mm:ss.SSSZ" para API
 */
const formatToAPITime = (hhmm: string): string => {
  const [hours, minutes] = hhmm.split(":");
  return `${hours.padStart(2, '0')}:${minutes.padStart(2, '0')}:00.000Z`;
};

const InputTime: React.FC<InputTimeProps> = ({ value, onChange, placeholder }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value; // "HH:mm"
    const apiTime = formatToAPITime(newValue); // "HH:mm:00.000Z"
    onChange(apiTime);
  };

  return (
    <input
      type="time"
      className="input-time"
      value={formatToHHMM(value)}
      onChange={handleChange}
      placeholder={placeholder}
    />
  );
};

export default InputTime;
