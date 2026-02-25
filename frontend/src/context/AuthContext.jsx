import React, { createContext, useState, useEffect, useContext } from 'react';
import api from '../utils/api';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const loadUser = async () => {
            try {
                const token = localStorage.getItem('token');
                if (token) {
                    const { data } = await api.get('/me');
                    setUser(data.user);
                }
            } catch (_) {
                // Token invalid or expired, just clear it
                localStorage.removeItem('token');
            } finally {
                setLoading(false);
            }
        };
        loadUser();
    }, []);

    const login = async (email, password) => {
        const { data } = await api.post('/login', { email, password });
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data;
    };

    const register = async (userData) => {
        const { data } = await api.post('/register', userData);
        localStorage.setItem('token', data.token);
        setUser(data.user);
        return data;
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, register, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
