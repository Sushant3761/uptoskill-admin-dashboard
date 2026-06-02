import { useEffect, useRef } from 'react';

/**
 * Reusable, premium Modal component.
 * Features:
 * - Focus Trap for accessibility (Tab cycling trapped inside modal).
 * - Keyboard listeners (Close on Escape key).
 * - Soft glassmorphism backdrop & token transitions.
 * - Screen-reader aria attributes.
 */
const Modal = ({ isOpen, onClose, title, children }) => {
  const modalRef = useRef(null);
  const previousFocus = useRef(null);

  // Keyboard navigation & Focus trapping
  useEffect(() => {
    if (!isOpen) return;

    // Save previously focused element
    previousFocus.current = document.activeElement;

    const handleKeyDown = (e) => {
      // 1. Escape key to close
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // 2. Tab key focus trapping
      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        
        // Find all focusable items inside modal
        const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableElements = Array.from(modalRef.current.querySelectorAll(focusableSelectors));
        
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab -> cycle to end if on first element
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab -> cycle to beginning if on last element
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Auto focus the close button or first input in the next tick
    const timer = setTimeout(() => {
      if (modalRef.current) {
        const firstInput = modalRef.current.querySelector('input, button');
        if (firstInput) {
          firstInput.focus();
        }
      }
    }, 50);

    // Prevent body scroll
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      document.body.style.overflow = '';
      
      // Restore focus
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div 
      className="modal-backdrop" 
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className="modal-content" 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
        style={{
          animation: 'modalSlideIn var(--transition-normal) forwards'
        }}
      >
        <header className="modal-header">
          <h3 id="modal-title" className="h3-premium" style={{ margin: 0 }}>
            {title}
          </h3>
          <button 
            type="button" 
            onClick={onClose} 
            className="modal-close-btn"
            aria-label="Close modal"
          >
            <i className="fa-solid fa-xmark"></i>
          </button>
        </header>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
