import { useState, useEffect, useCallback } from 'react';
import DashboardLayout from './layouts/DashboardLayout';
import DesignTokensPage from './pages/DesignTokensPage';
import ComponentCatalogPage from './pages/ComponentCatalogPage';
import Modal from './components/Modal';
import LoadingOverlay from './components/LoadingOverlay';
import Toast from './components/Toast';
import { AddInternForm, CreateCourseForm, AddAnnouncementForm } from './components/AdminForms';
import { NotificationProvider } from './context/NotificationContext';
import { useToast } from './hooks/useToast';

function AppContent() {
  const toast = useToast();

  // Theme state setup (light by default, checking localStorage first)
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('admin-theme');
    if (savedTheme === 'dark' || savedTheme === 'light') {
      return savedTheme;
    }
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    return systemPrefersDark ? 'dark' : 'light';
  });

  // Tab state setup
  const [activeTab, setActiveTab] = useState('showcase');

  // Logs state for the action event console
  const [logs, setLogs] = useState([]);

  // Modal states for Quick Actions
  const [activeForm, setActiveForm] = useState(null); // 'create-course' | 'add-intern' | 'add-announcement' | null

  // Phase 5: Loading state
  const [isTransitioning, setIsTransitioning] = useState(false);

  // Intercept tab changes with a lightweight transition loader
  const handleTabChange = useCallback((tabId) => {
    if (tabId === activeTab) return;
    setIsTransitioning(true);
    
    setTimeout(() => {
      setActiveTab(tabId);
      setIsTransitioning(false);
      
      // Broadcast navigation toast for micro feedback
      const label = tabId === 'showcase' ? 'Core Design Tokens' : 'Administrative Component Catalog';
      toast.showInfo(`Navigated to ${label}`);
    }, 450);
  }, [activeTab, toast]);

  // Apply theme class to body
  useEffect(() => {
    if (theme === 'dark') {
      document.body.classList.add('dark-theme');
      localStorage.setItem('admin-theme', 'dark');
    } else {
      document.body.classList.remove('dark-theme');
      localStorage.setItem('admin-theme', 'light');
    }
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    toast.showInfo(`Switched theme to ${nextTheme.toUpperCase()} mode.`);
  };

  const handleActionClick = (variant, duration = '150ms', actionId = null) => {
    const timestamp = new Date().toLocaleTimeString();
    const formActions = ['create-course', 'add-intern', 'add-announcement'];
    
    if (actionId && formActions.includes(actionId)) {
      setActiveForm(actionId);
      
      const newLog = {
        time: timestamp,
        variant: variant,
        duration: duration,
        message: `Opened form modal: [${actionId.toUpperCase()}]`
      };
      setLogs((prevLogs) => [newLog, ...prevLogs].slice(0, 10));
      toast.showInfo(`Opening registration form for: ${actionId.replace('-', ' ')}`);
    } else {
      // Standard button log
      const newLog = {
        time: timestamp,
        variant: variant,
        duration: duration,
        message: `Action triggered: ${variant.toUpperCase()} button clicked.`
      };
      setLogs((prevLogs) => [newLog, ...prevLogs].slice(0, 10));
      toast.showSuccess(`${variant.toUpperCase()} action processed.`);
    }
  };

  const handleFormComplete = (successMessage) => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = {
      time: timestamp,
      variant: 'success',
      duration: '300ms',
      message: `SUCCESS: ${successMessage}`
    };
    setLogs((prevLogs) => [newLog, ...prevLogs].slice(0, 10));
    
    // Trigger Success Toast
    toast.showSuccess(successMessage);
    
    // Auto close modal after brief delay
    setTimeout(() => {
      setActiveForm(null);
    }, 1800);
  };

  const getModalTitle = () => {
    switch (activeForm) {
      case 'create-course':
        return 'Schedule New Course';
      case 'add-intern':
        return 'Register New Intern';
      case 'add-announcement':
        return 'Broadcast Announcement';
      default:
        return '';
    }
  };

  return (
    <>
      <DashboardLayout
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        theme={theme}
        toggleTheme={toggleTheme}
        onActionClick={handleActionClick}
      >
        {activeTab === 'showcase' && <DesignTokensPage />}
        {activeTab === 'catalog' && (
          <ComponentCatalogPage logs={logs} setLogs={setLogs} onOpenForm={setActiveForm} />
        )}
      </DashboardLayout>

      {/* Accessible Quick Action Modals */}
      <Modal
        open={activeForm !== null}
        onClose={() => setActiveForm(null)}
        title={getModalTitle()}
      >
        {activeForm === 'add-intern' && (
          <AddInternForm onComplete={handleFormComplete} />
        )}
        {activeForm === 'create-course' && (
          <CreateCourseForm onComplete={handleFormComplete} />
        )}
        {activeForm === 'add-announcement' && (
          <AddAnnouncementForm onComplete={handleFormComplete} />
        )}
      </Modal>

      {/* Phase 5 Page Loader Transition Overlay */}
      <LoadingOverlay isOpen={isTransitioning} message="Loading admin layouts..." />

      {/* Phase 5 Stacking Toast Popups */}
      <Toast />
    </>
  );
}

function App() {
  return (
    <NotificationProvider>
      <AppContent />
    </NotificationProvider>
  );
}

export default App;
