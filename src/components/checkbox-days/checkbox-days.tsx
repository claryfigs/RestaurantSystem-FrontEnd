import React from 'react';
import './checkbox-days.css';

type CheckboxDaysProps = {
  value: string[];
  onChange: (value: string[]) => void;
};

const days = [
  { label: 'Seg', value: 'MON' },
  { label: 'Ter', value: 'TUE' },
  { label: 'Qua', value: 'WED' },
  { label: 'Qui', value: 'THU' },
  { label: 'Sex', value: 'FRI' },
  { label: 'Sáb', value: 'SAT' },
];

const CheckboxDays: React.FC<CheckboxDaysProps> = ({ value, onChange }) => {
  const handleCheckboxChange = (dayValue: string) => {
    const newSelected = value.includes(dayValue)
      ? value.filter((day) => day !== dayValue)
      : [...value, dayValue];

    onChange(newSelected);
  };

  return (
    <div className="checkbox-days">
      {days.map((day) => (
        <label key={day.value} className="checkbox-day">
          <input
            type="checkbox"
            value={day.value}
            checked={value.includes(day.value)}
            onChange={() => handleCheckboxChange(day.value)}
          />
          {day.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxDays;
