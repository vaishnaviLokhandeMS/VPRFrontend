import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: '',
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    street_address: '',
    city: '',
    state_province: '',
    postal_code: '',
    country: '',
    date_of_birth: '',
    gender: '',
    profile_picture: '',
    access_level: 1,
  });

  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [uuid, setUuid] = useState('');

  useEffect(() => {
    document.querySelector('.registration-container').classList.add('slide-in');
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);
    setUuid('');

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match. Please verify your password.');
      scrollToTop();
      return;
    }

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/api/auth/createUser`, formData);
      if (response.data.success) {
        setSuccess(true);
        setUuid(response.data.uuid);
        setFormData({
          username: '',
          password: '',
          confirmPassword: '',
          first_name: '',
          last_name: '',
          email: '',
          phone_number: '',
          street_address: '',
          city: '',
          state_province: '',
          postal_code: '',
          country: '',
          date_of_birth: '',
          gender: '',
          profile_picture: '',
          access_level: 1,
        });
      } else {
        setError('User creation failed.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'User creation failed. Please try again.');
    }
    scrollToTop();
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  const redirectToLogin = () => {
    document.querySelector('.registration-container').classList.add('slide-out');
    setTimeout(() => {
      window.location.href = '/login';
    }, 500); // Match the duration of the CSS transition
  };

  return (
    <div className="registration-container">
      <button onClick={redirectToLogin} className="top-back-button">Back to Login</button>
      <h2>Create Account</h2>
      {error && <p className="error">{error}</p>}
      {success && (
        <div className="success-popup">
          <p>User created successfully!</p>
          <p>Your User ID: {uuid}</p>
          <button onClick={redirectToLogin}>Go to Login</button>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>
            Username <span className="required">*</span>
          </label>
          <input type="text" name="username" value={formData.username} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>
            Password <span className="required">*</span>
          </label>
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>
            Confirm Password <span className="required">*</span>
          </label>
          <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>
            First Name <span className="required">*</span>
          </label>
          <input type="text" name="first_name" value={formData.first_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>
            Last Name <span className="required">*</span>
          </label>
          <input type="text" name="last_name" value={formData.last_name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>
            Email <span className="required">*</span>
          </label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Phone Number</label>
          <input type="text" name="phone_number" value={formData.phone_number} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Street Address</label>
          <input type="text" name="street_address" value={formData.street_address} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>City</label>
          <input type="text" name="city" value={formData.city} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>State/Province</label>
          <input type="text" name="state_province" value={formData.state_province} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Postal/ZIP Code</label>
          <input type="text" name="postal_code" value={formData.postal_code} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Country</label>
          <input type="text" name="country" value={formData.country} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Date of Birth</label>
          <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="">Select Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div className="form-group">
          <label>Profile Picture</label>
          <input type="text" name="profile_picture" value={formData.profile_picture} onChange={handleChange} />
        </div>
        <div className="form-group">
          <label>Access Level</label>
          <input type="number" name="access_level" min="1" max="10" value={formData.access_level} onChange={handleChange} />
        </div>
        <div className="button-group">
          <button type="button" onClick={redirectToLogin} className="back-button">Back to Login</button>
          <button type="submit">Create Account</button>
        </div>
      </form>
    </div>
  );
};

export default Registration;
