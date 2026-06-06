import Modal from './Modal';
import Button from './Button';

/**
 * Reusable Confirmation Dialog component.
 * Builds on top of the generic Modal layout.
 * Props:
 * - open: boolean flag to control display.
 * - title: modal header title.
 * - description: body confirmation text.
 * - confirmLabel: label text for action button.
 * - cancelLabel: label text for dismissal button.
 * - onConfirm: callback triggered when confirmed.
 * - onCancel: callback triggered when cancelled.
 * - variant: styling flavor 'danger' | 'warning' | 'primary'.
 */
const ConfirmationModal = ({
  open,
  title,
  description,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onCancel,
  variant = 'primary',
}) => {
  
  const getButtonVariant = () => {
    switch (variant) {
      case 'danger':
        return 'danger';
      case 'warning':
        return 'warning';
      case 'primary':
      default:
        return 'primary';
    }
  };

  return (
    <Modal
      open={open}
      onClose={onCancel}
      title={title}
      size="sm"
      showCloseButton={true}
    >
      <div className="d-flex flex-col gap-md">
        <p 
          style={{ 
            margin: 0, 
            color: 'var(--text-secondary)', 
            fontSize: 'var(--font-size-sm)', 
            lineHeight: 'var(--line-height-normal)' 
          }}
        >
          {description}
        </p>
        
        {/* Isolated inline footer for confirm action buttons */}
        <div 
          className="d-flex align-center justify-end gap-sm" 
          style={{ 
            marginTop: 'var(--space-md)',
            paddingTop: 'var(--space-md)',
            borderTop: '1px solid var(--border-color)' 
          }}
        >
          <Button variant="outline" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant={getButtonVariant()} onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmationModal;
