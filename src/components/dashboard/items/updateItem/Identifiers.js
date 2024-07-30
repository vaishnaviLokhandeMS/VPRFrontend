import React, { useState } from 'react';
import './Identifiers.css';

const Identifiers = () => {
  const [formData, setFormData] = useState({
    category: '',
    sku: '',
    barcode: '',
    serialNumber: '',
    batchNumber: '',
    modelNumber: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="box">
      <h2>Identifiers</h2>
      <p className="info-text">Fill in the identifiers for the item.</p>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="category">Category</label>
          <input
            type="text"
            id="category"
            name="category"
            placeholder="Enter category"
            value={formData.category}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="sku">SKU</label>
          <input
            type="text"
            id="sku"
            name="sku"
            placeholder="Enter SKU"
            value={formData.sku}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="barcode">Barcode/UPC</label>
          <input
            type="text"
            id="barcode"
            name="barcode"
            placeholder="Enter barcode or UPC"
            value={formData.barcode}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="serialNumber">Serial Number</label>
          <input
            type="text"
            id="serialNumber"
            name="serialNumber"
            placeholder="Enter serial number"
            value={formData.serialNumber}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="batchNumber">Batch Number</label>
          <input
            type="text"
            id="batchNumber"
            name="batchNumber"
            placeholder="Enter batch number"
            value={formData.batchNumber}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="modelNumber">Model Number</label>
          <input
            type="text"
            id="modelNumber"
            name="modelNumber"
            placeholder="Enter model number"
            value={formData.modelNumber}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
    </div>
  );
};

export default Identifiers;
