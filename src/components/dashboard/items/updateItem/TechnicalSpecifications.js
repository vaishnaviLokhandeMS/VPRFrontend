import React, { useState } from 'react';
import './TechnicalSpecifications.css';

const TechnicalSpecifications = () => {
  const [formData, setFormData] = useState({
    power: '',
    powerUnit: '',
    voltage: '',
    voltageUnit: '',
    current: '',
    currentUnit: '',
    capacity: '',
    capacityUnit: '',
    supply: '',
    powerFactor: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="box">
      <h2>Technical Specifications</h2>
      <p className="info-text">Fill in the technical specifications details. Choose the appropriate units where applicable.</p>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="power">Power</label>
          <input
            type="text"
            id="power"
            name="power"
            placeholder="Enter power"
            value={formData.power}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="powerUnit">Power Unit</label>
          <select
            id="powerUnit"
            name="powerUnit"
            value={formData.powerUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.power ? 'disabled-select' : ''}`}
            disabled={!formData.power}
          >
            <option value="">Select Unit</option>
            <option value="W">Watts (W)</option>
            <option value="kW">Kilowatts (kW)</option>
            <option value="MW">Megawatts (MW)</option>
            <option value="GW">Gigawatts (GW)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="voltage">Voltage</label>
          <input
            type="text"
            id="voltage"
            name="voltage"
            placeholder="Enter voltage"
            value={formData.voltage}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="voltageUnit">Voltage Unit</label>
          <select
            id="voltageUnit"
            name="voltageUnit"
            value={formData.voltageUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.voltage ? 'disabled-select' : ''}`}
            disabled={!formData.voltage}
          >
            <option value="">Select Unit</option>
            <option value="V">Volts (V)</option>
            <option value="kV">Kilovolts (kV)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="current">Current</label>
          <input
            type="text"
            id="current"
            name="current"
            placeholder="Enter current"
            value={formData.current}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="currentUnit">Current Unit</label>
          <select
            id="currentUnit"
            name="currentUnit"
            value={formData.currentUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.current ? 'disabled-select' : ''}`}
            disabled={!formData.current}
          >
            <option value="">Select Unit</option>
            <option value="A">Amperes (A)</option>
            <option value="mA">Milliamperes (mA)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="capacity">Capacity</label>
          <input
            type="text"
            id="capacity"
            name="capacity"
            placeholder="Enter capacity"
            value={formData.capacity}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="capacityUnit">Capacity Unit</label>
          <select
            id="capacityUnit"
            name="capacityUnit"
            value={formData.capacityUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.capacity ? 'disabled-select' : ''}`}
            disabled={!formData.capacity}
          >
            <option value="">Select Unit</option>
            <option value="Ah">Ampere-hours (Ah)</option>
            <option value="mAh">Milliampere-hours (mAh)</option>
            <option value="Wh">Watt-hours (Wh)</option>
            <option value="kWh">Kilowatt-hours (kWh)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="supply">Supply</label>
          <select
            id="supply"
            name="supply"
            value={formData.supply}
            onChange={handleInputChange}
            className="animated-input"
          >
            <option value="">Select Supply</option>
            <option value="AC">AC</option>
            <option value="DC">DC</option>
          </select>
        </div>
        <div className="form-group">
          <label htmlFor="powerFactor">Power Factor</label>
          <input
            type="text"
            id="powerFactor"
            name="powerFactor"
            placeholder="Enter power factor"
            value={formData.powerFactor}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
    </div>
  );
};

export default TechnicalSpecifications;
