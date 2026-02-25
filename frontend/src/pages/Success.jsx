import React from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle, Package, ArrowRight } from 'lucide-react';

const Success = () => {
    return (
        <div className="section-container animate-fade-up" style={{ textAlign: 'center', padding: '80px 20px' }}>
            <div style={{ background: '#f0fdf4', width: '120px', height: '120px', borderRadius: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 40px', color: '#22c55e' }}>
                <CheckCircle size={64} />
            </div>
            <h1 style={{ fontSize: '56px', fontWeight: '900', color: 'var(--text-dark)', marginBottom: '16px', letterSpacing: '-2px' }}>Success!</h1>
            <p style={{ fontSize: '20px', color: 'var(--text-light)', maxWidth: '600px', margin: '0 auto 60px', fontWeight: '500', lineHeight: '1.6' }}>
                Your payment has been processed successfully. Your premium gear is officially on its way to you!
            </p>

            <Link
                to="/"
                className="btn-premium btn-primary"
                style={{ padding: '24px 48px', fontSize: '18px' }}
            >
                Explore More <ArrowRight size={20} style={{ marginLeft: '12px' }} />
            </Link>
        </div>
    );
};

export default Success;
