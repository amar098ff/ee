import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, User, LogOut, Search } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout } = useAuth();
    const { cartItems } = useCart();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="nav-premium">
            <div className="nav-content">
                <Link to="/" className="nav-logo">
                    PRO-SHOP
                </Link>

                <div className="nav-links">
                    <Link to="/products" className="nav-link">
                        Shop
                    </Link>
                    <Link to="/cart" className="nav-icon-btn">
                        <ShoppingCart size={22} />
                        {cartItems.length > 0 && (
                            <span className="badge">
                                {cartItems.length}
                            </span>
                        )}
                    </Link>

                    {user ? (
                        <div className="nav-links">
                            <span className="nav-link" style={{ fontSize: '14px', color: '#64748b' }}>
                                Hi, {user.name.split(' ')[0]}
                            </span>
                            <button
                                onClick={handleLogout}
                                className="nav-icon-btn"
                                title="Logout"
                                style={{ color: '#ef4444' }}
                            >
                                <LogOut size={22} />
                            </button>
                        </div>
                    ) : (
                        <Link to="/login" className="nav-icon-btn">
                            <User size={22} />
                        </Link>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
