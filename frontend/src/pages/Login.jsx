import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, Lock, User, LogIn } from 'lucide-react';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            await login(email, password);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Login failed. Please check your credentials.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="glass-panel auth-wrapper animate-fade-up">
            <div style={{ marginBottom: '40px' }}>
                <div style={{ background: 'rgba(59, 130, 246, 0.1)', width: '70px', height: '70px', borderRadius: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', color: 'var(--accent-primary)' }}>
                    <LogIn size={32} style={{ margin: 'auto' }} />
                </div>
                <h2 style={{ fontSize: '32px', fontWeight: '900', marginBottom: '8px' }}>Login</h2>
                <p style={{ color: 'var(--text-light)', fontWeight: '500' }}>Welcome back to PRO-SHOP</p>
            </div>

            {error && (
                <div style={{ background: '#fef2f2', color: '#ef4444', padding: '16px', borderRadius: '12px', fontSize: '14px', marginBottom: '24px', fontWeight: 'bold', border: '1px solid #fee2e2' }}>
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <div style={{ position: 'relative' }}>
                        <Mail size={18} style={{ position: 'absolute', left: '16px', top: '18px', color: 'var(--text-light)' }} />
                        <input
                            type="email"
                            required
                            className="form-input"
                            style={{ paddingLeft: '48px' }}
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label className="form-label">Password</label>
                    <div style={{ position: 'relative' }}>
                        <Lock size={18} style={{ position: 'absolute', left: '16px', top: '18px', color: 'var(--text-light)' }} />
                        <input
                            type="password"
                            required
                            className="form-input"
                            style={{ paddingLeft: '48px' }}
                            placeholder="••••••••"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="btn-premium btn-primary"
                    style={{ width: '100%', padding: '18px', marginTop: '12px', fontSize: '16px' }}
                >
                    {loading ? 'Authenticating...' : 'Sign In Now'}
                </button>
            </form>

            <div style={{ marginTop: '32px', color: 'var(--text-light)', fontSize: '14px', fontWeight: '600' }}>
                New here?{' '}
                <Link to="/register" style={{ color: 'var(--accent-primary)', fontWeight: '800' }}>
                    Create an Account
                </Link>
            </div>
        </div>
    );
};

export default Login;
