import React, { useState } from "react";
import useAuth from "./useAuth";

const Authentication = () => {
  const { user, isAuthenticated, login, logout } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    // Mock API call
    const mockUser = { username };
    const mockToken = "fake-jwt-token";
    login(mockUser, mockToken);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div className="auth-container">
      {isAuthenticated ? (
        <div>
          <h2>Welcome, {user.username}!</h2>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
};

export default Authentication;
