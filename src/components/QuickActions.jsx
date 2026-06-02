import Button from './Button';

const QuickActions = ({ onActionClick }) => {
  const actions = [
    {
      id: 'create-course',
      label: 'Create Course',
      variant: 'primary',
      icon: 'fa-solid fa-circle-plus',
      duration: '150ms'
    },
    {
      id: 'add-intern',
      label: 'Add Intern',
      variant: 'secondary',
      icon: 'fa-solid fa-user-plus',
      duration: '150ms'
    },
    {
      id: 'manage-approvals',
      label: 'Manage Approvals',
      variant: 'success',
      icon: 'fa-solid fa-circle-check',
      duration: '150ms'
    },
    {
      id: 'generate-reports',
      label: 'Generate Reports',
      variant: 'outline',
      icon: 'fa-solid fa-file-invoice',
      duration: '150ms'
    },
    {
      id: 'add-announcement',
      label: 'Add Announcement',
      variant: 'outline',
      icon: 'fa-solid fa-bullhorn',
      duration: '150ms'
    },
    {
      id: 'view-analytics',
      label: 'View Analytics',
      variant: 'outline',
      icon: 'fa-solid fa-chart-simple',
      duration: '150ms'
    }
  ];

  return (
    <div className="quick-actions-bar">
      <div className="quick-actions-header">
        <i className="fa-solid fa-bolt quick-actions-icon"></i>
        <span className="quick-actions-title">Quick Actions</span>
      </div>
      <div className="quick-actions-group">
        {actions.map((action) => (
          <Button
            key={action.id}
            variant={action.variant}
            onClick={() => onActionClick && onActionClick(action.variant, action.duration, action.id)}
            size="sm"
            className="quick-action-btn"
          >
            <i className={action.icon}></i>
            <span>{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
