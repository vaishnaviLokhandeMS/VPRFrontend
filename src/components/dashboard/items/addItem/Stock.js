import React from 'react';
import './Stock.css';

const Stock = () => {
  return (
    <div className="box">
      <h2>Stock</h2>
      <div className="form-group">
        <label htmlFor="openingStock">Opening Stock</label>
        <input type="text" id="openingStock" name="openingStock" />
      </div>
      <div className="form-group">
        <label htmlFor="minimumStock">Minimum Stock</label>
        <input type="text" id="minimumStock" name="minimumStock" />
      </div>
      <div className="form-group">
        <label htmlFor="reorderLevel">Reorder Level</label>
        <input type="text" id="reorderLevel" name="reorderLevel" />
      </div>
    </div>
  );
};

export default Stock;
