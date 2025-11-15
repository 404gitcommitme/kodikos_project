import React from 'react';
import '../styles/UsersList.css';

function UsersList({ users, onSelectUser }) {
  return (
    <div className="users-list-container">
      <div className="list-header">
        <h2>Apiculteurs</h2>
        <span className="count">{users.length} apiculteurs</span>
      </div>

      <div className="users-grid">
        {users.map((user) => (
          <div 
            key={user.id}
            className="user-card fade-in"
            onClick={() => onSelectUser(user)}
          >
            <div className="user-icon">👤</div>
            <h3>{user.name}</h3>
            <p className="email">{user.email}</p>
            <p className="location">📍 {user.location}</p>
            <div className="user-stats">
              <div className="stat">
                <span className="stat-value">{user.boxes.length}</span>
                <span className="stat-label">Ruches</span>
              </div>
              <div className="stat">
                <span className="stat-value">{user.boxes.reduce((acc, box) => acc + box.sensors.length, 0)}</span>
                <span className="stat-label">Capteurs</span>
              </div>
            </div>
            <button className="view-button">Voir détails →</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UsersList;
