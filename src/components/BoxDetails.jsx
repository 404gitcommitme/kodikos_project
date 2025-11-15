import React from 'react';
import SensorChart from './SensorChart';
import '../styles/BoxDetails.css';

function BoxDetails({ box, user, onBack }) {
  return (
    <div className="box-details-container">
      <div className="details-header">
        <button className="back-button" onClick={onBack}>
          ← Retour
        </button>
        <div className="breadcrumb">
          <span>{user.name}</span>
          <span>/</span>
          <span>{box.name}</span>
        </div>
      </div>

      <div className="box-header-info">
        <h2>{box.name}</h2>
        <span className={`status-badge status-${box.status}`}>
          {box.status === 'healthy' ? '✓ Normal' : '⚠ Attention'}
        </span>
      </div>

      <div className="sensors-container">
        <h3>Capteurs et Données</h3>
        <div className="sensors-list">
          {box.sensors.map((sensor) => (
            <SensorChart 
              key={sensor.id}
              sensor={sensor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default BoxDetails;
