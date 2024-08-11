import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FaHome, FaUserFriends, FaBox, FaDollarSign, FaShoppingCart, FaCashRegister, FaMoneyCheckAlt, FaChartLine, FaTools, FaSync, FaDatabase, FaCog, FaAngleDown, FaAngleRight } from 'react-icons/fa';
import './Sidebar.css';

const Sidebar = ({ onLogout }) => {
  const [showSubItems, setShowSubItems] = useState(false);
  const subItemsRef = useRef(null);

  const handleLogout = () => {
    onLogout();
  };

  const toggleSubItems = () => {
    setShowSubItems(!showSubItems);
  };

  return (
    <div className="sidebar">
      <nav>
        <ul>
          <li>
            <NavLink to="/home" activeClassName="active-link">
              <FaHome className="icon" /> Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/parties" activeClassName="active-link">
              <FaUserFriends className="icon" /> Parties
            </NavLink>
          </li>
          <li className={`parent-items ${showSubItems ? 'expanded' : ''}`}>
            <div className="nav-link" onClick={toggleSubItems}>
              <FaBox className="icon" /> Items {showSubItems ? <FaAngleDown className="arrow-icon" /> : <FaAngleRight className="arrow-icon" />}
            </div>
            <ul className="subitems" ref={subItemsRef} style={{ height: showSubItems ? subItemsRef.current.scrollHeight : 0 }}>
              <li>
                <NavLink to="/items/portfolio" activeClassName="active-link">
                  Portfolio
                </NavLink>
              </li>
              <li>
                <NavLink to="/items/add" activeClassName="active-link">
                  Add Item
                </NavLink>
              </li>
              <li>
                <NavLink to="/items/update" activeClassName="active-link">
                  Update Item
                </NavLink>
              </li>
              <li>
                <NavLink to="/items/delete" activeClassName="active-link">
                  Delete Item
                </NavLink>
              </li>
              <li>
                <NavLink to="/items/inventory" activeClassName="active-link">
                  Inventory
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/sale" activeClassName="active-link">
              <FaDollarSign className="icon" /> Sale
            </NavLink>
          </li>
          <li>
            <NavLink to="/purchase" activeClassName="active-link">
              <FaShoppingCart className="icon" /> Purchase
            </NavLink>
          </li>
          <li>
            <NavLink to="/quick-billing" activeClassName="active-link">
              <FaCashRegister className="icon" /> Quick Billing
            </NavLink>
          </li>
          <li>
            <NavLink to="/expenses" activeClassName="active-link">
              <FaMoneyCheckAlt className="icon" /> Expenses
            </NavLink>
          </li>
          <li>
            <NavLink to="/cash-bank" activeClassName="active-link">
              <FaChartLine className="icon" /> Cash & Bank
            </NavLink>
          </li>
          <li>
            <NavLink to="/reports" activeClassName="active-link">
              <FaTools className="icon" /> Reports
            </NavLink>
          </li>
          <li>
            <NavLink to="/other-products" activeClassName="active-link">
              <FaTools className="icon" /> Other Products
            </NavLink>
          </li>
          <li>
            <NavLink to="/sync-share" activeClassName="active-link">
              <FaSync className="icon" /> Sync & Share
            </NavLink>
          </li>
          <li>
            <NavLink to="/backup-restore" activeClassName="active-link">
              <FaDatabase className="icon" /> Backup/Restore
            </NavLink>
          </li>
          <li>
            <NavLink to="/utilities" activeClassName="active-link">
              <FaCog className="icon" /> Utilities
            </NavLink>
          </li>
        </ul>
      </nav>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Sidebar;
