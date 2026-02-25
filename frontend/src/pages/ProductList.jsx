import React, { useState, useEffect } from 'react';
import api from '../utils/api';
import ProductCard from '../components/ProductCard';
import { Filter, SlidersHorizontal } from 'lucide-react';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [priceRange, setPriceRange] = useState([0, 2000]);
    const [sort, setSort] = useState('latest');

    const categories = ['Electronics', 'Clothing', 'Home', 'Beauty', 'Other'];

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
            try {
                // Simple client-side filtering for demonstration
                const { data } = await api.get('/products');
                let filtered = data.products;

                if (category) {
                    filtered = filtered.filter(p => p.category === category);
                }

                filtered = filtered.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

                if (sort === 'price-low') {
                    filtered.sort((a, b) => a.price - b.price);
                } else if (sort === 'price-high') {
                    filtered.sort((a, b) => b.price - a.price);
                }

                setProducts(filtered);
            } catch (error) {
                console.error('Error fetching products', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [category, priceRange, sort]);

    return (
        <div style={{ display: 'flex', gap: '40px', alignItems: 'flex-start' }}>
            {/* Sidebar Filters */}
            <aside className="glass-panel" style={{ width: '280px', padding: '32px', position: 'sticky', top: '100px' }}>
                <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Filter size={18} /> Categories
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <button
                        onClick={() => setCategory('')}
                        className={`nav-link ${!category ? 'active' : ''}`}
                        style={{ padding: '10px 16px', borderRadius: '12px', textAlign: 'left', background: !category ? 'var(--accent-primary)' : 'transparent', color: !category ? 'white' : 'inherit' }}
                    >
                        All Products
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setCategory(cat)}
                            className="nav-link"
                            style={{ padding: '10px 16px', borderRadius: '12px', textAlign: 'left', background: category === cat ? 'var(--accent-primary)' : 'transparent', color: category === cat ? 'white' : 'inherit' }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <div style={{ marginTop: '40px' }}>
                    <h3 style={{ fontSize: '18px', fontWeight: '800', marginBottom: '20px' }}>Max Price: ${priceRange[1]}</h3>
                    <input
                        type="range"
                        min="0"
                        max="2000"
                        step="50"
                        value={priceRange[1]}
                        onChange={(e) => setPriceRange([0, parseInt(e.target.value)])}
                        style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
                    />
                </div>
            </aside>

            {/* Main Content */}
            <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px' }}>
                    <h1 style={{ fontSize: '36px', fontWeight: '800' }}>
                        {category || 'Shop'}
                    </h1>

                    <select
                        value={sort}
                        onChange={(e) => setSort(e.target.value)}
                        className="form-input"
                        style={{ width: 'auto', padding: '8px 16px', fontWeight: '600' }}
                    >
                        <option value="latest">Latest First</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                    </select>
                </div>

                {loading ? (
                    <div className="product-grid">
                        {[1, 2, 3, 4, 5, 6].map((i) => (
                            <div key={i} className="glass-panel" style={{ height: '350px', animation: 'pulse 1.5s infinite' }}></div>
                        ))}
                    </div>
                ) : products.length > 0 ? (
                    <div className="product-grid">
                        {products.map((product) => (
                            <ProductCard key={product._id} product={product} />
                        ))}
                    </div>
                ) : (
                    <div className="glass-panel" style={{ padding: '80px', textAlign: 'center' }}>
                        <h3 style={{ fontSize: '20px', color: 'var(--text-light)' }}>No products found in this category.</h3>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductList;
