const Sidebar = ({ activeTab, setActiveTab, isOpen }) => {
  const activeSidebarClass = isOpen ? 'sidebar-open' : '';

  return (
    <aside className={`sidebar ${activeSidebarClass}`}>
      <div className="sidebar-header">
        <div className="brand-icon" aria-hidden="true">
          <i className="fa-solid fa-layer-group"></i>
        </div>
        <div className="brand-name">UptoSkill Admin</div>
      </div>
      
      <nav className="sidebar-menu" aria-label="Sidebar Navigation">
        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          <li>
            <button
              type="button"
              onClick={() => setActiveTab('showcase')}
              className={`sidebar-nav-item ${activeTab === 'showcase' ? 'active' : ''}`}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              aria-current={activeTab === 'showcase' ? 'page' : undefined}
            >
              <i className="fa-solid fa-wand-magic-sparkles" aria-hidden="true"></i>
              <span>Design Tokens</span>
              <span className="badge badge-primary ml-auto">Core</span>
            </button>
          </li>
          <li>
            <button
              type="button"
              onClick={() => setActiveTab('catalog')}
              className={`sidebar-nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
              style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
              aria-current={activeTab === 'catalog' ? 'page' : undefined}
            >
              <i className="fa-solid fa-cubes" aria-hidden="true"></i>
              <span>Component Catalog</span>
            </button>
          </li>
        </ul>
      </nav>
      
      <footer className="sidebar-footer">
        <div>Admin Dashboard</div>
        <div className="mt-2xs" style={{ opacity: 0.5 }}>v1.0.0</div>
      </footer>
    </aside>
  );
};

export default Sidebar;
