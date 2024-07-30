import React, { useState } from 'react';
import './AddItem.css';
import PricingAndTax from './PricingAndTax';
import DimensionsAndWeight from './DimensionsAndWeight';
import StockAndInventory from './StockAndInventory';
import TechnicalSpecifications from './TechnicalSpecifications';
import OtherAttributes from './OtherAttributes';
import QualityAndCompliance from './QualityAndCompliance';
import OwnershipAndOrigin from './OwnershipAndOrigin';
import ImportantDates from './ImportantDates';
import Identifiers from './Identifiers';

const AddItem = () => {
  const initialFormData = {
    itemName: '',
    itemHSN: '',
    itemCode: '',
    shortDescription: '',
    description: '',
    sgst: '',
    cgst: '',
    salePriceWithTax: '',
    salePriceWithoutTax: '',
    wholesalePriceWithTax: '',
    wholesalePriceWithoutTax: '',
    discountedPriceWithTax: '',
    discountedPriceWithoutTax: '',
    costPriceWithTax: '',
    costPriceWithoutTax: '',
    wholesaleQuantity: '',
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
    storageUnit: '',
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
    maxTemperatureUnit: '',
    power: '',
    powerUnit: '',
    voltage: '',
    voltageUnit: '',
    current: '',
    currentUnit: '',
    capacity: '',
    capacityUnit: '',
    supply: '',
    powerFactor: '',
    warranty: '',
    warrantyUnit: '',
    guarantee: '',
    guaranteeUnit: '',
    location: '',
    material: '',
    tags: '',
    environmentalImpact: '',
    usageInstructions: '',
    hazardousMaterial: '',
    grade: '',
    certification: '',
    complianceStandards: '',
    legalRequirements: '',
    createdByUser: '',
    shopID: '',
    supplierID: '',
    manufacturer: '',
    countryOfOrigin: '',
    createTime: '',
    lastModified: '',
    manufacturedOn: '',
    manufacturingDate: '',
    expiryDate: '',
    category: '',
    sku: '',
    barcode: '',
    serialNumber: '',
    batchNumber: '',
    modelNumber: ''
  };

  const [formData, setFormData] = useState(initialFormData);

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

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    
    const token = localStorage.getItem('token');
    const shopToken = localStorage.getItem('shopToken');

    // Submit form data to backend API
    fetch('http://localhost:5000/api/items/addItem', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
        'Shop-Token': shopToken,
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log('Success:', data);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Smooth scroll to the top
        setFormData(initialFormData); // Reset form fields
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  };

  return (
    <div className="add-item-container">
      <div className="add-item">
        <h1>Add Item</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="itemName">Item Name*</label>
              <input type="text" id="itemName" name="itemName" value={formData.itemName} onChange={handleInputChange} required />
            </div>
            <div className="form-group">
              <label htmlFor="itemHSN">Item HSN</label>
              <input type="text" id="itemHSN" name="itemHSN" value={formData.itemHSN} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="itemCode">Item Code</label>
              <input type="text" id="itemCode" name="itemCode" value={formData.itemCode} onChange={handleInputChange} />
            </div>
            <div className="form-group">
              <label htmlFor="shortDescription">Short Description</label>
              <input type="text" id="shortDescription" name="shortDescription" placeholder='You can use it to print on Barcode sticker For E.g. "OnePlus 12 R 12/256"' value={formData.shortDescription} onChange={handleInputChange} />
            </div>
          </div>
          <div className="form-row description-row">
            <div className="form-group description-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" rows="2" value={formData.description} onChange={handleInputChange}></textarea>
            </div>
            <div className="form-group image-button-group">
              <button type="button" className="add-item-image-button">Add Item Image</button>
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('pricingAndTax')}>Pricing and Tax</h2>
            <div className={`content ${expandedSections.pricingAndTax ? 'expanded' : 'collapsed'}`}>
              <PricingAndTax onChange={handleInputChange} formData={formData} />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('identifiers')}>Identifiers</h2>
            <div className={`content ${expandedSections.identifiers ? 'expanded' : 'collapsed'}`}>
              <Identifiers onChange={handleInputChange} formData={formData} />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('dimensionsAndWeight')}>Dimensions and Weight</h2>
            <div className={`content ${expandedSections.dimensionsAndWeight ? 'expanded' : 'collapsed'}`}>
              <DimensionsAndWeight onChange={handleInputChange} formData={formData} />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('stockAndInventory')}>Stock and Inventory</h2>
            <div className={`content ${expandedSections.stockAndInventory ? 'expanded' : 'collapsed'}`}>
              <StockAndInventory onChange={handleInputChange} formData={formData} />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('technicalSpecifications')}>Technical Specifications</h2>
            <div className={`content ${expandedSections.technicalSpecifications ? 'expanded' : 'collapsed'}`}>
              <TechnicalSpecifications onChange={handleInputChange} formData={formData} />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('otherAttributes')}>Other Attributes</h2>
            <div className={`content ${expandedSections.otherAttributes ? 'expanded' : 'collapsed'}`}>
              <OtherAttributes onChange={handleInputChange} formData={formData} />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('qualityAndCompliance')}>Quality and Compliance</h2>
            <div className={`content ${expandedSections.qualityAndCompliance ? 'expanded' : 'collapsed'}`}>
              <QualityAndCompliance onChange={handleInputChange} formData={formData} />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('ownershipAndOrigin')}>Ownership and Origin</h2>
            <div className={`content ${expandedSections.ownershipAndOrigin ? 'expanded' : 'collapsed'}`}>
              <OwnershipAndOrigin onChange={handleInputChange} formData={formData} />
            </div>
          </div>
          <div className="section">
            <h2 onClick={() => toggleSection('importantDates')}>Important Dates</h2>
            <div className={`content ${expandedSections.importantDates ? 'expanded' : 'collapsed'}`}>
              <ImportantDates onChange={handleInputChange} formData={formData} />
            </div>
          </div>
          <div className="form-actions">
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
