import React, { useState } from 'react';
import './OwnershipAndOrigin.css';

const OwnershipAndOrigin = () => {
  const [formData, setFormData] = useState({
    createdByUser: '',
    shopID: '',
    supplierID: '',
    manufacturer: '',
    countryOfOrigin: ''
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const countries = [
    "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia",
    "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
    "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
    "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic", "Chad",
    "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the",
    "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
    "East Timor", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini",
    "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
    "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
    "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
    "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
    "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali", "Malta",
    "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro",
    "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger",
    "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
    "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
    "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
    "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
    "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
    "Tajikistan", "Tanzania", "Thailand", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan",
    "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan",
    "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
  ];

  return (
    <div className="box">
      <h2>Ownership and Origin</h2>
      <p className="info-text">Fill in the ownership and origin details.</p>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="createdByUser">Created By User</label>
          <input
            type="text"
            id="createdByUser"
            name="createdByUser"
            placeholder="Enter creator username"
            value={formData.createdByUser}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="shopID">Shop ID</label>
          <input
            type="text"
            id="shopID"
            name="shopID"
            placeholder="Enter shop ID"
            value={formData.shopID}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="supplierID">Supplier ID</label>
          <input
            type="text"
            id="supplierID"
            name="supplierID"
            placeholder="Enter supplier ID"
            value={formData.supplierID}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
        <div className="form-group">
          <label htmlFor="manufacturer">Manufacturer</label>
          <input
            type="text"
            id="manufacturer"
            name="manufacturer"
            placeholder="Enter manufacturer name"
            value={formData.manufacturer}
            onChange={handleInputChange}
            className="animated-input"
          />
        </div>
      </div>
      <div className="form-group-row">
        <div className="form-group">
          <label htmlFor="countryOfOrigin">Country of Origin</label>
          <select
            id="countryOfOrigin"
            name="countryOfOrigin"
            value={formData.countryOfOrigin}
            onChange={handleInputChange}
            className="animated-input"
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default OwnershipAndOrigin;
