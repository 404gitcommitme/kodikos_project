"use client";

import React, { useState, useEffect } from 'react';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const res = await fetch('http://192.168.15.125:8000/api/admin/hive-stats/', { cache: 'no-store' });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      const transformed = transformHiveStats(json);
      setUsers(transformed);
      console.log('Fetched hive-stats:', json);
      setIsLoggedIn(true);
    } catch (err) {
      console.error('Failed fetching hive-stats:', err);
      // fallback to mock data so the UI still works
      setUsers(getMockUsers());
      setIsLoggedIn(true);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUsers([]);
  };

  return (
    <div className="app">
      {isLoggedIn ? (
        <Dashboard users={users} onLogout={handleLogout} />
      ) : (
        <LoginPage onLogin={handleLogin} loading={loading} />
      )}
    </div>
  );
}

// Données mock avec structure hiérarchique
function getMockUsers() {
  return [
    {
      id: 'user1',
      name: 'Jean Dupont',
      email: 'jean@apicole.fr',
      location: 'Provence',
      boxes: [
        {
          id: 'box1',
          name: 'Box 1 - Ruche Nord',
          status: 'healthy',
          sensors: [
            {
              id: 'sensor1',
              name: 'Humidité',
              type: 'humidity',
              data: [
                { timestamp: '14:30', value: 65, unit: '%' },
                { timestamp: '14:45', value: 68, unit: '%' },
                { timestamp: '15:00', value: 70, unit: '%' },
                { timestamp: '15:15', value: 69, unit: '%' },
              ]
            },
            {
              id: 'sensor2',
              name: 'CO₂',
              type: 'co2',
              data: [
                { timestamp: '14:30', value: 420, unit: 'ppm' },
                { timestamp: '14:45', value: 435, unit: 'ppm' },
                { timestamp: '15:00', value: 445, unit: 'ppm' },
                { timestamp: '15:15', value: 440, unit: 'ppm' },
              ]
            },
            {
              id: 'sensor3',
              name: 'Pression',
              type: 'pressure',
              data: [
                { timestamp: '14:30', value: 1013, unit: 'hPa' },
                { timestamp: '14:45', value: 1012, unit: 'hPa' },
                { timestamp: '15:00', value: 1011, unit: 'hPa' },
                { timestamp: '15:15', value: 1012, unit: 'hPa' },
              ]
            },
          ]
        },
        {
          id: 'box2',
          name: 'Box 2 - Ruche Sud',
          status: 'warning',
          sensors: [
            {
              id: 'sensor4',
              name: 'Humidité',
              type: 'humidity',
              data: [
                { timestamp: '14:30', value: 75, unit: '%' },
                { timestamp: '14:45', value: 78, unit: '%' },
                { timestamp: '15:00', value: 80, unit: '%' },
                { timestamp: '15:15', value: 79, unit: '%' },
              ]
            },
            {
              id: 'sensor5',
              name: 'Température',
              type: 'temperature',
              data: [
                { timestamp: '14:30', value: 35, unit: '°C' },
                { timestamp: '14:45', value: 36, unit: '°C' },
                { timestamp: '15:00', value: 37, unit: '°C' },
                { timestamp: '15:15', value: 36.5, unit: '°C' },
              ]
            },
          ]
        },
      ]
    },
    {
      id: 'user2',
      name: 'Marie Laurent',
      email: 'marie@apicole.fr',
      location: 'Aquitaine',
      boxes: [
        {
          id: 'box3',
          name: 'Box 1 - Ruche Principale',
          status: 'healthy',
          sensors: [
            {
              id: 'sensor6',
              name: 'Humidité',
              type: 'humidity',
              data: [
                { timestamp: '14:30', value: 62, unit: '%' },
                { timestamp: '14:45', value: 64, unit: '%' },
                { timestamp: '15:00', value: 66, unit: '%' },
                { timestamp: '15:15', value: 65, unit: '%' },
              ]
            },
          ]
        },
      ]
    },
  ];
}

// Transform backend `hive-stats` response to the frontend users/boxes/sensors shape
function transformHiveStats(data) {
  if (!data || !Array.isArray(data.users_statistics)) return [];

  return data.users_statistics.map((entry) => {
    const u = entry.user || {};
    return {
      id: String(u.id ?? u.username ?? Math.random()),
      name: u.username || u.name || `user-${u.id}`,
      email: u.email || '',
      location: u.wilaya_name || u.wilaya_code || '',
      boxes: (entry.hives || []).map((hEntry) => {
        const hive = hEntry.hive || {};
        const latest = hive.latest_reading || null;

        // map backend status to simple status used in UI
        const status = (hive.status === 'offline' || hive.status === 'never_connected') ? 'warning' : 'healthy';

        // build sensors array from latest_reading and sensor_stats keys
        const sensors = [];
        const sensorTypes = ['temperature', 'humidity', 'weight', 'co2', 'vibration'];
        sensorTypes.forEach((type) => {
          const latestVal = latest && (latest[type] ?? null);
          const stats = hEntry.sensor_stats && hEntry.sensor_stats[type];
          if (latestVal != null || stats) {
            sensors.push({
              id: `${hive.id}-${type}`,
              name: type,
              type,
              // keep an array of recent values; backend doesn't provide timeseries here, so include latest if available
              data: latestVal != null ? [{ timestamp: latest.timestamp || hive.last_reading_at || '', value: latestVal }] : [],
              stats: stats || null,
            });
          }
        });

        return {
          id: String(hive.id ?? hive.hive_id ?? Math.random()),
          name: hive.name || hive.hive_id || `hive-${hive.id}`,
          status,
          sensors,
        };
      })
    };
  });
}

export default App;
