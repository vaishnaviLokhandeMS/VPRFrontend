import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProvideShopID.css';

const ProvideShopID = () => {
  const [shopID, setShopID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const token = localStorage.getItem('token'); // Get the token from localStorage
      const response = await axios.post(
        'http://localhost:5000/api/shops/validate',
        { shopID, password },
        { headers: { Authorization: `Bearer ${token}` } } // Pass the token in headers
      );
      if (response.data.success) {
        navigate('/select-shop'); // Navigate to select shop page
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to validate shop ID. Please try again.');
    }
  };

  return (
    <div className="provide-shop-id-page">
      <div className="provide-shop-id-container">
        <h2>Provide Shop ID</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="provide-shop-id-form">
          <div className="form-group">
            <label className="form-label">Shop ID</label>
            <input
              className="form-input"
              type="text"
              value={shopID}
              onChange={(e) => setShopID(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Password</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="submit-button">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default ProvideShopID;
