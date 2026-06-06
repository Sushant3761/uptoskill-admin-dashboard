import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

/**
 * Reusable, accessible, and premium Modal shell.
 * Renders into a document body portal for nesting robustness.
 * Features:
 * - Keyboard Focus Trap (Tab and Shift+Tab cycling).
 * - Close on Escape key press.
 * - Backdrop click to dismiss.
 * - Focus restoration to triggering element on close.
 * - Entrance and Exit animations for backdrop and container.
 * - Sizing options: 'sm' | 'md' | 'lg'.
 */
const Modal = ({ 
  open, 
  onClose, 
  title, 
  children, 
  size = 'md', 
  showCloseButton = true 
}) => {
  const modalRef = useRef(null);
  const previousFocus = useRef(null);
  const [prevOpen, setPrevOpen] = useState(open);
  const [shouldRender, setShouldRender] = useState(open);
  const [isExiting, setIsExiting] = useState(false);

  // Sync prop changes directly in render (React-recommended pattern)
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setShouldRender(true);
      setIsExiting(false);
    } else {
      setIsExiting(true);
    }
  }

  // Handle timed exit phase
  useEffect(() => {
    if (isExiting) {
      const timer = setTimeout(() => {
        setShouldRender(false);
        setIsExiting(false);
      }, 150);
      return () => clearTimeout(timer);
    }
  }, [isExiting]);

  // Keyboard navigation & Focus trapping
  useEffect(() => {
    if (!open) return;

    // Track active element to return focus later
    previousFocus.current = document.activeElement;

    const handleKeyDown = (e) => {
      // 1. Escape key closes modal
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      // 2. Tab focus trap cycling
      if (e.key === 'Tab') {
        if (!modalRef.current) return;
        
        const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
        const focusableElements = Array.from(modalRef.current.querySelectorAll(focusableSelectors));
        
        if (focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          // Shift + Tab -> loop back to last element
          if (document.activeElement === firstElement) {
            lastElement.focus();
            e.preventDefault();
          }
        } else {
          // Tab -> loop back to first element
          if (document.activeElement === lastElement) {
            firstElement.focus();
            e.preventDefault();
          }
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    // Defer focus placement slightly to ensure content is fully loaded
    const timer = setTimeout(() => {
      if (modalRef.current) {
        // Prioritize inputs/textarea fields, then close button or other focusables
        const inputField = modalRef.current.querySelector('input, textarea, select');
        if (inputField) {
          inputField.focus();
        } else {
          const focusableSelectors = 'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';
          const focusableElements = Array.from(modalRef.current.querySelectorAll(focusableSelectors));
          if (focusableElements.length > 0) {
            focusableElements[0].focus();
          }
        }
      }
    }, 50);

    // Prevent background scrolling
    document.body.style.overflow = 'hidden';

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timer);
      document.body.style.overflow = '';
      
      // Restore focus to original triggering button
      if (previousFocus.current) {
        previousFocus.current.focus();
      }
    };
  }, [open, onClose]);

  // Handle backdrop clicks directly, bypassing content bubbled clicks
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!shouldRender) return null;

  return createPortal(
    <div 
      className={`modal-backdrop ${isExiting ? 'exiting' : ''}`} 
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
    >
      <div 
        className={`modal-content modal-${size} ${isExiting ? 'exiting' : ''}`} 
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <header className="modal-header">
          <h3 id="modal-title" className="h3-premium" style={{ margin: 0 }}>
            {title}
          </h3>
          {showCloseButton && (
            <button 
              type="button" 
              onClick={onClose} 
              className="modal-close-btn"
              aria-label="Close modal"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          )}
        </header>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Modal;
