import React from 'react';
import './PricingAndTax.css';

const PricingAndTax = () => {
  return (
    <div className="box">
      <h2>Pricing and Tax</h2>
      <div className="form-group">
        <label htmlFor="salePriceWithTax">Sale Price with Tax</label>
        <input type="text" id="salePriceWithTax" name="salePriceWithTax" />
      </div>
      <div className="form-group">
        <label htmlFor="salePriceWithoutTax">Sale Price without Tax</label>
        <input type="text" id="salePriceWithoutTax" name="salePriceWithoutTax" />
      </div>
      <div className="form-group">
        <label htmlFor="wholesalePriceWithTax">Wholesale Price with Tax</label>
        <input type="text" id="wholesalePriceWithTax" name="wholesalePriceWithTax" />
      </div>
      <div className="form-group">
        <label htmlFor="wholesalePriceWithoutTax">Wholesale Price without Tax</label>
        <input type="text" id="wholesalePriceWithoutTax" name="wholesalePriceWithoutTax" />
      </div>
      <div className="form-group">
        <label htmlFor="wholesaleMinimumOrderQuantity">Wholesale Minimum Order Quantity</label>
        <input type="text" id="wholesaleMinimumOrderQuantity" name="wholesaleMinimumOrderQuantity" />
      </div>
      <div className="form-group">
        <label htmlFor="discountedPrice">Discounted Price</label>
        <input type="text" id="discountedPrice" name="discountedPrice" />
      </div>
      <div className="form-group">
        <label htmlFor="igst">IGST</label>
        <input type="text" id="igst" name="igst" />
      </div>
      <div className="form-group">
        <label htmlFor="gst">GST</label>
        <input type="text" id="gst" name="gst" />
      </div>
    </div>
  );
};

export default PricingAndTax;
