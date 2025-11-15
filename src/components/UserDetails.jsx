import React from 'react';
import '../styles/UserDetails.css';

function UserDetails({ user, onSelectBox, onBack }) {
  return (
    <div className="user-details-container">
      <div className="details-header">
        <button className="back-button" onClick={onBack}>
          ← Retour
        </button>
        <div className="user-header-info">
          <div className="user-avatar">👤</div>
          <div>
            <h2>{user.name}</h2>
            <p>{user.email} • {user.location}</p>
          </div>
        </div>
      </div>

      <div className="boxes-section">
        <h3>Ruches ({user.boxes.length})</h3>
        <div className="boxes-grid">
          {user.boxes.map((box) => (
            <div 
              key={box.id}
              className={`box-card fade-in status-${box.status}`}
              onClick={() => onSelectBox(box)}
            >
              <div className="box-header">
                <h4>{box.name}</h4>
                <span className={`status-badge status-${box.status}`}>
                  {box.status === 'healthy' ? '✓ Normal' : '⚠ Attention'}
                </span>
              </div>
              
              <div className="sensors-info">
                <p><strong>{box.sensors.length}</strong> capteurs</p>
                <div className="sensor-types">
                  {box.sensors.map((sensor) => (
                    <span key={sensor.id} className="sensor-type">
                      {getSensorIcon(sensor.type)}
                    </span>
                  ))}
                </div>
              </div>

              <button className="view-button">Voir capteurs →</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function getSensorIcon(type) {
  const icons = {
    'humidity': '💧',
    'temperature': '🌡️',
    'pressure': '🔬',
    'co2': '💨',
  };
  return icons[type] || '📊';
}

export default UserDetails;
