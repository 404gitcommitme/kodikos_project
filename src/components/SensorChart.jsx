import React from 'react';
import '../styles/SensorChart.css';

function SensorChart({ sensor }) {
  const data = sensor.data;
  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const avgValue = (data.reduce((acc, d) => acc + d.value, 0) / data.length).toFixed(1);
  const lastValue = data[data.length - 1].value;

  // Calculer les hauteurs de barres
  const range = maxValue - minValue || 1;
  const barHeights = data.map(d => ((d.value - minValue) / range) * 100);

  return (
    <div className="sensor-card fade-in">
      <div className="sensor-header">
        <div className="sensor-title">
          <span className="sensor-icon">{getSensorEmoji(sensor.type)}</span>
          <h4>{sensor.name}</h4>
        </div>
        <div className="sensor-value">
          <span className="value">{lastValue}</span>
          <span className="unit">{sensor.data[0].unit}</span>
        </div>
      </div>

      <div className="sensor-stats">
        <div className="stat">
          <span className="stat-label">Max</span>
          <span className="stat-value">{maxValue}{sensor.data[0].unit}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Moy</span>
          <span className="stat-value">{avgValue}{sensor.data[0].unit}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Min</span>
          <span className="stat-value">{minValue}{sensor.data[0].unit}</span>
        </div>
      </div>

      <div className="chart-container">
        <div className="mini-chart">
          {data.map((point, idx) => (
            <div 
              key={idx}
              className="bar"
              style={{ height: `${barHeights[idx]}%` }}
              title={`${point.timestamp}: ${point.value}${point.unit}`}
            ></div>
          ))}
        </div>
      </div>

      <div className="data-table">
        <table>
          <tbody>
            {data.map((point, idx) => (
              <tr key={idx}>
                <td className="timestamp">{point.timestamp}</td>
                <td className="value-cell">{point.value}{point.unit}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function getSensorEmoji(type) {
  const emojis = {
    'humidity': '💧',
    'temperature': '🌡️',
    'pressure': '🔬',
    'co2': '💨',
  };
  return emojis[type] || '📊';
}

export default SensorChart;
