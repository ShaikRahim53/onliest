import React, { useState, useEffect } from 'react';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';

// Simple router implementation
const navigate = (path) => {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
};

const getCurrentPath = () => {
  return window.location.pathname;
};

function App() {
  const [currentPath, setCurrentPath] = useState(getCurrentPath());
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const handlePopState = () => {
      setCurrentPath(getCurrentPath());
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Check if user is authenticated
  useEffect(() => {
    const token = localStorage.getItem('auth_token');
    setIsAuthenticated(!!token);
  }, [currentPath]);

  const renderPage = () => {
    // If not authenticated and trying to access protected routes, redirect to login
    if (!isAuthenticated && currentPath === '/dashboard') {
      return <Login navigate={navigate} />;
    }

    // If authenticated and trying to access auth routes, redirect to dashboard
    if (isAuthenticated && (currentPath === '/login' || currentPath === '/signup')) {
      return <Dashboard navigate={navigate} />;
    }

    // Route based on current path
    switch (currentPath) {
      case '/login':
        return <Login navigate={navigate} />;
      case '/signup':
        return <Signup navigate={navigate} />;
      case '/dashboard':
        return <Dashboard navigate={navigate} />;
      default:
        // Default redirect based on auth status
        return isAuthenticated ? <Dashboard navigate={navigate} /> : <Login navigate={navigate} />;
    }
  };

  return (
    <div className="App">
      {renderPage()}
    </div>
  );
}

export default App;
