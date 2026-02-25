import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star } from 'lucide-react';
import { useCart } from '../context/CartContext';

const ProductCard = ({ product }) => {
    const { addToCart } = useCart();

    return (
        <div className="product-card-premium">
            <Link to={`/product/${product._id}`}>
                <div className="product-img-wrapper">
                    <img
                        src={product.images[0]?.url || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        className="product-img"
                    />
                    {product.stock <= 0 && (
                        <div style={{ position: 'absolute', top: '15px', right: '15px', backgroundColor: '#ef4444', color: 'white', fontSize: '10px', padding: '4px 8px', borderRadius: '6px', fontWeight: 'bold' }}>
                            SOLD OUT
                        </div>
                    )}
                </div>
            </Link>

            <div className="product-info">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <h3 className="product-name">{product.name}</h3>
                    <span className="product-price">${product.price}</span>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '13px', color: '#f59e0b' }}>
                        <Star size={14} fill="currentColor" />
                        <span style={{ fontWeight: '700', color: 'var(--text-dark)' }}>{product.ratings}</span>
                    </div>

                    <button
                        onClick={() => addToCart(product)}
                        disabled={product.stock <= 0}
                        className="btn-premium btn-primary"
                        style={{ padding: '8px', minWidth: '40px', borderRadius: '10px' }}
                    >
                        <ShoppingCart size={18} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
