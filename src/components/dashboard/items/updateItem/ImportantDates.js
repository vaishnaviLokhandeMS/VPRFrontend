import React, { useState } from 'react';
import './ImportantDates.css';

const ImportantDates = () => {
  const [formData, setFormData] = useState({
    createTime: '',
    lastModified: '',
    manufacturedOn: '',
    manufacturingDate: '',
    expiryDate: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <div className="box">
      <h2>Important Dates</h2>
      <p className="info-text">Fill in the relevant dates for the item.</p>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="createTime">Create Time</label>
          <input
            type="datetime-local"
            id="createTime"
            name="createTime"
            placeholder="Enter create time"
            value={formData.createTime}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastModified">Last Modified</label>
          <input
            type="datetime-local"
            id="lastModified"
            name="lastModified"
            placeholder="Enter last modified time"
            value={formData.lastModified}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="manufacturingDate">Manufacturing Date</label>
          <input
            type="date"
            id="manufacturingDate"
            name="manufacturingDate"
            placeholder="Enter manufacturing date"
            value={formData.manufacturingDate}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="date"
            id="expiryDate"
            name="expiryDate"
            placeholder="Enter expiry date"
            value={formData.expiryDate}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="manufacturedOn">Manufactured On</label>
          <input
            type="date"
            id="manufacturedOn"
            name="manufacturedOn"
            placeholder="Enter manufactured date"
            value={formData.manufacturedOn}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
    </div>
  );
};

export default ImportantDates;
