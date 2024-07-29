import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NoShop.css';

const NoShop = () => {
  const navigate = useNavigate();

  const handleProvideShopID = () => {
    navigate('/provide-shop-id');
  };

  const handleCreateShop = () => {
    navigate('/create-shop');
  };

  return (
    <div className="no-shop-page">
      <div className="no-shop-container">
        <h2>You are not associated with any shop</h2>
        <div className="form-group">
          <button onClick={handleProvideShopID}>Provide Shop ID</button>
          <button onClick={handleCreateShop}>Create Shop</button>
        </div>
      </div>
    </div>
  );
};

export default NoShop;
