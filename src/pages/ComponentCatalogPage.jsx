import { useState, useMemo } from 'react';
import Card from '../components/Card';
import Button from '../components/Button';
import SpacingPlayground from '../components/SpacingPlayground';
import TerminalConsole from '../components/TerminalConsole';
import SkeletonTable from '../components/SkeletonTable';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import { AddInternForm, CreateCourseForm, AddAnnouncementForm } from '../components/AdminForms';
import ConfirmationModal from '../components/ConfirmationModal';
import { useToast } from '../hooks/useToast';
import DataTable from '../components/DataTable';

const ComponentCatalogPage = ({ logs, setLogs, onOpenForm }) => {
  const toast = useToast();
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [activeFormTab, setActiveFormTab] = useState('intern');

  // Phase 5: Intern Directory Table natural state cycles
  // Starts with simulated connection error on first mount to showcase ErrorState and Retry.
  const [tableState, setTableState] = useState('error'); 
  const [internList, setInternList] = useState([
    { name: 'Sarah Connor', email: 's.connor@uptoskill.com', role: 'Software Intern', status: 'Active' },
    { name: 'Kyle Reese', email: 'k.reese@uptoskill.com', role: 'UX/UI Intern', status: 'Active' },
    { name: 'John Connor', email: 'j.connor@uptoskill.com', role: 'Lead Intern', status: 'Pending' },
    { name: 'Ellen Ripley', email: 'e.ripley@uptoskill.com', role: 'Data Science Intern', status: 'Active' }
  ]);

  // Phase 9 States
  const [selectedRows, setSelectedRows] = useState([]);
  const [isBulkConfirmOpen, setIsBulkConfirmOpen] = useState(false);
  const [pendingBulkAction, setPendingBulkAction] = useState({ type: '', items: [] });
  const [singleDeleteEmail, setSingleDeleteEmail] = useState(null);
  const [isSingleDeleteConfirmOpen, setIsSingleDeleteConfirmOpen] = useState(false);

  // DataTable column definitions
  const columns = useMemo(() => [
    {
      header: 'Full Name',
      key: 'name',
      sortable: true,
      render: (row) => (
        <div className="d-flex align-center gap-xs">
          <div 
            className="avatar" 
            style={{ 
              width: '28px', 
              height: '28px', 
              fontSize: '10px', 
              fontWeight: 'var(--font-weight-bold)',
              backgroundColor: 'var(--primary-500)',
              color: '#ffffff',
              borderRadius: 'var(--radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {row.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()}
          </div>
          <span>{row.name}</span>
        </div>
      )
    },
    {
      header: 'Email Address',
      key: 'email',
      sortable: true,
      render: (row) => <span className="text-color-secondary">{row.email}</span>
    },
    {
      header: 'Assigned Role',
      key: 'role',
      sortable: true,
      render: (row) => (
        <span className="role-badge">
          {row.role}
        </span>
      )
    },
    {
      header: 'Status',
      key: 'status',
      sortable: true,
      render: (row) => {
        let statusClass = 'status-pending';
        if (row.status === 'Active') statusClass = 'status-active';
        if (row.status === 'Archived') statusClass = 'status-archived';
        
        return (
          <span className={statusClass}>
            {row.status}
          </span>
        );
      }
    },
    {
      header: 'Remove',
      align: 'center',
      render: (row) => (
        <button
          type="button"
          onClick={() => {
            setSingleDeleteEmail(row.email);
            setIsSingleDeleteConfirmOpen(true);
          }}
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--danger-500)',
            opacity: 0.7,
            transition: 'opacity var(--transition-fast), transform var(--transition-fast)'
          }}
          className="btn-delete-row"
          aria-label={`Remove intern ${row.name}`}
        >
          <i className="fa-solid fa-trash-can" aria-hidden="true"></i>
        </button>
      )
    }
  ], []);

  // DataTable drop-down filters config
  const filters = useMemo(() => [
    {
      key: 'status',
      label: 'Status',
      options: [
        { label: 'Active', value: 'Active' },
        { label: 'Pending', value: 'Pending' },
        { label: 'Archived', value: 'Archived' }
      ]
    },
    {
      key: 'role',
      label: 'Role',
      options: [
        { label: 'Software Intern', value: 'Software Intern' },
        { label: 'UX/UI Intern', value: 'UX/UI Intern' },
        { label: 'Lead Intern', value: 'Lead Intern' },
        { label: 'Data Science Intern', value: 'Data Science Intern' }
      ]
    }
  ], []);

  // Bulk actions handlers
  const handleBulkActionConfirm = () => {
    const selectedEmails = pendingBulkAction.items.map(item => item.email);
    
    if (pendingBulkAction.type === 'archive') {
      setInternList(prev => prev.map(item => 
        selectedEmails.includes(item.email) ? { ...item, status: 'Archived' } : item
      ));
      toast.showSuccess(`Archived ${pendingBulkAction.items.length} intern record(s) successfully.`);
    } else if (pendingBulkAction.type === 'delete') {
      const updated = internList.filter(item => !selectedEmails.includes(item.email));
      setInternList(updated);
      toast.showWarning(`Removed ${pendingBulkAction.items.length} intern record(s) permanently.`);
      
      if (updated.length === 0) {
        setTableState('empty');
      }
    }
    
    // Cleanup selection & close modal
    setSelectedRows([]);
    setIsBulkConfirmOpen(false);
  };

  const handleSingleDeleteConfirm = () => {
    if (!singleDeleteEmail) return;
    const updated = internList.filter(item => item.email !== singleDeleteEmail);
    setInternList(updated);
    toast.showWarning(`Permanently removed intern: ${singleDeleteEmail}`);
    
    if (updated.length === 0) {
      setTableState('empty');
    }
    
    // Clear deleted item from selection array if it was checked
    setSelectedRows(prev => prev.filter(item => item.email !== singleDeleteEmail));
    setIsSingleDeleteConfirmOpen(false);
    setSingleDeleteEmail(null);
  };

  // DataTable bulk actions config
  const bulkActions = useMemo(() => [
    {
      label: 'Archive Selected',
      icon: 'fa-solid fa-box-archive',
      variant: 'warning',
      onClick: (selected) => {
        setPendingBulkAction({ type: 'archive', items: selected });
        setIsBulkConfirmOpen(true);
      }
    },
    {
      label: 'Delete Selected',
      icon: 'fa-solid fa-trash-can',
      variant: 'danger',
      onClick: (selected) => {
        setPendingBulkAction({ type: 'delete', items: selected });
        setIsBulkConfirmOpen(true);
      }
    }
  ], []);

  const handleBtnClick = (variant, duration = '150ms') => {
    const timestamp = new Date().toLocaleTimeString();
    const newLog = {
      time: timestamp,
      variant: variant,
      duration: duration
    };
    setLogs((prevLogs) => [newLog, ...prevLogs].slice(0, 10));
  };

  const handleClearLogs = () => {
    setLogs([]);
  };

  // Simulated Retry action triggered from ErrorState retry button
  const handleRetryTable = () => {
    setTableState('loading');
    toast.showInfo('Re-synchronizing database connection...');
    
    // Simulates a loading shimmer cycle of 1.2s before displaying table
    setTimeout(() => {
      setTableState('loaded');
      toast.showSuccess('Intern directory database connected successfully.');
    }, 1200);
  };



  const handleResetList = () => {
    setTableState('loading');
    setSelectedRows([]); // Reset selection on refresh
    setTimeout(() => {
      setInternList([
        { name: 'Sarah Connor', email: 's.connor@uptoskill.com', role: 'Software Intern', status: 'Active' },
        { name: 'Kyle Reese', email: 'k.reese@uptoskill.com', role: 'UX/UI Intern', status: 'Active' },
        { name: 'John Connor', email: 'j.connor@uptoskill.com', role: 'Lead Intern', status: 'Pending' },
        { name: 'Ellen Ripley', email: 'e.ripley@uptoskill.com', role: 'Data Science Intern', status: 'Active' }
      ]);
      setTableState('loaded');
      toast.showSuccess('Intern database directories refreshed.');
    }, 800);
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

    // Synchronize inline Add Intern form submissions
    if (activeFormTab === 'intern') {
      const newName = successMessage.match(/"([^"]+)"/) ? successMessage.match(/"([^"]+)"/)[1] : 'New Intern';
      
      const newRecord = {
        name: newName,
        email: `intern.${Date.now().toString().slice(-4)}@uptoskill.com`,
        role: 'Software Intern',
        status: 'Active'
      };
      
      setInternList((prev) => [newRecord, ...prev]);
      setTableState('loaded');
      toast.showSuccess(`Intern directory updated: "${newName}" file added.`);
    } else {
      toast.showSuccess(successMessage);
    }
  };

  return (
    <div className="dashboard-section active">
      <div className="component-catalog-section">
        
        <div className="catalog-column">
          
          {/* Buttons showcase */}
          <Card>
            <Card.Header>
              <h3 className="h3-premium">Button Component Hierarchy</h3>
              <span className="badge badge-primary">Buttons</span>
            </Card.Header>
            
            <div className="catalog-group">
              <h4 className="h5-premium catalog-group-title">Filled States</h4>
              <div className="button-demo-grid">
                <Button variant="primary" onClick={() => handleBtnClick('primary')}>Primary Button</Button>
                <Button variant="secondary" onClick={() => handleBtnClick('secondary')}>Secondary</Button>
                <Button variant="success" onClick={() => handleBtnClick('success')}>Success</Button>
                <Button variant="warning" onClick={() => handleBtnClick('warning')}>Warning</Button>
                <Button variant="danger" onClick={() => handleBtnClick('danger')}>Danger</Button>
              </div>
            </div>

            <div className="catalog-group mt-lg">
              <h4 className="h5-premium catalog-group-title">Sizing Framework</h4>
              <div className="button-demo-grid">
                <Button variant="primary" size="sm" onClick={() => handleBtnClick('primary')}>Small (sm)</Button>
                <Button variant="primary" size="md" onClick={() => handleBtnClick('primary')}>Medium (md)</Button>
                <Button variant="primary" size="lg" onClick={() => handleBtnClick('primary')}>Large (lg)</Button>
              </div>
            </div>

            <div className="catalog-group mt-lg">
              <h4 className="h5-premium catalog-group-title">Outline & Borderless Text</h4>
              <div className="button-demo-grid">
                <Button variant="outline" onClick={() => handleBtnClick('outline')}>Outline Action</Button>
                <Button variant="text" onClick={() => handleBtnClick('text')}>Borderless Text</Button>
                <Button variant="primary" disabled>Disabled State</Button>
              </div>
            </div>
          </Card>

          {/* Cards showcase */}
          <Card>
            <Card.Header>
              <h3 className="h3-premium">Card Component Grid</h3>
              <span className="badge badge-primary">Cards</span>
            </Card.Header>

            <div className="d-grid gap-lg" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
              <Card className="p-md">
                <h4 className="h4-premium">Standard Card</h4>
                <p className="mt-xs text-color-secondary" style={{ fontSize: 'var(--font-size-sm)' }}>
                  Simple content container utilizing <code>--shadow-card</code>, <code>--radius-md</code>, and linear margin/paddings.
                </p>
              </Card>
              
              <Card
                interactive
                className="p-md"
                onClick={() => handleBtnClick('outline', '300ms')}
              >
                <div className="d-flex align-center justify-between">
                  <h4 className="h4-premium text-color-primary">Interactive Card</h4>
                  <i className="fa-solid fa-arrow-up-right-from-square text-color-secondary" style={{ fontSize: 'var(--font-size-xs)' }}></i>
                </div>
                <p className="mt-xs text-color-secondary" style={{ fontSize: 'var(--font-size-sm)' }}>
                  Lifts up by <code>-4px</code>, alters border color, and glows with <code>--shadow-hover</code> when hovered.
                </p>
              </Card>
            </div>

            <Card className="mt-lg p-0">
              <Card.Header className="px-lg py-md m-0">
                <div className="d-flex align-center gap-xs">
                  <i className="fa-solid fa-cubes-stacked text-color-secondary"></i>
                  <h4 className="h4-premium">Structured Document Card</h4>
                </div>
                <span className="badge badge-primary">Standard</span>
              </Card.Header>
              
              <div className="px-lg py-md">
                <p className="text-color-secondary" style={{ fontSize: 'var(--font-size-sm)' }}>
                  Completely organized using strict sub-containers. The header and footer borders are driven strictly by the structural design token <code>--border-color</code>, ensuring a flawless visual grid matching light/dark states.
                </p>
              </div>
              
              <Card.Footer className="px-lg py-md m-0">
                <Button variant="outline" size="sm" onClick={() => handleBtnClick('outline')}>Dismiss</Button>
                <Button variant="primary" size="sm" onClick={() => handleBtnClick('primary')}>Proceed</Button>
              </Card.Footer>
            </Card>
          </Card>

          {/* Premium Form Showcase Section */}
          <Card>
            <Card.Header>
              <h3 className="h3-premium">Administrative Forms Suite</h3>
              <span className="badge badge-primary">Forms & Feedback</span>
            </Card.Header>

            <p className="text-color-secondary mb-md" style={{ fontSize: 'var(--font-size-xs)' }}>
              Select an administrative form below to test real-time validation schemas, strict design token styling, and interactive error/success workflows.
            </p>

            {/* Custom Tab Switcher */}
            <div 
              className="form-tabs-container d-flex gap-xs mb-lg"
              style={{
                borderBottom: '1px solid var(--border-color)',
                paddingBottom: 'var(--space-xs)'
              }}
            >
              <button
                type="button"
                onClick={() => setActiveFormTab('intern')}
                className={`btn btn-text btn-sm ${activeFormTab === 'intern' ? 'active-tab' : ''}`}
                style={{
                  color: activeFormTab === 'intern' ? 'var(--primary-500)' : 'var(--text-secondary)',
                  fontWeight: activeFormTab === 'intern' ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                  borderBottom: activeFormTab === 'intern' ? '2px solid var(--primary-500)' : '2px solid transparent',
                  borderRadius: 0,
                  padding: 'var(--space-xs) var(--space-sm)',
                  boxShadow: 'none',
                  cursor: 'pointer'
                }}
              >
                <i className="fa-solid fa-user-plus mr-2xs"></i>
                Add Intern
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('course')}
                className={`btn btn-text btn-sm ${activeFormTab === 'course' ? 'active-tab' : ''}`}
                style={{
                  color: activeFormTab === 'course' ? 'var(--primary-500)' : 'var(--text-secondary)',
                  fontWeight: activeFormTab === 'course' ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                  borderBottom: activeFormTab === 'course' ? '2px solid var(--primary-500)' : '2px solid transparent',
                  borderRadius: 0,
                  padding: 'var(--space-xs) var(--space-sm)',
                  boxShadow: 'none',
                  cursor: 'pointer'
                }}
              >
                <i className="fa-solid fa-circle-plus mr-2xs"></i>
                Create Course
              </button>
              <button
                type="button"
                onClick={() => setActiveFormTab('announcement')}
                className={`btn btn-text btn-sm ${activeFormTab === 'announcement' ? 'active-tab' : ''}`}
                style={{
                  color: activeFormTab === 'announcement' ? 'var(--primary-500)' : 'var(--text-secondary)',
                  fontWeight: activeFormTab === 'announcement' ? 'var(--font-weight-bold)' : 'var(--font-weight-medium)',
                  borderBottom: activeFormTab === 'announcement' ? '2px solid var(--primary-500)' : '2px solid transparent',
                  borderRadius: 0,
                  padding: 'var(--space-xs) var(--space-sm)',
                  boxShadow: 'none',
                  cursor: 'pointer'
                }}
              >
                <i className="fa-solid fa-bullhorn mr-2xs"></i>
                Add Announcement
              </button>
            </div>

            {/* Dynamic Form Render */}
            <div className="active-form-wrapper" style={{ minHeight: '300px' }}>
              {activeFormTab === 'intern' && (
                <AddInternForm onComplete={handleFormComplete} />
              )}
              {activeFormTab === 'course' && (
                <CreateCourseForm onComplete={handleFormComplete} />
              )}
              {activeFormTab === 'announcement' && (
                <AddAnnouncementForm onComplete={handleFormComplete} />
              )}
            </div>
          </Card>

          {/* NEW Phase 5: Intern Directory Registry (Dynamic Table States) */}
          <Card>
            <Card.Header>
              <div className="d-flex align-center gap-xs">
                <i className="fa-solid fa-folder-open text-color-secondary"></i>
                <h3 className="h3-premium">Intern Directory Registry</h3>
              </div>
              <div className="d-flex gap-xs align-center">
                {tableState === 'loaded' && (
                  <Button variant="outline" size="sm" onClick={handleResetList} title="Refresh records list">
                    <i className="fa-solid fa-rotate-right"></i>
                  </Button>
                )}
                <span className="badge badge-primary">Live Database</span>
              </div>
            </Card.Header>

            <div 
              className="table-state-container" 
              style={{ minHeight: '260px', display: 'flex', flexDirection: 'column' }}
              aria-busy={tableState === 'loading' ? 'true' : 'false'}
            >
              {/* ERROR STATE */}
              {tableState === 'error' && (
                <ErrorState 
                  title="Database Synchronize Failure"
                  description="A temporary network timeout occurred. The local directory is currently offline and unable to retrieve intern profiles."
                  onRetry={handleRetryTable}
                />
              )}

              {/* SKELETON LOADING STATE */}
              {tableState === 'loading' && (
                <SkeletonTable rows={4} />
              )}

              {/* EMPTY STATE */}
              {tableState === 'empty' && (
                <EmptyState 
                  title="No Registered Interns Found"
                  description="There are currently no active profiles in this administrative registry. Register an intern to populate records."
                  icon="fa-solid fa-users-slash"
                  actionLabel="Register New Intern"
                  onActionClick={() => {
                    if (onOpenForm) onOpenForm('add-intern');
                  }}
                />
              )}

              {/* LOADED STATE TABLE */}
              {tableState === 'loaded' && (
                <DataTable
                  data={internList}
                  columns={columns}
                  filters={filters}
                  bulkActions={bulkActions}
                  rowKey="email"
                  selectedRows={selectedRows}
                  onSelectionChange={setSelectedRows}
                  emptyTitle="No Intern Records Found"
                  emptyDescription="There are currently no active profiles matching your filters."
                />
              )}
            </div>
          </Card>

          {/* Modal & Toast Notification System Showcase */}
          <Card>
            <Card.Header>
              <div className="d-flex align-center gap-xs">
                <i className="fa-solid fa-bell text-color-secondary"></i>
                <h3 className="h3-premium">Notification & Dialog Systems (Showcase)</h3>
              </div>
              <span className="badge badge-primary">Demo Showcase</span>
            </Card.Header>

            <div className="catalog-group">
              <h4 className="h5-premium catalog-group-title">Toast Stack Triggers</h4>
              <div className="button-demo-grid" style={{ marginBottom: 'var(--space-md)' }}>
                <Button variant="success" size="sm" onClick={() => toast.showSuccess('Component catalog test: success!')}>
                  Show Success Toast
                </Button>
                <Button variant="danger" size="sm" onClick={() => toast.showError('Component catalog test: error!')}>
                  Show Error Toast
                </Button>
                <Button variant="warning" size="sm" onClick={() => toast.showWarning('Component catalog test: warning!')}>
                  Show Warning Toast
                </Button>
                <Button variant="primary" size="sm" onClick={() => toast.showInfo('Component catalog test: info!')}>
                  Show Info Toast
                </Button>
              </div>
            </div>

            <div className="catalog-group mt-lg">
              <h4 className="h5-premium catalog-group-title">Confirmation Overlay</h4>
              <div>
                <Button variant="outline" size="md" onClick={() => setIsConfirmOpen(true)}>
                  <i className="fa-solid fa-circle-question mr-2xs"></i>
                  Trigger Confirmation Modal
                </Button>
              </div>
            </div>
          </Card>

        </div>

        <div className="catalog-column">
          <SpacingPlayground />
          <TerminalConsole logs={logs} onClear={handleClearLogs} />
        </div>

      </div>

      <ConfirmationModal
        open={isConfirmOpen}
        title="Delete Administrative Entry?"
        description="This action is irreversible. Proceeding will permanently purge this demo entry from the virtual registry."
        confirmLabel="Purge Entry"
        cancelLabel="Keep Entry"
        onConfirm={() => {
          setIsConfirmOpen(false);
          toast.showSuccess('Administrative entry successfully purged.');
        }}
        onCancel={() => {
          setIsConfirmOpen(false);
          toast.showInfo('Purge action aborted.');
        }}
        variant="danger"
      />

      {/* Phase 9: Bulk Action Confirmation Modal */}
      <ConfirmationModal
        open={isBulkConfirmOpen}
        title={pendingBulkAction.type === 'archive' ? 'Archive Intern Records?' : 'Delete Intern Records?'}
        description={
          pendingBulkAction.type === 'archive'
            ? `Are you sure you want to archive the ${pendingBulkAction.items.length} selected intern record(s)? This will set their status to Archived.`
            : `Are you sure you want to permanently delete the ${pendingBulkAction.items.length} selected intern record(s)? This action is irreversible.`
        }
        confirmLabel={pendingBulkAction.type === 'archive' ? 'Archive Records' : 'Delete Records'}
        cancelLabel="Cancel"
        onConfirm={handleBulkActionConfirm}
        onCancel={() => setIsBulkConfirmOpen(false)}
        variant={pendingBulkAction.type === 'archive' ? 'warning' : 'danger'}
      />

      {/* Phase 9: Single Record Delete Confirmation Modal */}
      <ConfirmationModal
        open={isSingleDeleteConfirmOpen}
        title="Delete Intern Profile?"
        description={`Are you sure you want to permanently delete the profile file for ${singleDeleteEmail}? This action cannot be undone.`}
        confirmLabel="Delete Profile"
        cancelLabel="Keep Profile"
        onConfirm={handleSingleDeleteConfirm}
        onCancel={() => {
          setIsSingleDeleteConfirmOpen(false);
          setSingleDeleteEmail(null);
        }}
        variant="danger"
      />
    </div>
  );
};

export default ComponentCatalogPage;
