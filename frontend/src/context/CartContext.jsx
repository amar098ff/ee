import React, { createContext, useState, useEffect, useContext } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartItems, setCartItems] = useState(() => {
        const savedCart = localStorage.getItem('cartItems');
        return savedCart ? JSON.parse(savedCart) : [];
    });

    useEffect(() => {
        localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }, [cartItems]);

    const addToCart = (product, quantity = 1) => {
        setCartItems((prevItems) => {
            const isItemExist = prevItems.find((i) => i.product === product._id);
            if (isItemExist) {
                return prevItems.map((i) =>
                    i.product === product._id ? { ...i, quantity: i.quantity + quantity } : i
                );
            }
            return [
                ...prevItems,
                {
                    product: product._id,
                    name: product.name,
                    price: product.price,
                    image: product.images[0].url,
                    stock: product.stock,
                    quantity
                }
            ];
        });
    };

    const removeItemFromCart = (id) => {
        setCartItems(cartItems.filter((i) => i.product !== id));
    };

    const updateQuantity = (id, quantity) => {
        setCartItems(
            cartItems.map((i) => (i.product === id ? { ...i, quantity } : i))
        );
    };

    const clearCart = () => setCartItems([]);

    return (
        <CartContext.Provider
            value={{ cartItems, addToCart, removeItemFromCart, updateQuantity, clearCart }}
        >
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
