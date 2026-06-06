const Header = ({ theme, toggleTheme, sidebarOpen, toggleSidebar }) => {
  return (
    <header className="main-header">
      <div className="header-meta">
        {/* Responsive Hamburger Toggle trigger */}
        <button
          type="button"
          onClick={toggleSidebar}
          className="sidebar-toggle-trigger"
          aria-label={sidebarOpen ? 'Close navigation sidebar' : 'Open navigation sidebar'}
          aria-expanded={sidebarOpen ? 'true' : 'false'}
        >
          <i className={sidebarOpen ? 'fa-solid fa-xmark' : 'fa-solid fa-bars'} aria-hidden="true"></i>
        </button>

        <h1 className="h3-premium text-color-primary header-title" style={{ margin: 0 }}>
          Admin System Console
        </h1>
        <span className="header-meta-divider" style={{ color: 'var(--text-tertiary)', fontSize: 'var(--font-size-xs)' }}>|</span>
        <span className="header-meta-sub" style={{
          color: 'var(--text-secondary)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-medium)'
        }}>
          Design System
        </span>
      </div>
      
      <div className="header-actions">
        <button
          onClick={toggleTheme}
          className="btn btn-outline btn-sm"
          style={{ cursor: 'pointer' }}
        >
          <i className={theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon'} aria-hidden="true"></i>
          <span className="theme-toggle-text">{theme === 'dark' ? 'Light Mode' : 'Dark Mode'}</span>
        </button>
        
        <div className="user-profile">
          <div className="avatar">US</div>
          <div className="d-flex flex-col ml-xs user-profile-details">
            <span style={{
              fontSize: 'var(--font-size-sm)',
              fontWeight: 'var(--font-weight-semibold)',
              color: 'var(--text-primary)',
              lineHeight: 'var(--line-height-none)'
            }}>
              Intern Suite
            </span>
            <span style={{
              fontSize: 'var(--font-size-xs)',
              color: 'var(--text-tertiary)',
              marginTop: '2px'
            }}>
              Administrator
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
