// App.js
import React, { useState, createContext, useContext, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import Navbar from './components/Navbar';
import DocumentForm from './components/DocumentForm';
import DocumentDetails from './components/DocumentDetails';
import LandingPage from './components/LandingPage';
import LoadingSpinner from './components/LoadingSpinner';
import RealTimeUpdates from './components/RealTimeUpdates'; // ✅ Include this component
import './App.css';

// Create context for global state
const AppContext = createContext();

export const useAppContext = () => useContext(AppContext);

// Wrapping component with state/context and router
function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState('Loading...');

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error('Failed to parse user data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const createNavigateWithLoading = (navigate) => {
    return (path, message = 'Loading...') => {
      setIsLoading(true);
      setLoadingMessage(message);
      navigate(path);
    };
  };

  const value = {
    user,
    setUser,
    isLoading,
    setIsLoading,
    loadingMessage,
    setLoadingMessage,
    createNavigateWithLoading
  };

  if (isLoading) {
    return (
      <div className="app-loading">
        <LoadingSpinner message={loadingMessage} />
      </div>
    );
  }

  return (
    <AppContext.Provider value={value}>
      <Router>
        <AppRoutes />
        <RealTimeUpdates /> {/* ✅ Real-time updates included globally */}
      </Router>
    </AppContext.Provider>
  );
}

function AppRoutes() {
  const { isLoading, createNavigateWithLoading } = useAppContext();
  const navigate = useNavigate();
  const navigateWithLoading = createNavigateWithLoading(navigate);

  if (isLoading) {
    return (
      <div className="app-loading">
        <LoadingSpinner />
      </div>
    );
  }

  return (
    <>
      <Navbar navigateWithLoading={navigateWithLoading} />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login navigateWithLoading={navigateWithLoading} />} />
        <Route path="/register" element={<Register navigateWithLoading={navigateWithLoading} />} />
        <Route path="/dashboard" element={<Dashboard navigateWithLoading={navigateWithLoading} />} />
        <Route path="/document/:id" element={<DocumentDetails navigateWithLoading={navigateWithLoading} />} />
        <Route path="/document/new" element={<DocumentForm navigateWithLoading={navigateWithLoading} />} />
      </Routes>
    </>
  );
}

export default App;
