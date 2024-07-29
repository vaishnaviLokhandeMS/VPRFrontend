import React, { useContext, useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import Login from './components/loginPage/Login';
import Registration from './components/registrationPage/Registration';
import Dashboard from './components/dashboard/Dashboard';
import Parties from './components/parties/Parties';
import Products from './components/products/Products';
import Sales from './components/sales/Sales';
import Reports from './components/reports/Reports';
import Sidebar from './components/sidebar/Sidebar';
import SelectShop from './components/SelectShop/SelectShop';
import NoShop from './components/NoShop/NoShop';
import CreateShop from './components/shop/create/CreateShop';
import ProvideShopID from './components/NoShop/ProvideShopID/ProvideShopID';
import AddItem from './components/dashboard/items/addItem/AddItem'; // Import the Add Item component
import { AuthContext, AuthProvider } from './context/AuthContext';
import './App.css';
import './animations.css';

const AppRoutes = () => {
  const { isAuthenticated, logout, checkAuthState } = useContext(AuthContext);
  const location = useLocation();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initializeAuthState = async () => {
      await checkAuthState();
      setLoading(false);
    };
    initializeAuthState();
  }, [checkAuthState]);

  const showSidebar = isAuthenticated && !['/no-shop', '/select-shop', '/create-shop', '/provide-shop-id'].includes(location.pathname);

  if (loading) {
    return <div>Loading...</div>; // Render a loading state while checking authentication
  }

  return (
    <div className="app-container">
      {showSidebar && <Sidebar onLogout={logout} />}
      <div className={isAuthenticated ? "main-content" : ""}>
        <TransitionGroup>
          <CSSTransition
            key={location.key}
            classNames="fade"
            timeout={300}
          >
            <Routes location={location}>
              <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login />} />
              <Route path="/register" element={<Registration />} />
              <Route path="/dashboard" element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
              <Route path="/parties" element={isAuthenticated ? <Parties /> : <Navigate to="/login" />} />
              <Route path="/products" element={isAuthenticated ? <Products /> : <Navigate to="/login" />} />
              <Route path="/sales" element={isAuthenticated ? <Sales /> : <Navigate to="/login" />} />
              <Route path="/reports" element={isAuthenticated ? <Reports /> : <Navigate to="/login" />} />
              <Route path="/select-shop" element={isAuthenticated ? <SelectShop /> : <Navigate to="/login" />} />
              <Route path="/no-shop" element={isAuthenticated ? <NoShop /> : <Navigate to="/login" />} />
              <Route path="/create-shop" element={isAuthenticated ? <CreateShop /> : <Navigate to="/login" />} />
              <Route path="/provide-shop-id" element={isAuthenticated ? <ProvideShopID /> : <Navigate to="/login" />} />
              <Route path="/items/add" element={isAuthenticated ? <AddItem /> : <Navigate to="/login" />} /> {/* Add the route for Add Item */}
              <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} />
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      </div>
    </div>
  );
};

const App = () => (
  <AuthProvider>
    <Router>
      <AppRoutes />
    </Router>
  </AuthProvider>
);

export default App;
