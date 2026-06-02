import Button from './Button';

/**
 * Premium, token-driven Empty State container.
 * Features:
 * - Visually stunning semantic fallbacks with smooth fade-in.
 * - Icon / Graphic display.
 * - Bold headers, secondary directions.
 * - Call to action triggers.
 */
const EmptyState = ({
  title = 'No Data Found',
  description = 'There are currently no items available to display here.',
  icon = 'fa-solid fa-folder-open',
  actionLabel,
  onActionClick
}) => {
  return (
    <div 
      className="empty-state-canvas d-flex flex-col align-center justify-center p-xl text-center"
      style={{
        minHeight: '280px',
        animation: 'modalSlideIn var(--transition-normal) forwards'
      }}
    >
      {/* Visual illustration wrapper */}
      <div 
        className="empty-icon-shield d-flex align-center justify-center mb-md"
        style={{
          width: '72px',
          height: '72px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          color: 'var(--primary-500)',
          fontSize: 'var(--font-size-3xl)'
        }}
      >
        <i className={icon}></i>
      </div>

      <h4 className="h4-premium" style={{ margin: 0, fontWeight: 'var(--font-weight-bold)' }}>
        {title}
      </h4>
      
      <p 
        className="text-color-secondary mt-xs mb-lg"
        style={{ 
          fontSize: 'var(--font-size-sm)', 
          maxWidth: '380px', 
          lineHeight: 'var(--line-height-normal)' 
        }}
      >
        {description}
      </p>

      {actionLabel && onActionClick && (
        <Button 
          variant="primary" 
          size="sm" 
          onClick={onActionClick}
        >
          {actionLabel}
        </Button>
      )}
    </div>
  );
};

export default EmptyState;
