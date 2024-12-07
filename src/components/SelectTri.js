import React from 'react';
import './SelectTri.css';



const SelectTri = ({ options, value, onChange }) => {
  return (
    <div className='select-wrapper'>
      <select 
        className='select'
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
