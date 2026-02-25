import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ShoppingCart, Star, ChevronLeft, ShieldCheck, Truck, RefreshCw, CheckCircle2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import api from '../utils/api';

const ProductDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { addToCart } = useCart();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [quantity, setQuantity] = useState(1);
    const [activeImage, setActiveImage] = useState(0);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const { data } = await api.get(`/product/${id}`);
                setProduct(data.product);
            } catch (error) {
                console.error('Error fetching product', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return (
        <div className="flex items-center justify-center min-h-[400px]">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-600"></div>
        </div>
    );

    if (!product) return <div>Product not found</div>;

    return (
        <div className="section-container animate-fade-up" style={{ padding: '20px' }}>
            <button
                onClick={() => navigate(-1)}
                className="nav-link"
                style={{ marginBottom: '32px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: '700' }}
            >
                <ChevronLeft size={18} /> Back to shop
            </button>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '60px' }}>
                {/* Gallery */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                    <div className="glass-panel" style={{ aspectRatio: '1', overflow: 'hidden', padding: '0' }}>
                        <img
                            src={product.images[activeImage]?.url}
                            alt={product.name}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </div>
                    <div style={{ display: 'flex', gap: '16px', overflowX: 'auto', paddingBottom: '10px' }}>
                        {product.images.map((img, index) => (
                            <button
                                key={index}
                                onClick={() => setActiveImage(index)}
                                style={{
                                    width: '90px', height: '90px', borderRadius: '16px', overflow: 'hidden',
                                    border: activeImage === index ? '3px solid var(--accent-primary)' : '2px solid transparent',
                                    cursor: 'pointer', flexShrink: 0, padding: '0'
                                }}
                            >
                                <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                            </button>
                        ))}
                    </div>
                </div>

                {/* Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                    <div>
                        <span style={{ fontSize: '13px', fontWeight: '800', color: 'var(--accent-primary)', textTransform: 'uppercase', letterSpacing: '2px', display: 'block', marginBottom: '12px' }}>
                            {product.category}
                        </span>
                        <h1 style={{ fontSize: '48px', fontWeight: '900', color: 'var(--text-dark)', lineHeight: '1.1', marginBottom: '20px' }}>{product.name}</h1>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: '#f59e0b' }}>
                                <Star size={20} fill="currentColor" />
                                <span style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-dark)' }}>{product.ratings}</span>
                            </div>
                            <span style={{ color: 'var(--text-light)', fontSize: '14px' }}>{product.numOfReviews} Verified Reviews</span>
                        </div>
                    </div>

                    <div style={{ fontSize: '42px', fontWeight: '900', color: 'var(--accent-primary)' }}>${product.price}</div>

                    <p style={{ fontSize: '17px', color: 'var(--text-light)', lineHeight: '1.8' }}>{product.description}</p>

                    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', borderTop: '1px solid #e2e8f0', borderBottom: '1px solid #e2e8f0', padding: '32px 0' }}>
                        <div className="glass-panel" style={{ display: 'flex', alignItems: 'center', padding: '4px' }}>
                            <button
                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                className="btn-premium btn-secondary"
                                style={{ width: '45px', height: '45px', padding: '0', fontSize: '20px' }}
                            >
                                -
                            </button>
                            <span style={{ width: '50px', textAlign: 'center', fontWeight: '800', fontSize: '18px' }}>{quantity}</span>
                            <button
                                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                                className="btn-premium btn-secondary"
                                style={{ width: '45px', height: '45px', padding: '0', fontSize: '20px' }}
                            >
                                +
                            </button>
                        </div>

                        <button
                            onClick={() => addToCart(product, quantity)}
                            disabled={product.stock <= 0}
                            className="btn-premium btn-primary"
                            style={{ flex: 1, padding: '20px', fontSize: '16px' }}
                        >
                            <ShoppingCart size={22} style={{ marginRight: '10px' }} /> Add to Bag
                        </button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                        {[
                            { icon: <Truck size={18} />, text: 'Express Delivery' },
                            { icon: <ShieldCheck size={18} />, text: 'Secure Checkout' },
                            { icon: <RefreshCw size={18} />, text: 'Free Returns' },
                            { icon: <CheckCircle2 size={18} />, text: 'Best Price' }
                        ].map((benefit, i) => (
                            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '14px', color: 'var(--text-light)', fontWeight: '600' }}>
                                <div style={{ color: 'var(--accent-primary)' }}>{benefit.icon}</div>
                                {benefit.text}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetails;
