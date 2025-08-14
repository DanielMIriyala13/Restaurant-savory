import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const userString = localStorage.getItem('user');
    const user = userString ? JSON.parse(userString) : null;

    const handleLogout = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    // Check if current route matches
    const isActive = (path) => {
        return location.pathname === path;
    };

    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container">
                <Link className="navbar-brand" to="/dashboard">
                    <span className="logo-icon">🔗</span>
                    <span>CoCreateX</span>
                </Link>
                
                <button 
                    className="navbar-toggler" 
                    type="button" 
                    data-bs-toggle="collapse" 
                    data-bs-target="#navbarContent" 
                    aria-controls="navbarContent" 
                    aria-expanded="false" 
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                
                <div className="collapse navbar-collapse" id="navbarContent">
                    <ul className="navbar-nav me-auto">
                        <li className="nav-item">
                            <Link 
                                className={`nav-link ${isActive('/dashboard') ? 'active' : ''}`} 
                                to="/dashboard"
                            >
                                Dashboard
                            </Link>
                        </li>
                    </ul>
                    
                    {user ? (
                        <div className="d-flex align-items-center">
                            <div className="user-info me-3">
                                <span className="user-avatar">👤</span>
                                <span className="username">{user.username}</span>
                            </div>
                            <button 
                                className="btn btn-logout" 
                                onClick={handleLogout}
                            >
                                Logout
                            </button>
                        </div>
                    ) : (
                        <div className="auth-buttons">
                            <Link 
                                className={`btn btn-auth ${isActive('/login') ? 'active' : ''}`} 
                                to="/login"
                            >
                                Login
                            </Link>
                            <Link 
                                className={`btn btn-auth btn-primary ${isActive('/register') ? 'active' : ''}`} 
                                to="/register"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;