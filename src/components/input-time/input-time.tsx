import React from "react";
import "./input-time.css";

interface InputTimeProps {
  value: string; // formato: "15:09:09.413Z"
  onChange: (value: string) => void; // também retorna nesse formato
  placeholder?: string;
}

const formatToHHMM = (isoTime: string): string => {
  const date = new Date(isoTime);
  return date.toISOString().substring(11, 16); // pega "HH:mm"
};

const formatToISOString = (hhmm: string): string => {
  const [hours, minutes] = hhmm.split(":");
  const now = new Date();
  now.setUTCHours(Number(hours), Number(minutes), 0, 0);
  return now.toISOString(); // retorna em formato ISO (com Z no final)
};

const InputTime: React.FC<InputTimeProps> = ({ value, onChange, placeholder }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const isoString = formatToISOString(newValue);
    onChange(isoString);
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
