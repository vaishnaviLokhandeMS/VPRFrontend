import React, { useState } from 'react';
import './PricingAndTax.css';

const PricingAndTax = () => {
  const [formData, setFormData] = useState({
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
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    let updatedFormData = { ...formData, [name]: value };

    const sgst = parseFloat(formData.sgst) || 0;
    const cgst = parseFloat(formData.cgst) || 0;
    const totalTaxRate = (sgst + cgst) / 100;

    const calculateWithoutTax = (withTax) => (withTax / (1 + totalTaxRate)).toFixed(2);
    const calculateWithTax = (withoutTax) => (withoutTax * (1 + totalTaxRate)).toFixed(2);

    switch (name) {
      case 'salePriceWithTax':
        updatedFormData.salePriceWithoutTax = calculateWithoutTax(value);
        break;
      case 'salePriceWithoutTax':
        updatedFormData.salePriceWithTax = calculateWithTax(value);
        break;
      case 'wholesalePriceWithTax':
        updatedFormData.wholesalePriceWithoutTax = calculateWithoutTax(value);
        break;
      case 'wholesalePriceWithoutTax':
        updatedFormData.wholesalePriceWithTax = calculateWithTax(value);
        break;
      case 'discountedPriceWithTax':
        updatedFormData.discountedPriceWithoutTax = calculateWithoutTax(value);
        break;
      case 'discountedPriceWithoutTax':
        updatedFormData.discountedPriceWithTax = calculateWithTax(value);
        break;
      case 'costPriceWithTax':
        updatedFormData.costPriceWithoutTax = calculateWithoutTax(value);
        break;
      case 'costPriceWithoutTax':
        updatedFormData.costPriceWithTax = calculateWithTax(value);
        break;
      default:
        break;
    }

    setFormData(updatedFormData);
  };

  const handleWholesaleQuantityChange = (event) => {
    const { value } = event.target;
    setFormData({ ...formData, wholesaleQuantity: value });
  };

  return (
    <div className="box">
      <h2>Pricing and Tax</h2>
      <p className="info-text">Fill in the tax rates, and then enter either the with-tax or without-tax price. The other field will be calculated automatically.</p>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="sgst">SGST</label>
          <input
            type="text"
            id="sgst"
            name="sgst"
            placeholder="Enter SGST in %"
            value={formData.sgst}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="cgst">CGST</label>
          <input
            type="text"
            id="cgst"
            name="cgst"
            placeholder="Enter CGST in %"
            value={formData.cgst}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="salePriceWithTax">Sale Price</label>
          <input
            type="text"
            id="salePriceWithTax"
            name="salePriceWithTax"
            placeholder="With Tax"
            value={formData.salePriceWithTax}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="salePriceWithoutTax">Sale Price</label>
          <input
            type="text"
            id="salePriceWithoutTax"
            name="salePriceWithoutTax"
            placeholder="Without Tax"
            value={formData.salePriceWithoutTax}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="wholesalePriceWithTax">Wholesale Price</label>
          <input
            type="text"
            id="wholesalePriceWithTax"
            name="wholesalePriceWithTax"
            placeholder="With Tax"
            value={formData.wholesalePriceWithTax}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="wholesalePriceWithoutTax">Wholesale Price</label>
          <input
            type="text"
            id="wholesalePriceWithoutTax"
            name="wholesalePriceWithoutTax"
            placeholder="Without Tax"
            value={formData.wholesalePriceWithoutTax}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="wholesaleQuantity">Wholesale Quantity</label>
          <input
            type="text"
            id="wholesaleQuantity"
            name="wholesaleQuantity"
            placeholder="Enter quantity"
            value={formData.wholesaleQuantity}
            onChange={handleWholesaleQuantityChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="wholesaleUnit">Choose Unit</label>
          <select
            id="wholesaleUnit"
            name="wholesaleUnit"
            disabled={!formData.wholesaleQuantity}
            className={`animated-input ${!formData.wholesaleQuantity ? 'disabled-select' : ''}`}
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
          <label htmlFor="discountedPriceWithTax">Discounted Price</label>
          <input
            type="text"
            id="discountedPriceWithTax"
            name="discountedPriceWithTax"
            placeholder="With Tax"
            value={formData.discountedPriceWithTax}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="discountedPriceWithoutTax">Discounted Price</label>
          <input
            type="text"
            id="discountedPriceWithoutTax"
            name="discountedPriceWithoutTax"
            placeholder="Without Tax"
            value={formData.discountedPriceWithoutTax}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="costPriceWithTax">Cost Price</label>
          <input
            type="text"
            id="costPriceWithTax"
            name="costPriceWithTax"
            placeholder="With Tax"
            value={formData.costPriceWithTax}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="costPriceWithoutTax">Cost Price</label>
          <input
            type="text"
            id="costPriceWithoutTax"
            name="costPriceWithoutTax"
            placeholder="Without Tax"
            value={formData.costPriceWithoutTax}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
    </div>
  );
};

export default PricingAndTax;
