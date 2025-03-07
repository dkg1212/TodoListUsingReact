import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../slices/authSlice';
import styles from '../styles/modules/login.module.scss';

function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleLogin = () => {
    if (!username.trim() || !password.trim()) {
      alert('Please enter both username and password');
      return;
    }

    const storedUsers = JSON.parse(localStorage.getItem('users')) || {};

    if (storedUsers[username]) {
      if (storedUsers[username] === password) {
        dispatch(login({ username }));
      } else {
        dispatch(login({ username }));
      }
    } else {
      storedUsers[username] = password;
      localStorage.setItem('users', JSON.stringify(storedUsers));
      dispatch(login({ username }));
    }
  };

  return (
    <div className={styles.loginWrapper}>
      <div className={styles.loginBox}>
        <h2>Sign In</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className={styles.inputField}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={styles.inputField}
        />
        <button
          type="button"
          className={styles.loginButton}
          onClick={handleLogin}
        >
          Sign In
        </button>
        <p className={styles.footerText}>
          New here? <span className={styles.signUpText}>Sign up now</span>.
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
