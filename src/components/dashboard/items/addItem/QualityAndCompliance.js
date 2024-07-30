import React from 'react';
import './QualityAndCompliance.css';

const QualityAndCompliance = ({ formData, onChange }) => {

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    onChange({ target: { name, value } });
  };

  return (
    <div className="box">
      <h2>Quality and Compliance</h2>
      <p className="info-text">Fill in the quality and compliance details.</p>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="grade">Grade</label>
          <input
            type="text"
            id="grade"
            name="grade"
            placeholder="Enter grade"
            value={formData.grade}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="certification">Certification</label>
          <input
            type="text"
            id="certification"
            name="certification"
            placeholder="Enter certification"
            value={formData.certification}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="complianceStandards">Compliance Standards</label>
          <input
            type="text"
            id="complianceStandards"
            name="complianceStandards"
            placeholder="Enter compliance standards"
            value={formData.complianceStandards}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="legalRequirements">Legal Requirements</label>
          <input
            type="text"
            id="legalRequirements"
            name="legalRequirements"
            placeholder="Enter legal requirements"
            value={formData.legalRequirements}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
    </div>
  );
};

export default QualityAndCompliance;
