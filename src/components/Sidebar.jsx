const Sidebar = ({ activeTab, setActiveTab, isOpen }) => {
  const activeSidebarClass = isOpen ? 'sidebar-open' : '';

  return (
    <aside className={`sidebar ${activeSidebarClass}`}>
      <div className="sidebar-header">
        <div className="brand-icon">
          <i className="fa-solid fa-layer-group"></i>
        </div>
        <div className="brand-name">UptoSkill Admin</div>
      </div>
      
      <ul className="sidebar-menu">
        <li>
          <button
            onClick={() => setActiveTab('showcase')}
            className={`sidebar-nav-item ${activeTab === 'showcase' ? 'active' : ''}`}
            style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
          >
            <i className="fa-solid fa-wand-magic-sparkles"></i>
            <span>Design Tokens</span>
            <span className="badge badge-primary ml-auto">Core</span>
          </button>
        </li>
        <li>
          <button
            onClick={() => setActiveTab('catalog')}
            className={`sidebar-nav-item ${activeTab === 'catalog' ? 'active' : ''}`}
            style={{ width: '100%', background: 'none', border: 'none', textAlign: 'left' }}
          >
            <i className="fa-solid fa-cubes"></i>
            <span>Component Catalog</span>
          </button>
        </li>
      </ul>
      
      <div className="sidebar-footer">
        <div>Admin Dashboard</div>
        <div className="mt-2xs" style={{ opacity: 0.5 }}>v1.0.0</div>
      </div>
    </aside>
  );
};

export default Sidebar;
