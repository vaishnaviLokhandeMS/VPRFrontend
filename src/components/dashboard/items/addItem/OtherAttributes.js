import React from 'react';
import './OtherAttributes.css';

const OtherAttributes = ({ formData, onChange }) => {
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onChange({ target: { name, value } });
  };

  return (
    <div className="box">
      <h2>Other Attributes</h2>
      <p className="info-text">Fill in the additional attributes. Choose the appropriate units where applicable.</p>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="warranty">Warranty</label>
          <input
            type="text"
            id="warranty"
            name="warranty"
            placeholder="Enter warranty period"
            value={formData.warranty}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="warrantyUnit">Warranty Unit</label>
          <select
            id="warrantyUnit"
            name="warrantyUnit"
            value={formData.warrantyUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.warranty ? 'disabled-select' : ''}`}
            disabled={!formData.warranty}
          >
            <option value="">Select Unit</option>
            <option value="days">Days</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="guarantee">Guarantee</label>
          <input
            type="text"
            id="guarantee"
            name="guarantee"
            placeholder="Enter guarantee period"
            value={formData.guarantee}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="guaranteeUnit">Guarantee Unit</label>
          <select
            id="guaranteeUnit"
            name="guaranteeUnit"
            value={formData.guaranteeUnit}
            onChange={handleInputChange}
            className={`animated-input ${!formData.guarantee ? 'disabled-select' : ''}`}
            disabled={!formData.guarantee}
          >
            <option value="">Select Unit</option>
            <option value="days">Days</option>
            <option value="months">Months</option>
            <option value="years">Years</option>
          </select>
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="location">Location</label>
          <input
            type="text"
            id="location"
            name="location"
            placeholder="Enter location"
            value={formData.location}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="material">Material</label>
          <input
            type="text"
            id="material"
            name="material"
            placeholder="Enter material"
            value={formData.material}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="tags">Tags</label>
          <input
            type="text"
            id="tags"
            name="tags"
            placeholder="Enter tags"
            value={formData.tags}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="environmentalImpact">Environmental Impact</label>
          <input
            type="text"
            id="environmentalImpact"
            name="environmentalImpact"
            placeholder="Enter environmental impact"
            value={formData.environmentalImpact}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="usageInstructions">Usage Instructions</label>
          <input
            type="text"
            id="usageInstructions"
            name="usageInstructions"
            placeholder="Enter usage instructions"
            value={formData.usageInstructions}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="hazardousMaterial">Hazardous Material</label>
          <select
            id="hazardousMaterial"
            name="hazardousMaterial"
            value={formData.hazardousMaterial}
            onChange={handleInputChange}
            className="animated-input"
          >
            <option value="">Select Option</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default OtherAttributes;
