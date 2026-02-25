import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';

const Home = () => {
    const [featuredProducts, setFeaturedProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const { data } = await api.get('/products');
                // Just take the first 4 as "featured" for demo
                setFeaturedProducts(data.products.slice(0, 4));
            } catch (error) {
                console.error('Error fetching products', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, []);

    return (
        <div className="section-container animate-fade-up">
            {/* Hero Section */}
            <section className="hero-premium">
                <div className="hero-overlay" />
                <img
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=1470"
                    alt="Hero"
                    className="hero-img"
                />
                <div className="hero-content">
                    <h1 className="hero-title">
                        Elevate Your <span style={{ color: 'var(--accent-primary)' }}>Lifestyle</span>
                    </h1>
                    <p className="hero-subtitle">
                        Curated collection of premium electronics designed for peak performance and aesthetics.
                    </p>
                    <Link to="/products" className="btn-premium btn-primary">
                        Explore Collection <ArrowRight size={20} />
                    </Link>
                </div>
            </section>

            {/* Featured Products */}
            <section style={{ marginBottom: '60px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
                    <h2 style={{ fontSize: '32px', fontWeight: '800' }}>Featured</h2>
                    <Link to="/products" style={{ color: 'var(--accent-primary)', fontWeight: '700' }}>
                        View Shop
                    </Link>
                </div>

                {loading ? (
                    <div className="product-grid">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="glass-panel" style={{ height: '350px', animation: 'pulse 1.5s infinite' }}></div>
                        ))}
                    </div>
                ) : (
                    <div className="product-grid">
                        {featuredProducts.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                )}
            </section>
        </div>
    );
};

export default Home;
