import React, { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './SelectShop.css';
import { AuthContext } from '../../context/AuthContext';

const SelectShop = () => {
  const [shops, setShops] = useState([]);
  const [filteredShops, setFilteredShops] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    const fetchShops = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/shops/user-shops`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        setShops(response.data.shops);
        setFilteredShops(response.data.shops);
      } catch (err) {
        console.error('Failed to fetch shops:', err);
      }
    };

    fetchShops();
  }, []);

  useEffect(() => {
    const results = shops.filter(shop =>
      shop.shop_name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredShops(results);
  }, [searchTerm, shops]);

  const handleSelectShop = async (shopId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/shops/select-shop`, { shopId }, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        localStorage.setItem('shopToken', response.data.token); // Store the new shop token
        navigate('/dashboard');
      } else {
        console.error('Failed to select shop:', response.data.message);
      }
    } catch (err) {
      console.error('Failed to select shop:', err);
    }
  };

  const handleCreateShop = () => {
    navigate('/create-shop');
  };

  const handleProvideShopID = () => {
    navigate('/provide-shop-id');
  };

  const handleLogoutConfirmation = () => {
    const confirmation = window.confirm('Do you want to logout?');
    if (confirmation) {
      logout();
      navigate('/login');
    } else {
      navigate('/select-shop'); // Ensure user remains on select shop page
    }
  };

  useEffect(() => {
    const handlePopState = (event) => {
      event.preventDefault();
      handleLogoutConfirmation();
    };

    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, []);

  return (
    <div className="select-shop-page">
      <div className="select-shop-container">
        <h2>Select Shop</h2>
        <input
          type="text"
          placeholder="Search for a shop..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-bar"
        />
        {filteredShops.length === 0 ? (
          <p>No shops found</p>
        ) : (
          <ul className="shop-list">
            {filteredShops.map((shop) => (
              <li key={shop.shopID} onClick={() => handleSelectShop(shop.shopID)}>
                {shop.shop_name}
              </li>
            ))}
          </ul>
        )}
        <button onClick={handleCreateShop} className="create-shop-button">Create Shop</button>
        <button onClick={handleProvideShopID} className="provide-shop-id-button">Provide Shop ID</button>
      </div>
    </div>
  );
};

export default SelectShop;
