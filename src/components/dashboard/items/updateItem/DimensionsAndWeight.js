import React, { useState } from 'react';
import './DimensionsAndWeight.css';

const DimensionsAndWeight = () => {
  const [formData, setFormData] = useState({
    weight: '',
    weightUnit: '',
    volume: '',
    volumeUnit: '',
    size: '',
    efficiency: '',
    length: '',
    lengthUnit: '',
    width: '',
    widthUnit: '',
    height: '',
    heightUnit: '',
    diameter: '',
    radius: '',
    diameterUnit: '',
    radiusUnit: '',
    type: '',
    ram: '',
    storage: '',
    storageUnit: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedFormData = { ...formData, [name]: value };

    if (name === 'diameter') {
      updatedFormData.radius = (value / 2).toFixed(2);
    } else if (name === 'radius') {
      updatedFormData.diameter = (value * 2).toFixed(2);
    }

    if (name === 'diameterUnit') {
      updatedFormData.radiusUnit = value;
    } else if (name === 'radiusUnit') {
      updatedFormData.diameterUnit = value;
    }

    setFormData(updatedFormData);
  };

  return (
    <div className="box">
      <h2>Dimensions and Weight</h2>
      <p className="info-text">Fill in the dimensions and weight details. Choose the appropriate units where applicable.</p>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="weight">Weight</label>
          <input
            type="text"
            id="weight"
            name="weight"
            placeholder="Enter weight"
            value={formData.weight}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="weightUnit">Weight Unit</label>
          <select
            id="weightUnit"
            name="weightUnit"
            value={formData.weightUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.weight ? 'disabled-select' : ''}`}
            disabled={!formData.weight}
          >
            <option value="">Select Unit</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="lb">Pounds (lb)</option>
            <option value="oz">Ounces (oz)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="volume">Volume</label>
          <input
            type="text"
            id="volume"
            name="volume"
            placeholder="Enter volume"
            value={formData.volume}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="volumeUnit">Volume Unit</label>
          <select
            id="volumeUnit"
            name="volumeUnit"
            value={formData.volumeUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.volume ? 'disabled-select' : ''}`}
            disabled={!formData.volume}
          >
            <option value="">Select Unit</option>
            <option value="L">Liters (L)</option>
            <option value="mL">Milliliters (mL)</option>
            <option value="gal">Gallons (gal)</option>
            <option value="qt">Quarts (qt)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="size">Size</label>
          <input
            type="text"
            id="size"
            name="size"
            placeholder="Enter size"
            value={formData.size}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="efficiency">Efficiency</label>
          <input
            type="text"
            id="efficiency"
            name="efficiency"
            placeholder="Enter efficiency"
            value={formData.efficiency}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="length">Length</label>
          <input
            type="text"
            id="length"
            name="length"
            placeholder="Enter length"
            value={formData.length}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lengthUnit">Length Unit</label>
          <select
            id="lengthUnit"
            name="lengthUnit"
            value={formData.lengthUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.length ? 'disabled-select' : ''}`}
            disabled={!formData.length}
          >
            <option value="">Select Unit</option>
            <option value="m">Meters (m)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="in">Inches (in)</option>
            <option value="ft">Feet (ft)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="width">Width</label>
          <input
            type="text"
            id="width"
            name="width"
            placeholder="Enter width"
            value={formData.width}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="widthUnit">Width Unit</label>
          <select
            id="widthUnit"
            name="widthUnit"
            value={formData.widthUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.width ? 'disabled-select' : ''}`}
            disabled={!formData.width}
          >
            <option value="">Select Unit</option>
            <option value="m">Meters (m)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="in">Inches (in)</option>
            <option value="ft">Feet (ft)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="height">Height</label>
          <input
            type="text"
            id="height"
            name="height"
            placeholder="Enter height"
            value={formData.height}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="heightUnit">Height Unit</label>
          <select
            id="heightUnit"
            name="heightUnit"
            value={formData.heightUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.height ? 'disabled-select' : ''}`}
            disabled={!formData.height}
          >
            <option value="">Select Unit</option>
            <option value="m">Meters (m)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="in">Inches (in)</option>
            <option value="ft">Feet (ft)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="diameter">Diameter</label>
          <input
            type="text"
            id="diameter"
            name="diameter"
            placeholder="Enter diameter"
            value={formData.diameter}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="diameterUnit">Diameter Unit</label>
          <select
            id="diameterUnit"
            name="diameterUnit"
            value={formData.diameterUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.diameter ? 'disabled-select' : ''}`}
            disabled={!formData.diameter}
          >
            <option value="">Select Unit</option>
            <option value="m">Meters (m)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="in">Inches (in)</option>
            <option value="ft">Feet (ft)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="radius">Radius</label>
          <input
            type="text"
            id="radius"
            name="radius"
            placeholder="Enter radius"
            value={formData.radius}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="radiusUnit">Radius Unit</label>
          <select
            id="radiusUnit"
            name="radiusUnit"
            value={formData.radiusUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.radius ? 'disabled-select' : ''}`}
            disabled={!formData.radius}
          >
            <option value="">Select Unit</option>
            <option value="m">Meters (m)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="in">Inches (in)</option>
            <option value="ft">Feet (ft)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="type">Type</label>
          <input
            type="text"
            id="type"
            name="type"
            placeholder="Enter type"
            value={formData.type}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="ram">RAM</label>
          <input
            type="text"
            id="ram"
            name="ram"
            placeholder="Enter RAM"
            value={formData.ram}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="storage">Storage</label>
          <input
            type="text"
            id="storage"
            name="storage"
            placeholder="Enter storage"
            value={formData.storage}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="storageUnit">Storage Unit</label>
          <select
            id="storageUnit"
            name="storageUnit"
            value={formData.storageUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.storage ? 'disabled-select' : ''}`}
            disabled={!formData.storage}
          >
            <option value="">Select Unit</option>
            <option value="GB">Gigabytes (GB)</option>
            <option value="TB">Terabytes (TB)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default DimensionsAndWeight;
