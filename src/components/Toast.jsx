/**
 * Reusable Stack-Based Toast system.
 * Types supported:
 * - success: green (var(--success-500))
 * - error: red (var(--danger-500))
 * - warning: orange (var(--warning-500))
 * - info: blue (var(--primary-500))
 * 
 * Features:
 * - Fixed positioning at top right.
 * - Dynamic tokens styling.
 * - Aria live notifications.
 */
const Toast = ({ toasts = [], onClose }) => {
  if (toasts.length === 0) return null;

  return (
    <div 
      className="toast-container"
      style={{
        position: 'fixed',
        top: 'var(--space-md)',
        right: 'var(--space-md)',
        zIndex: 2100,
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-xs)',
        width: '320px',
        maxWidth: 'calc(100vw - var(--space-xl))'
      }}
    >
      {toasts.map((toast) => {
        // Build style and icons based on alert type
        let borderHighlightColor;
        let toastIcon;
        let bgStyleColor = 'var(--bg-card)';
        
        switch (toast.type) {
          case 'success':
            borderHighlightColor = 'var(--success-500)';
            toastIcon = 'fa-solid fa-circle-check';
            break;
          case 'error':
            borderHighlightColor = 'var(--danger-500)';
            toastIcon = 'fa-solid fa-circle-xmark';
            break;
          case 'warning':
            borderHighlightColor = 'var(--warning-500)';
            toastIcon = 'fa-solid fa-triangle-exclamation';
            break;
          case 'info':
          default:
            borderHighlightColor = 'var(--primary-500)';
            toastIcon = 'fa-solid fa-circle-info';
            break;
        }

        return (
          <div
            key={toast.id}
            className={`toast-item toast-item-${toast.type} d-flex align-start gap-xs`}
            style={{
              backgroundColor: bgStyleColor,
              border: '1px solid var(--border-color)',
              borderLeft: `4px solid ${borderHighlightColor}`,
              borderRadius: 'var(--radius-sm)',
              boxShadow: 'var(--shadow-modal)',
              padding: 'var(--space-sm) var(--space-md)',
              animation: 'toastSlideIn var(--transition-fast) forwards',
              position: 'relative'
            }}
            role={toast.type === 'error' ? 'alert' : 'status'}
            aria-live={toast.type === 'error' ? 'assertive' : 'polite'}
          >
            {/* Status Icon */}
            <div 
              style={{ 
                color: borderHighlightColor, 
                fontSize: 'var(--font-size-base)',
                marginTop: '1px'
              }}
            >
              <i className={toastIcon}></i>
            </div>

            {/* Content text */}
            <div className="d-flex flex-col" style={{ width: '100%' }}>
              <span 
                style={{ 
                  fontSize: 'var(--font-size-sm)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                  lineHeight: 'var(--line-height-tight)'
                }}
              >
                {toast.type.toUpperCase()}
              </span>
              <span 
                style={{ 
                  fontSize: 'var(--font-size-xs)', 
                  color: 'var(--text-secondary)',
                  marginTop: 'var(--space-2xs)',
                  lineHeight: 'var(--line-height-normal)'
                }}
              >
                {toast.message}
              </span>
            </div>

            {/* Manual Dismiss button */}
            <button
              onClick={() => onClose && onClose(toast.id)}
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-tertiary)',
                padding: 'var(--space-2xs)',
                fontSize: 'var(--font-size-xs)',
                borderRadius: 'var(--radius-sm)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color var(--transition-fast)'
              }}
              aria-label="Dismiss alert"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default Toast;
