import React from 'react';
import './AddItem.css';
import PricingAndTax from './PricingAndTax';
import Stock from './Stock';
import OnlineStore from './OnlineStore';

const AddItem = () => {
  return (
    <div className="add-item-container">
      <div className="add-item">
        <h1>Add Item</h1>
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
              <button type="button" className="add-item-image-button">Add Item Image</button>
            </div>
          </div>
          <PricingAndTax />
          <Stock />
          <OnlineStore />
          <div className="form-actions">
            <button type="button" className="save-and-new-button">Save & New</button>
            <button type="submit" className="save-button">Save</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddItem;
