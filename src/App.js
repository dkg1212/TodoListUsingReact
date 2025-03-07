import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Toaster } from 'react-hot-toast';
import { logout } from './slices/authSlice';
import { loadUserTodos } from './slices/todoSlice';
import AppContent from './components/AppContent';
import AppHeader from './components/AppHeader';
import PageTitle from './components/PageTitle';
import LoginPage from './components/LoginPage';
import styles from './styles/modules/app.module.scss';

function App() {
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  // Load user-specific tasks when authentication changes
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(loadUserTodos());
    }
  }, [isAuthenticated, dispatch]);

  if (!isAuthenticated) {
    return <LoginPage />;
  }

  return (
    <>
      <div className="container">
        <div className={styles.app__wrapper}>
          <div className={styles.header}>
            <PageTitle>TODO List</PageTitle>
            <p>Welcome, {user?.username}!</p>
            <button type="button" onClick={() => dispatch(logout())}>
              Logout
            </button>
          </div>
          <AppHeader />
          <AppContent />
        </div>
      </div>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            fontSize: '1.4rem',
          },
        }}
      />
    </>
  );
}

export default App;
