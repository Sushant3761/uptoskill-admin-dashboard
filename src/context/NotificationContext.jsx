/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useCallback, useRef } from 'react';

export const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);
  const timeouts = useRef({});

  // Helper to remove toast after exit animation completes
  const removeToast = useCallback((id) => {
    // Clear any pending auto-dismiss timeout for this toast
    if (timeouts.current[id]) {
      clearTimeout(timeouts.current[id]);
      delete timeouts.current[id];
    }

    // Set status to exiting to trigger CSS slideOut animation
    setToasts((prev) =>
      prev.map((t) => (t.id === id ? { ...t, exiting: true } : t))
    );

    // Wait 300ms for slide-out animation to finish, then remove from state
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 300);
  }, []);

  const addToast = useCallback((type, message, duration = 4000) => {
    const id = Math.random().toString(36).substring(2, 9);
    
    setToasts((prev) => [
      ...prev,
      {
        id,
        type,
        message,
        exiting: false,
      },
    ]);

    // Handle auto-dismiss
    if (duration > 0) {
      const timer = setTimeout(() => {
        removeToast(id);
      }, duration);
      timeouts.current[id] = timer;
    }

    return id;
  }, [removeToast]);

  const showSuccess = useCallback((message, duration) => addToast('success', message, duration), [addToast]);
  const showError = useCallback((message, duration) => addToast('error', message, duration), [addToast]);
  const showWarning = useCallback((message, duration) => addToast('warning', message, duration), [addToast]);
  const showInfo = useCallback((message, duration) => addToast('info', message, duration), [addToast]);

  return (
    <NotificationContext.Provider
      value={{
        toasts,
        addToast,
        removeToast,
        showSuccess,
        showError,
        showWarning,
        showInfo,
      }}
    >
      {children}
    </NotificationContext.Provider>
  );
};
