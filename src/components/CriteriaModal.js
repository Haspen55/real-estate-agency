import React, { useState } from 'react';
import Modal from 'react-modal';
import { Range } from 'react-range';

const CriteriaModal = ({ isOpen, onRequestClose, onApply }) => {
  const [selectedOptions, setSelectedOptions] = useState({
    piscine: false,
    parking: false,
    jardin: false,
  });

  const [surfaceRange, setSurfaceRange] = useState([50, 200]);

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setSelectedOptions((prevOptions) => ({
      ...prevOptions,
      [name]: checked,
    }));
  };

  const handleApply = () => {
    onApply(selectedOptions, surfaceRange);
    onRequestClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Criteria Modal"
      style={{
        content: {
          width: '80%',
          maxWidth: '600px',
          height: 'auto',
          maxHeight: '20vh',
          top: '50%',
          left: '50%',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          padding: '30px',
          borderRadius: '10px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3)',
          overflowY: 'auto',
        }
      }}
    >
      <h2>Select Criteria</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', }}>
        <label>
          <input
            type="checkbox"
            name="piscine"
            checked={selectedOptions.piscine}
            onChange={handleCheckboxChange}
          />
          Piscine
        </label>
        <label>
          <input
            type="checkbox"
            name="parking"
            checked={selectedOptions.parking}
            onChange={handleCheckboxChange}
          />
          Parking
        </label>
        <label>
          <input
            type="checkbox"
            name="jardin"
            checked={selectedOptions.jardin}
            onChange={handleCheckboxChange}
          />
          Jardin
        </label>
      </div>
      <div style={{ marginTop: '20px' }}>
        <h3>Surface Range (m²)</h3>
        <Range
          step={1}
          min={0}
          max={500}
          values={surfaceRange}
          onChange={(values) => setSurfaceRange(values)}
          renderTrack={({ props, children }) => (
            <div {...props} style={{ height: '6px', background: '#ddd', width: '100%' }}>
              {children}
            </div>
          )}
          renderThumb={({ props }) => (
            <div {...props} style={{ height: '24px', width: '24px', background: '#999' }} />
          )}
        />
        <div>Min: {surfaceRange[0]} m² - Max: {surfaceRange[1]} m²</div>
      </div>
      <button onClick={handleApply}>Apply</button>
    </Modal>
  );
};

export default CriteriaModal;
