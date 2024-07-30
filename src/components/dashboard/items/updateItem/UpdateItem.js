import React, { useState } from 'react';
import './UpdateItem.css';
import PricingAndTax from './PricingAndTax';
import DimensionsAndWeight from './DimensionsAndWeight';
import StockAndInventory from './StockAndInventory';
import TechnicalSpecifications from './TechnicalSpecifications';
import OtherAttributes from './OtherAttributes';
import QualityAndCompliance from './QualityAndCompliance';
import OwnershipAndOrigin from './OwnershipAndOrigin';
import ImportantDates from './ImportantDates';
import Identifiers from './Identifiers';

const UpdateItem = () => {
  const [expandedSections, setExpandedSections] = useState({
    identifiers: false,
    pricingAndTax: false,
    dimensionsAndWeight: false,
    stockAndInventory: false,
    technicalSpecifications: false,
    otherAttributes: false,
    qualityAndCompliance: false,
    ownershipAndOrigin: false,
    importantDates: false,
  });

  const toggleSection = (section) => {
    setExpandedSections({
      ...expandedSections,
      [section]: !expandedSections[section],
    });
  };

  return (
    <div className="update-item-container">
      <div className="update-item">
        <h1>Update Item</h1>
        <form>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="itemName">Item Name*</label>
              <input type="text" id="itemName" name="itemName" required />
            </div>
            <div className="form-group">
              <label htmlFor="itemHSN">Item HSN</label>
              <input type="text" id="itemHSN" name="itemHSN" />
            </div>
            <div className="form-group">
              <label htmlFor="itemCode">Item Code</label>
              <input type="text" id="itemCode" name="itemCode" />
            </div>
            <div className="form-group">
              <label htmlFor="shortDescription">Short Description</label>
              <input type="text" id="shortDescription" name="shortDescription" placeholder='You can use it to print on Barcode sticker For E.g. "OnePlus 12 R 12/256"' />
            </div>
          </div>
          <div className="form-row description-row">
            <div className="form-group description-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" rows="2"></textarea>
            </div>
            <div className="form-group image-button-group">
              <button type="button" className="update-item-image-button">Update Item Image</button>
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('pricingAndTax')}>Pricing and Tax</h2>
            <div className={`content ${expandedSections.pricingAndTax ? 'expanded' : 'collapsed'}`}>
              <PricingAndTax />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('identifiers')}>Identifiers</h2>
            <div className={`content ${expandedSections.identifiers ? 'expanded' : 'collapsed'}`}>
              <Identifiers />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('dimensionsAndWeight')}>Dimensions and Weight</h2>
            <div className={`content ${expandedSections.dimensionsAndWeight ? 'expanded' : 'collapsed'}`}>
              <DimensionsAndWeight />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('stockAndInventory')}>Stock and Inventory</h2>
            <div className={`content ${expandedSections.stockAndInventory ? 'expanded' : 'collapsed'}`}>
              <StockAndInventory />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('technicalSpecifications')}>Technical Specifications</h2>
            <div className={`content ${expandedSections.technicalSpecifications ? 'expanded' : 'collapsed'}`}>
              <TechnicalSpecifications />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('otherAttributes')}>Other Attributes</h2>
            <div className={`content ${expandedSections.otherAttributes ? 'expanded' : 'collapsed'}`}>
              <OtherAttributes />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('qualityAndCompliance')}>Quality and Compliance</h2>
            <div className={`content ${expandedSections.qualityAndCompliance ? 'expanded' : 'collapsed'}`}>
              <QualityAndCompliance />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('ownershipAndOrigin')}>Ownership and Origin</h2>
            <div className={`content ${expandedSections.ownershipAndOrigin ? 'expanded' : 'collapsed'}`}>
              <OwnershipAndOrigin />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('importantDates')}>Important Dates</h2>
            <div className={`content ${expandedSections.importantDates ? 'expanded' : 'collapsed'}`}>
              <ImportantDates />
            </div>
          </div>
          <div className="form-actions">
            <button type="button" className="save-and-new-button">Save & New</button>
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateItem;
