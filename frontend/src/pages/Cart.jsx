import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ShieldCheck, Minus, Plus } from 'lucide-react';
import { useCart } from '../context/CartContext';

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity } = useCart();
    const navigate = useNavigate();

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = subtotal > 500 ? 0 : 25;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;

    if (cartItems.length === 0) {
        return (
            <div className="section-container animate-fade-up" style={{ textAlign: 'center', padding: '80px 20px' }}>
                <div style={{ background: '#f1f5f9', width: '120px', height: '120px', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 40px', color: '#94a3b8' }}>
                    <ShoppingBag size={64} />
                </div>
                <h2 style={{ fontSize: '48px', fontWeight: '900', color: 'var(--text-dark)', marginBottom: '16px' }}>Your bag is empty</h2>
                <p style={{ fontSize: '18px', color: 'var(--text-light)', maxWidth: '500px', margin: '0 auto 48px', fontWeight: '500' }}>
                    Looks like you haven't added anything to your cart yet. Explore our premium collection and find something you'll love!
                </p>
                <Link to="/products" className="btn-premium btn-primary" style={{ padding: '20px 40px', fontSize: '18px' }}>
                    Continue Shopping <ArrowRight size={20} style={{ marginLeft: '12px' }} />
                </Link>
            </div>
        );
    }

    return (
        <div className="section-container animate-fade-up">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '60px' }}>
                <h1 style={{ fontSize: '56px', fontWeight: '900', letterSpacing: '-2px' }}>Your <span style={{ color: 'var(--accent-primary)' }}>Bag</span></h1>
                <span style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-light)', background: '#f1f5f9', padding: '8px 20px', borderRadius: '14px' }}>
                    {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                </span>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'flex-start' }}>
                {/* Cart Items */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    {cartItems.map((item) => (
                        <div key={item._id} className="glass-panel" style={{ padding: '24px', display: 'flex', gap: '32px', alignItems: 'center' }}>
                            <div style={{ width: '120px', height: '120px', borderRadius: '20px', overflow: 'hidden', flexShrink: 0, background: '#f8fafc' }}>
                                <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                            </div>

                            <div style={{ flex: 1 }}>
                                <Link to={`/product/${item._id}`} style={{ fontSize: '20px', fontWeight: '900', color: 'var(--text-dark)', marginBottom: '8px', display: 'block' }}>{item.name}</Link>
                                <div style={{ fontSize: '22px', fontWeight: '900', color: 'var(--accent-primary)' }}>${item.price.toFixed(2)}</div>

                                <div style={{ display: 'flex', alignItems: 'center', gap: '24px', marginTop: '20px' }}>
                                    <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '4px', background: 'white' }}>
                                        <button
                                            onClick={() => updateQuantity(item._id, Math.max(1, item.quantity - 1))}
                                            className="btn-premium btn-secondary"
                                            style={{ width: '36px', height: '36px', padding: '0', borderRadius: '10px' }}
                                        >
                                            <Minus size={16} />
                                        </button>
                                        <span style={{ width: '40px', textAlign: 'center', fontWeight: '900', fontSize: '18px' }}>{item.quantity}</span>
                                        <button
                                            onClick={() => updateQuantity(item._id, Math.min(item.stock, item.quantity + 1))}
                                            className="btn-premium btn-secondary"
                                            style={{ width: '36px', height: '36px', padding: '0', borderRadius: '10px' }}
                                        >
                                            <Plus size={16} />
                                        </button>
                                    </div>

                                    <button
                                        onClick={() => removeFromCart(item._id)}
                                        style={{ color: '#ef4444', background: '#fef2f2', border: 'none', cursor: 'pointer', padding: '10px', borderRadius: '12px', display: 'flex', alignItems: 'center', transition: 'all 0.2s ease' }}
                                        onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
                                        onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <aside className="glass-panel" style={{ padding: '40px', position: 'sticky', top: '100px' }}>
                    <h2 style={{ fontSize: '28px', fontWeight: '900', marginBottom: '40px' }}>Order Summary</h2>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)', fontWeight: '700', fontSize: '16px' }}>
                            <span>Subtotal</span>
                            <span>${subtotal.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)', fontWeight: '700', fontSize: '16px' }}>
                            <span>Shipping</span>
                            <span style={{ color: shipping === 0 ? '#10b981' : 'inherit' }}>{shipping === 0 ? 'FREE' : `$${shipping.toFixed(2)}`}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--text-light)', fontWeight: '700', fontSize: '16px', paddingBottom: '24px', borderBottom: '1px solid #e2e8f0' }}>
                            <span>Estimated Tax</span>
                            <span>${tax.toFixed(2)}</span>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: '900', fontSize: '32px', marginTop: '12px' }}>
                            <span>Total</span>
                            <span style={{ color: 'var(--accent-primary)' }}>${total.toFixed(2)}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/checkout')}
                        className="btn-premium btn-primary"
                        style={{ width: '100%', padding: '24px', fontSize: '18px', borderRadius: '20px' }}
                    >
                        Checkout Now <ArrowRight size={20} style={{ marginLeft: '12px' }} />
                    </button>

                    <div style={{ marginTop: '32px', textAlign: 'center', fontSize: '14px', color: 'var(--text-light)', fontWeight: '700', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
                        <ShieldCheck size={18} style={{ color: '#10b981' }} /> Secure payment processing
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Cart;
