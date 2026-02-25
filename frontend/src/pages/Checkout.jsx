import React, { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import api from '../utils/api';
import { ShieldCheck, Truck, CreditCard, ShoppingBag, CheckCircle2 } from 'lucide-react';

const CheckoutForm = ({ total, shippingInfo }) => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const { cartItems, clearCart } = useCart();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!stripe || !elements) return;

        setLoading(true);
        setError('');

        try {
            const { data } = await api.post('/payment/process', { amount: Math.round(total * 100) });
            const clientSecret = data.client_secret;

            const result = await stripe.confirmCardPayment(clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: shippingInfo.name,
                        email: shippingInfo.email,
                    },
                },
            });

            if (result.error) {
                setError(result.error.message);
            } else {
                if (result.paymentIntent.status === 'succeeded') {
                    const order = {
                        shippingInfo,
                        orderItems: cartItems,
                        paymentInfo: {
                            id: result.paymentIntent.id,
                            status: result.paymentIntent.status,
                        },
                        itemsPrice: subtotal,
                        taxPrice: subtotal * 0.08,
                        shippingPrice: subtotal > 500 ? 0 : 25,
                        totalPrice: total,
                    };

                    await api.post('/order/new', order);
                    clearCart();
                    navigate('/success');
                }
            }
        } catch (err) {
            console.error(err);
            setError('Payment processing failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            <div className="glass-panel" style={{ padding: '24px', border: '1px solid #e2e8f0', background: 'white' }}>
                <CardElement options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#0f172a',
                            '::placeholder': { color: '#94a3b8' },
                            fontFamily: 'Inter, sans-serif'
                        }
                    }
                }} />
            </div>

            {error && (
                <div style={{ color: '#ef4444', fontSize: '14px', background: '#fef2f2', padding: '16px', borderRadius: '12px', textAlign: 'center', fontWeight: 'bold' }}>
                    {error}
                </div>
            )}

            <button
                type="submit"
                disabled={loading || !stripe || !elements}
                className="btn-premium btn-primary"
                style={{ width: '100%', padding: '24px', fontSize: '18px', borderRadius: '20px' }}
            >
                {loading ? 'Processing Securely...' : `Complete Payment - $${total.toFixed(2)}`}
            </button>

            <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', color: 'var(--text-light)', fontSize: '12px', fontWeight: '800' }}>
                <span>🔒 SSL SECURE</span>
                <span>💳 PCI COMPLIANT</span>
            </div>
        </form>
    );
};

const Checkout = () => {
    const { cartItems } = useCart();
    const { user } = useAuth();
    const [stripePromise, setStripePromise] = useState(null);
    const [step, setStep] = useState(1);
    const [shippingInfo, setShippingInfo] = useState({
        name: user?.name || '',
        email: user?.email || '',
        address: '', city: '', state: '', country: '', pinCode: '', phoneNo: ''
    });

    useEffect(() => {
        const getStripeKey = async () => {
            try {
                const { data } = await api.get('/stripeapikey');
                setStripePromise(loadStripe(data.stripeApiKey));
            } catch (error) {
                console.error("Failed to load Stripe key", error);
            }
        };
        getStripeKey();
    }, []);

    const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const total = subtotal + (subtotal > 500 ? 0 : 25) + (subtotal * 0.08);

    const handleShippingSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    if (cartItems.length === 0) {
        return <div className="section-container" style={{ textAlign: 'center', padding: '100px 20px' }}>
            <h2 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text-light)' }}>Your cart is empty</h2>
        </div>;
    }

    return (
        <div className="section-container animate-fade-up">
            {/* Stepper */}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '80px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '60px', position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, color: step >= 1 ? 'var(--accent-primary)' : 'var(--text-light)' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '20px', border: '3px solid', borderColor: step >= 1 ? 'var(--accent-primary)' : '#e2e8f0', background: step >= 1 ? 'var(--accent-primary)' : 'white', color: step >= 1 ? 'white' : 'inherit' }}>1</div>
                        <span style={{ fontSize: '14px', fontWeight: '900', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Shipping</span>
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', zIndex: 10, color: step >= 2 ? 'var(--accent-primary)' : 'var(--text-light)' }}>
                        <div style={{ width: '60px', height: '60px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '900', fontSize: '20px', border: '3px solid', borderColor: step >= 2 ? 'var(--accent-primary)' : '#e2e8f0', background: step >= 2 ? 'var(--accent-primary)' : 'white', color: step >= 2 ? 'white' : 'inherit' }}>2</div>
                        <span style={{ fontSize: '14px', fontWeight: '900', marginTop: '12px', textTransform: 'uppercase', letterSpacing: '1px' }}>Payment</span>
                    </div>
                    <div style={{ position: 'absolute', top: '30px', left: '0', width: '100%', height: '3px', background: '#e2e8f0', zIndex: 5 }}>
                        <div style={{ height: '100%', background: 'var(--accent-primary)', transition: 'width 0.5s cubic-bezier(0.4, 0, 0.2, 1)', width: step === 1 ? '0%' : '100%' }} />
                    </div>
                </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px', alignItems: 'flex-start' }}>
                <div style={{ flex: 1.5 }}>
                    {step === 1 ? (
                        <div className="glass-panel" style={{ padding: '60px' }}>
                            <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <Truck size={36} style={{ color: 'var(--accent-primary)' }} /> Shipping Info
                            </h2>
                            <form onSubmit={handleShippingSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Full Name</label>
                                    <input className="form-input" required value={shippingInfo.name} onChange={(e) => setShippingInfo({ ...shippingInfo, name: e.target.value })} />
                                </div>
                                <div className="form-group-email" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Email Address</label>
                                    <input className="form-input" type="email" required value={shippingInfo.email} onChange={(e) => setShippingInfo({ ...shippingInfo, email: e.target.value })} />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Street Address</label>
                                    <input className="form-input" required value={shippingInfo.address} onChange={(e) => setShippingInfo({ ...shippingInfo, address: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">City</label>
                                    <input className="form-input" required value={shippingInfo.city} onChange={(e) => setShippingInfo({ ...shippingInfo, city: e.target.value })} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Pin Code</label>
                                    <input className="form-input" required value={shippingInfo.pinCode} onChange={(e) => setShippingInfo({ ...shippingInfo, pinCode: e.target.value })} />
                                </div>
                                <div className="form-group" style={{ gridColumn: 'span 2' }}>
                                    <label className="form-label">Phone Number</label>
                                    <input className="form-input" required value={shippingInfo.phoneNo} onChange={(e) => setShippingInfo({ ...shippingInfo, phoneNo: e.target.value })} />
                                </div>
                                <button type="submit" className="btn-premium btn-primary" style={{ gridColumn: 'span 2', padding: '24px', marginTop: '24px', fontSize: '18px', borderRadius: '20px' }}>
                                    Continue to Payment
                                </button>
                            </form>
                        </div>
                    ) : (
                        <div className="glass-panel" style={{ padding: '60px' }}>
                            <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '48px', display: 'flex', alignItems: 'center', gap: '20px' }}>
                                <ShieldCheck size={36} style={{ color: 'var(--accent-primary)' }} /> Secure Payment
                            </h2>
                            {stripePromise && (
                                <Elements stripe={stripePromise}>
                                    <CheckoutForm total={total} shippingInfo={shippingInfo} />
                                </Elements>
                            )}
                        </div>
                    )}
                </div>

                <aside className="glass-panel" style={{ padding: '40px' }}>
                    <h2 style={{ fontSize: '24px', fontWeight: '900', marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <ShoppingBag size={24} style={{ color: 'var(--text-light)' }} /> Order Summary
                    </h2>

                    <div style={{ maxHeight: '300px', overflowY: 'auto', marginBottom: '40px', paddingRight: '12px' }}>
                        {cartItems.map(item => (
                            <div key={item._id} style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px', alignItems: 'center' }}>
                                <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
                                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', background: '#f8fafc', padding: '4px', border: '1px solid #e2e8f0' }}>
                                        <img src={item.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                                    </div>
                                    <div>
                                        <p style={{ fontSize: '14px', fontWeight: '900', color: 'var(--text-dark)', margin: 0 }}>{item.name}</p>
                                        <p style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-light)', margin: 0 }}>Qty: {item.quantity}</p>
                                    </div>
                                </div>
                                <span style={{ fontWeight: '900', color: 'var(--accent-primary)', fontSize: '15px' }}>${(item.price * item.quantity).toFixed(2)}</span>
                            </div>
                        ))}
                    </div>

                    <div style={{ borderTop: '1px solid #e2e8f0', paddingTop: '32px' }}>
                        <h3 style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-light)', textTransform: 'uppercase', marginBottom: '16px' }}>Total Amount</h3>
                        <div style={{ fontSize: '56px', fontWeight: '900', color: 'var(--accent-primary)', letterSpacing: '-2px' }}>
                            ${total.toFixed(2)}
                        </div>
                    </div>
                </aside>
            </div>
        </div>
    );
};

export default Checkout;
