import React, { useState } from 'react';
import './DeleteItem.css';
import PricingAndTax from './PricingAndTax';
import DimensionsAndWeight from './DimensionsAndWeight';
import StockAndInventory from './StockAndInventory';
import TechnicalSpecifications from './TechnicalSpecifications';
import OtherAttributes from './OtherAttributes';
import QualityAndCompliance from './QualityAndCompliance';
import OwnershipAndOrigin from './OwnershipAndOrigin';
import ImportantDates from './ImportantDates';
import Identifiers from './Identifiers';
import ConfirmationModal from './ConfirmationModal';
import { fetchSuggestions } from './../utils/fetchSuggestions';
import { fetchItemDetails } from './../utils/fetchItemDetails';
import axios from 'axios';

const DeleteItem = () => {
  const initialFormData = {
    itemID: '', // Adding itemID to the form data
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
  const [suggestions, setSuggestions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleItemNameChange = async (e) => {
    const name = e.target.value;
    setFormData({ ...formData, itemName: name });

    if (name) {
      const suggestions = await fetchSuggestions(name);
      setSuggestions(suggestions);
    } else {
      setSuggestions([]);
    }
  };

  const handleGetDataClick = () => {
    fetchItemDetails(formData.itemName, setFormData);
    setSuggestions([]);
  };

  const handleDeleteClick = async (event) => {
    event.preventDefault();
    setShowModal(true);
  };

  const handleConfirmDelete = async () => {
    const token = localStorage.getItem('token');
    const shopToken = localStorage.getItem('shopToken');

    try {
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/items/deleteItem`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Shop-Token': shopToken,
        },
        data: { itemID: formData.itemID }, // Sending itemID for deletion
      });

      alert('Item deleted successfully.');
      setFormData(initialFormData); // Reset form fields
      setShowModal(false); // Close modal
    } catch (error) {
      console.error('Error deleting item:', error);
      alert('Failed to delete item.');
    }
  };

  const handleCancelDelete = () => {
    setShowModal(false);
  };

  return (
    <div className="delete-item-container">
      <div className="delete-item">
        <h1>Delete Item</h1>
        <form onSubmit={handleDeleteClick}>
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="itemName">Item Name*</label>
              <input
                type="text"
                id="itemName"
                name="itemName"
                value={formData.itemName}
                onChange={handleItemNameChange}
                list="itemSuggestions"
                required
              />
              <datalist id="itemSuggestions">
                {suggestions.map((suggestion, index) => (
                  <option key={index} value={suggestion} />
                ))}
              </datalist>
            </div>
            <div className="form-group">
              <button type="button" className="get-data-button" onClick={handleGetDataClick}>
                Get Data
              </button>
            </div>
          </div>

          {/* Adding Item ID field */}
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="itemID">Item ID</label>
              <input type="text" id="itemID" name="itemID" value={formData.itemID} readOnly />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="itemHSN">Item HSN</label>
              <input type="text" id="itemHSN" name="itemHSN" value={formData.itemHSN} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="itemCode">Item Code</label>
              <input type="text" id="itemCode" name="itemCode" value={formData.itemCode} readOnly />
            </div>
            <div className="form-group">
              <label htmlFor="shortDescription">Short Description</label>
              <input type="text" id="shortDescription" name="shortDescription" value={formData.shortDescription} readOnly />
            </div>
          </div>

          <div className="form-row description-row">
            <div className="form-group description-group">
              <label htmlFor="description">Description</label>
              <textarea id="description" name="description" rows="2" value={formData.description} readOnly></textarea>
            </div>
          </div>

          <div className="section">
            <h2>Pricing and Tax</h2>
            <PricingAndTax formData={formData} readOnly />
          </div>

          <div className="section">
            <h2>Dimensions and Weight</h2>
            <DimensionsAndWeight formData={formData} readOnly />
          </div>

          <div className="section">
            <h2>Stock and Inventory</h2>
            <StockAndInventory formData={formData} readOnly />
          </div>

          <div className="section">
            <h2>Technical Specifications</h2>
            <TechnicalSpecifications formData={formData} readOnly />
          </div>

          <div className="section">
            <h2>Other Attributes</h2>
            <OtherAttributes formData={formData} readOnly />
          </div>

          <div className="section">
            <h2>Quality and Compliance</h2>
            <QualityAndCompliance formData={formData} readOnly />
          </div>

          <div className="section">
            <h2>Ownership and Origin</h2>
            <OwnershipAndOrigin formData={formData} readOnly />
          </div>

          <div className="section">
            <h2>Important Dates</h2>
            <ImportantDates formData={formData} readOnly />
          </div>

          <div className="section">
            <h2>Identifiers</h2>
            <Identifiers formData={formData} readOnly />
          </div>

          <div className="form-actions">
            <button type="submit" className="delete-button">Delete Item</button>
          </div>
        </form>
      </div>

      <ConfirmationModal
        show={showModal}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message="This action cannot be rolled back. Are you sure you want to delete the item?"
      />
    </div>
  );
};

export default DeleteItem;
