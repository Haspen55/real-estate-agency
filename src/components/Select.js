import React from 'react';
import './Select.css';

const SelectTri = ({ options, value, onChange }) => {
  return (
    <div className='city-select-wrapper'>
      <select
        className="select"
        value={value || ''}
        onChange={(e) => onChange(e.target.value)}
      >
        {options.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default SelectTri;
