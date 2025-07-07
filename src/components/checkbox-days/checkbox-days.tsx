import React, { useState } from 'react';
import './checkbox-days.css';

const days = [
  { label: 'Seg', value: 'MON' },
  { label: 'Ter', value: 'TUE' },
  { label: 'Qua', value: 'WED' },
  { label: 'Qui', value: 'THU' },
  { label: 'Sex', value: 'FRI' },
  { label: 'Sáb', value: 'SAT' },
];

const CheckboxDays: React.FC = () => {
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const handleCheckboxChange = (value: string) => {
    setSelectedDays((prevSelected) =>
      prevSelected.includes(value)
        ? prevSelected.filter((day) => day !== value)
        : [...prevSelected, value]
    );
  };

  return (
    <div className="checkbox-days">
      {days.map((day) => (
        <label key={day.value} className="checkbox-day">
          <input
            type="checkbox"
            value={day.value}
            checked={selectedDays.includes(day.value)}
            onChange={() => handleCheckboxChange(day.value)}
          />
          {day.label}
        </label>
      ))}
    </div>
  );
};

export default CheckboxDays;
