import React from 'react';
import { useSelector } from 'react-redux';
// eslint-disable-next-line import/no-unresolved
import LoginPage from './components/LoginPage';
// eslint-disable-next-line import/no-unresolved
import MainApp from './components/MainApp';

function App() {
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  return isAuthenticated ? <MainApp /> : <LoginPage />;
}

export default App;
