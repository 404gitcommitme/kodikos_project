import React from 'react';
import '../styles/LoginPage.css';

function LoginPage({ onLogin, loading }) {
  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="logo">🐝</div>
          <h1>ApiControl</h1>
          <p>Dashboard Admin - Gestion des Ruches</p>
        </div>

        <div className="login-content">
          <div className="status-badge">Production</div>
          
          <button 
            className={`login-button ${loading ? 'loading' : ''}`}
            onClick={onLogin}
            disabled={loading}
          >
            {loading ? (
              <>
                <span className="spinner"></span>
                Connexion en cours...
              </>
            ) : (
              'Entrer au Dashboard'
            )}
          </button>
        </div>

        <div className="login-footer">
          <p>© 2025 ApiControl - Monitoring Apicole IoT</p>
        </div>
      </div>

      <div className="background-animation">
        <div className="shape shape1"></div>
        <div className="shape shape2"></div>
        <div className="shape shape3"></div>
      </div>
    </div>
  );
}

export default LoginPage;
