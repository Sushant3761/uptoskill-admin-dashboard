import { useToast } from '../hooks/useToast';

/**
 * Global Toast stack component.
 * Pulls toast notifications directly from the custom useToast context.
 * Features:
 * - Fixed position top-right container.
 * - Auto-dismiss and manual dismiss.
 * - Custom icons based on status type.
 * - Screen-reader ARIA live regions.
 * - CSS-driven slide transitions.
 */
const Toast = () => {
  const { toasts, removeToast } = useToast();

  if (toasts.length === 0) return null;

  const getToastIcon = (type) => {
    switch (type) {
      case 'success':
        return 'fa-solid fa-circle-check';
      case 'error':
        return 'fa-solid fa-circle-xmark';
      case 'warning':
        return 'fa-solid fa-triangle-exclamation';
      case 'info':
      default:
        return 'fa-solid fa-circle-info';
    }
  };

  return (
    <div className="toast-container" aria-label="Notifications stack">
      {toasts.map((toast) => {
        const toastIcon = getToastIcon(toast.type);
        const isError = toast.type === 'error';

        return (
          <div
            key={toast.id}
            className={`toast toast-${toast.type} ${toast.exiting ? 'toast-exiting' : ''}`}
            role={isError ? 'alert' : 'status'}
            aria-live={isError ? 'assertive' : 'polite'}
            aria-atomic="true"
          >
            {/* Type Icon */}
            <div 
              style={{ 
                color: `var(--${toast.type === 'error' ? 'danger' : toast.type}-500)`, 
                fontSize: 'var(--font-size-base)',
                marginTop: '2px',
                display: 'inline-flex',
                flexShrink: 0
              }}
            >
              <i className={toastIcon}></i>
            </div>

            {/* Notification Text */}
            <div className="d-flex flex-col" style={{ flexGrow: 1, gap: 'var(--space-2xs)' }}>
              <span 
                style={{ 
                  fontSize: 'var(--font-size-sm)', 
                  fontWeight: 'var(--font-weight-semibold)',
                  color: 'var(--text-primary)',
                  lineHeight: 'var(--line-height-none)',
                  textTransform: 'capitalize'
                }}
              >
                {toast.type}
              </span>
              <span 
                style={{ 
                  fontSize: 'var(--font-size-xs)', 
                  color: 'var(--text-secondary)',
                  lineHeight: 'var(--line-height-normal)'
                }}
              >
                {toast.message}
              </span>
            </div>

            {/* Dismiss Button */}
            <button
              type="button"
              className="toast-close-btn"
              onClick={() => removeToast(toast.id)}
              aria-label={`Dismiss ${toast.type} notification`}
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
