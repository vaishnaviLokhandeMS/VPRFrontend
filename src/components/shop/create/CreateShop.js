import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; // Corrected import
import './CreateShop.css';

const CreateShop = () => {
  const navigate = useNavigate();
  const [shopDetails, setShopDetails] = useState({
    shop_name: '',
    shop_address: '',
    gst_no: '',
    city: '',
    branch_name: '',
    branch_number: '',
    google_map_url: '',
    phone_number: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [shopId, setShopId] = useState(null);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      console.log('Decoded JWT:', decodedToken); // Debugging log
      setUserId(decodedToken.userId);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setShopDetails({
      ...shopDetails,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (shopDetails.password !== shopDetails.confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      console.log('Token:', token); // Debugging log
      const response = await axios.post('http://localhost:5000/api/shops/create', {
        ...shopDetails,
        user_id: userId, // Add the logged-in user UUID from the decoded token
      }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setSuccess('Shop created successfully');
        setShopId(response.data.shopId);
        window.scrollTo({ top: 0, behavior: 'smooth' }); // Scroll to top with smooth animation
        setTimeout(() => navigate('/select-shop'), 2000); // Redirect to select-shop after 2 seconds
      } else {
        setError(response.data.message);
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create shop. Please try again.');
    }
  };

  return (
    <div className="create-shop-container">
      <h2 className="create-shop-title">Create Shop</h2>
      {error && <p className="error-message">{error}</p>}
      {success && <p className="success-message">{success}</p>}
      <form onSubmit={handleSubmit} className="create-shop-form">
        {Object.keys(shopDetails).map((key) => (
          <div key={key} className="form-group">
            <label className="form-label">{key.replace('_', ' ')}</label>
            <input
              className="form-input"
              type={key.includes('password') ? 'password' : 'text'}
              name={key}
              value={shopDetails[key] || ''}
              onChange={handleChange}
              required={['shop_name', 'shop_address', 'gst_no', 'city', 'phone_number'].includes(key)}
            />
          </div>
        ))}
        {userId && (
          <div className="form-group">
            <label className="form-label">User UUID</label>
            <input
              className="form-input"
              type="text"
              name="user_id"
              value={userId} // Display the logged-in user UUID
              readOnly
            />
          </div>
        )}
        <button type="submit" className="submit-button">Create Shop</button>
      </form>
      {shopId && <p className="shop-id">Shop ID: {shopId}</p>}
    </div>
  );
};

export default CreateShop;
