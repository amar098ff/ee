import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="footer-premium">
            <div className="footer-content">
                <div>
                    <h3 style={{ fontSize: '20px', fontWeight: '800', marginBottom: '16px' }}>PRO-SHOP</h3>
                    <p style={{ color: '#94a3b8', fontSize: '14px', maxWidth: '250px' }}>
                        Premium quality gear for your modern lifestyle. Handpicked products delivered to your doorstep.
                    </p>
                </div>
                <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '16px' }}>Quick Links</h4>
                    <ul style={{ color: '#94a3b8', fontSize: '14px', lineHeight: '2' }}>
                        <li><Link to="/" style={{ color: 'inherit' }}>Home</Link></li>
                        <li><Link to="/products" style={{ color: 'inherit' }}>Shop</Link></li>
                        <li><Link to="/cart" style={{ color: 'inherit' }}>My Cart</Link></li>
                    </ul>
                </div>
                <div>
                    <h4 style={{ fontWeight: '700', marginBottom: '16px' }}>Stay Connected</h4>
                    <p style={{ color: '#94a3b8', fontSize: '14px' }}>Follow us for updates and exclusive offers.</p>
                </div>
            </div>
            <div style={{ borderTop: '1px solid #1e293b', marginTop: '40px', paddingTop: '20px', textAlign: 'center', fontSize: '12px', color: '#64748b' }}>
                © 2026 PRO-SHOP. All Rights Reserved.
            </div>
        </footer>
    );
};

export default Footer;
