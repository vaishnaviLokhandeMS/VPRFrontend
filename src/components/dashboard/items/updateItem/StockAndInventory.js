import React, { useState } from 'react';
import './StockAndInventory.css';

const StockAndInventory = () => {
  const [formData, setFormData] = useState({
    stock: '',
    stockUnit: '',
    minStockQty: '',
    minStockQtyUnit: '',
    storageLocation: '',
    rack: '',
    drawer: '',
    shelfLife: '',
    temperature: '',
    temperatureUnit: '',
    minTemperature: '',
    minTemperatureUnit: '',
    maxTemperature: '',
    maxTemperatureUnit: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="box">
      <h2>Stock and Inventory</h2>
      <p className="info-text">Fill in the stock and inventory details. Choose the appropriate units where applicable.</p>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="stock">Stock</label>
          <input
            type="text"
            id="stock"
            name="stock"
            placeholder="Enter stock"
            value={formData.stock}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="stockUnit">Stock Unit</label>
          <select
            id="stockUnit"
            name="stockUnit"
            value={formData.stockUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.stock ? 'disabled-select' : ''}`}
            disabled={!formData.stock}
          >
            <option value="">Select Unit</option>
            <option value="pcs">Pieces (pcs)</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="L">Liters (L)</option>
            <option value="mL">Milliliters (mL)</option>
            <option value="m">Meters (m)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="in">Inches (in)</option>
            <option value="ft">Feet (ft)</option>
            <option value="yd">Yards (yd)</option>
            <option value="lb">Pounds (lb)</option>
            <option value="oz">Ounces (oz)</option>
            <option value="t">Tons (t)</option>
            <option value="gal">Gallons (gal)</option>
            <option value="qt">Quarts (qt)</option>
            <option value="pt">Pints (pt)</option>
            <option value="box">Boxes (box)</option>
            <option value="doz">Dozens (doz)</option>
            <option value="pkt">Packets (pkt)</option>
            <option value="bag">Bags (bag)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="minStockQty">Minimum Stock Quantity</label>
          <input
            type="text"
            id="minStockQty"
            name="minStockQty"
            placeholder="Enter minimum stock quantity"
            value={formData.minStockQty}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="minStockQtyUnit">Minimum Stock Quantity Unit</label>
          <select
            id="minStockQtyUnit"
            name="minStockQtyUnit"
            value={formData.minStockQtyUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.minStockQty ? 'disabled-select' : ''}`}
            disabled={!formData.minStockQty}
          >
            <option value="">Select Unit</option>
            <option value="pcs">Pieces (pcs)</option>
            <option value="kg">Kilograms (kg)</option>
            <option value="g">Grams (g)</option>
            <option value="L">Liters (L)</option>
            <option value="mL">Milliliters (mL)</option>
            <option value="m">Meters (m)</option>
            <option value="cm">Centimeters (cm)</option>
            <option value="in">Inches (in)</option>
            <option value="ft">Feet (ft)</option>
            <option value="yd">Yards (yd)</option>
            <option value="lb">Pounds (lb)</option>
            <option value="oz">Ounces (oz)</option>
            <option value="t">Tons (t)</option>
            <option value="gal">Gallons (gal)</option>
            <option value="qt">Quarts (qt)</option>
            <option value="pt">Pints (pt)</option>
            <option value="box">Boxes (box)</option>
            <option value="doz">Dozens (doz)</option>
            <option value="pkt">Packets (pkt)</option>
            <option value="bag">Bags (bag)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="storageLocation">Storage Location</label>
          <input
            type="text"
            id="storageLocation"
            name="storageLocation"
            placeholder="Enter storage location"
            value={formData.storageLocation}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="rack">Rack</label>
          <input
            type="text"
            id="rack"
            name="rack"
            placeholder="Enter rack"
            value={formData.rack}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="drawer">Drawer</label>
          <input
            type="text"
            id="drawer"
            name="drawer"
            placeholder="Enter drawer"
            value={formData.drawer}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="shelfLife">Shelf Life</label>
          <input
            type="text"
            id="shelfLife"
            name="shelfLife"
            placeholder="Enter shelf life in Months"
            value={formData.shelfLife}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="temperature">Temperature</label>
          <input
            type="text"
            id="temperature"
            name="temperature"
            placeholder="Enter temperature"
            value={formData.temperature}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="temperatureUnit">Temperature Unit</label>
          <select
            id="temperatureUnit"
            name="temperatureUnit"
            value={formData.temperatureUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.temperature ? 'disabled-select' : ''}`}
            disabled={!formData.temperature}
          >
            <option value="">Select Unit</option>
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="minTemperature">Minimum Temperature</label>
          <input
            type="text"
            id="minTemperature"
            name="minTemperature"
            placeholder="Enter minimum temperature"
            value={formData.minTemperature}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="minTemperatureUnit">Minimum Temperature Unit</label>
          <select
            id="minTemperatureUnit"
            name="minTemperatureUnit"
            value={formData.minTemperatureUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.minTemperature ? 'disabled-select' : ''}`}
            disabled={!formData.minTemperature}
          >
            <option value="">Select Unit</option>
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="maxTemperature">Maximum Temperature</label>
          <input
            type="text"
            id="maxTemperature"
            name="maxTemperature"
            placeholder="Enter maximum temperature"
            value={formData.maxTemperature}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="maxTemperatureUnit">Maximum Temperature Unit</label>
          <select
            id="maxTemperatureUnit"
            name="maxTemperatureUnit"
            value={formData.maxTemperatureUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.maxTemperature ? 'disabled-select' : ''}`}
            disabled={!formData.maxTemperature}
          >
            <option value="">Select Unit</option>
            <option value="C">Celsius (°C)</option>
            <option value="F">Fahrenheit (°F)</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default StockAndInventory;
