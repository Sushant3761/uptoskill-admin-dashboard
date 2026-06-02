/**
 * Premium, token-driven loading overlay.
 * Features:
 * - Soft backdrop blur using design system tokens.
 * - Elegant spinner showing non-blocking layout animations.
 * - Accessibility properties (role="progressbar", aria-busy="true").
 */
const LoadingOverlay = ({ isOpen = false, message = 'Loading workspace resources...' }) => {
  if (!isOpen) return null;

  return (
    <div 
      className="loading-overlay-backdrop"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(15, 23, 42, 0.45)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
        zIndex: 2000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'var(--space-md)',
        animation: 'modalSlideIn var(--transition-fast) forwards'
      }}
      role="progressbar"
      aria-busy="true"
      aria-valuetext={message}
    >
      <div 
        className="loading-overlay-spinner"
        style={{
          width: '42px',
          height: '42px',
          border: '3px solid var(--neutral-300)',
          borderTopColor: 'var(--primary-500)',
          borderRadius: 'var(--radius-full)',
          animation: 'spin 0.65s linear infinite'
        }}
      ></div>
      
      <span 
        style={{
          color: '#ffffff',
          fontFamily: 'var(--font-family)',
          fontSize: 'var(--font-size-sm)',
          fontWeight: 'var(--font-weight-semibold)',
          textShadow: '0 2px 4px rgba(0,0,0,0.2)'
        }}
      >
        {message}
      </span>
    </div>
  );
};

export default LoadingOverlay;
