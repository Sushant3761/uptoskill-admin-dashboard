import { useState } from 'react';
import Sidebar from '../components/Sidebar';
import Header from '../components/Header';
import QuickActions from '../components/QuickActions';

const DashboardLayout = ({
  children,
  activeTab,
  setActiveTab,
  theme,
  toggleTheme,
  onActionClick
}) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="admin-shell">
      {/* Backdrop overlay for mobile collapsible sidebar */}
      {sidebarOpen && (
        <div 
          className="sidebar-backdrop"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        ></div>
      )}
      
      <Sidebar 
        activeTab={activeTab} 
        setActiveTab={(tab) => {
          setActiveTab(tab);
          setSidebarOpen(false); // Auto close sidebar drawer when switching tabs on mobile
        }} 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <main className="main-wrapper">
        <Header 
          theme={theme} 
          toggleTheme={toggleTheme} 
          sidebarOpen={sidebarOpen}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        <div className="content-body">
          <QuickActions onActionClick={onActionClick} />
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;
