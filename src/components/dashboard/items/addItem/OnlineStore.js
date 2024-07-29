import React from 'react';
import './OnlineStore.css';

const OnlineStore = () => {
  return (
    <div className="box">
      <h2>Online Store</h2>
      <div className="form-group">
        <label htmlFor="onlinePrice">Online Price</label>
        <input type="text" id="onlinePrice" name="onlinePrice" />
      </div>
      <div className="form-group">
        <label htmlFor="availability">Availability</label>
        <select id="availability" name="availability">
          <option value="inStock">In Stock</option>
          <option value="outOfStock">Out of Stock</option>
        </select>
      </div>
    </div>
  );
};

export default OnlineStore;
