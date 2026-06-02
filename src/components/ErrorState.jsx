import Button from './Button';

/**
 * Premium, token-driven Error State container.
 * Features:
 * - Alert shield visuals.
 * - Dynamic explanation support.
 * - Interactive retry action.
 */
const ErrorState = ({
  title = 'Failed to load records',
  description = 'A server timeout or connection breakdown occurred while communicating with the database.',
  icon = 'fa-solid fa-triangle-exclamation',
  onRetry
}) => {
  return (
    <div 
      className="error-state-canvas d-flex flex-col align-center justify-center p-xl text-center"
      style={{
        minHeight: '280px',
        animation: 'modalSlideIn var(--transition-normal) forwards'
      }}
      role="alert"
      aria-live="assertive"
    >
      {/* Failure Visual Shield */}
      <div 
        className="error-icon-shield d-flex align-center justify-center mb-md"
        style={{
          width: '72px',
          height: '72px',
          borderRadius: 'var(--radius-full)',
          backgroundColor: 'rgba(244, 63, 94, 0.08)',
          color: 'var(--danger-500)',
          fontSize: 'var(--font-size-3xl)'
        }}
      >
        <i className={icon}></i>
      </div>

      <h4 className="h4-premium" style={{ margin: 0, fontWeight: 'var(--font-weight-bold)', color: 'var(--text-primary)' }}>
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

      {onRetry && (
        <Button 
          variant="danger" 
          size="sm" 
          onClick={onRetry}
          className="d-flex align-center gap-xs"
        >
          <i className="fa-solid fa-rotate-right"></i>
          <span>Retry Connection</span>
        </Button>
      )}
    </div>
  );
};

export default ErrorState;
