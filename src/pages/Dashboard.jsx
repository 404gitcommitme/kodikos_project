"use client";

import React, { useState } from 'react';
import UsersList from '../components/UsersList';
import UserDetails from '../components/UserDetails';
import BoxDetails from '../components/BoxDetails';
import '../styles/Dashboard.css';

function Dashboard({ users, onLogout }) {

  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedBox, setSelectedBox] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSelectUser = (user) => {
    setSelectedUser(user);
    setSelectedBox(null);
  };

  const handleSelectBox = (box) => {
    setSelectedBox(box);
  };

  const handleBack = () => {
    if (selectedBox) {
      setSelectedBox(null);
    } else if (selectedUser) {
      setSelectedUser(null);
    }
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-left">
          <div className="logo">🐝</div>
          <div>
            <h1>ApiControl</h1>
            <p>Monitoring Apicole - Données IoT en Temps Réel</p>
          </div>
        </div>
        <button className="logout-button" onClick={onLogout}>
          Sortir
        </button>
      </header>

      <div className="dashboard-content">
        {!selectedUser ? (
          <>
            <div className="search-container" style={{ marginBottom: '20px', padding: '0 40px' }}>
              <input
                type="text"
                placeholder="Rechercher par nom ou wilaya..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 15px',
                  fontSize: '16px',
                  borderRadius: '8px',
                  border: '1px solid #ccc',
                  boxSizing: 'border-box'
                }}
              />
            </div>
            <UsersList
              users={filteredUsers}
              onSelectUser={handleSelectUser}
            />
          </>
        ) : !selectedBox ? (
          <UserDetails
            user={selectedUser}
            onSelectBox={handleSelectBox}
            onBack={handleBack}
          />
        ) : (
          <BoxDetails
            box={selectedBox}
            user={selectedUser}
            onBack={handleBack}
          />
        )}
      </div>
    </div>
  );
}

export default Dashboard;
