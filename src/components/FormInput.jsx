import { useState } from 'react';

/**
 * Premium, fully accessible FormInput component.
 * Features:
 * - Direct label to input linking (`id` mapping).
 * - Real-time green/red borders based on validation states (`touched`, `error`).
 * - Custom input icons (success checkmark, invalid alert icon, password eye-toggle).
 * - Inline accessible screen-reader errors (`aria-invalid`, `aria-describedby`, `role="alert"`).
 * - Premium password strength meter visualizer.
 */
const FormInput = ({
  label,
  name,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  touched,
  placeholder,
  required = false,
  disabled = false,
  options = [], // Used for select dropdowns
  passwordStrength = null, // password strength object
  ...rest
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const inputId = `form-input-${name}`;
  const errorId = `form-input-error-${name}`;

  const hasError = touched && !!error;
  const isValid = touched && !error && value !== undefined && value !== null && String(value).trim() !== '';

  // Class construction
  let inputClasses = 'input-base';
  if (hasError) inputClasses += ' input-invalid';
  else if (isValid) inputClasses += ' input-valid';

  // Toggle password type
  const currentType = type === 'password' && showPassword ? 'text' : type;

  return (
    <div className="form-group d-flex flex-col gap-2xs" style={{ marginBottom: 'var(--space-md)' }}>
      {/* Label and asterisks indicator */}
      <div className="d-flex align-center justify-between">
        <label 
          htmlFor={inputId}
          className="form-label"
          style={{
            fontSize: 'var(--font-size-xs)',
            fontWeight: 'var(--font-weight-semibold)',
            color: 'var(--text-secondary)'
          }}
        >
          {label}
          {required && (
            <span 
              className="required-indicator" 
              style={{ color: 'var(--danger-500)', marginLeft: 'var(--space-2xs)' }}
              aria-hidden="true"
            >
              *
            </span>
          )}
        </label>
      </div>

      {/* Input container wrapper */}
      <div className="input-wrapper" style={{ position: 'relative', width: '100%' }}>
        {type === 'select' ? (
          <select
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            disabled={disabled}
            className={inputClasses}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? errorId : undefined}
            required={required}
            {...rest}
          >
            <option value="" disabled>{placeholder || 'Select option...'}</option>
            {options.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        ) : type === 'textarea' ? (
          <textarea
            id={inputId}
            name={name}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? errorId : undefined}
            required={required}
            style={{ minHeight: '80px', resize: 'vertical' }}
            {...rest}
          />
        ) : (
          <input
            id={inputId}
            name={name}
            type={currentType}
            value={value}
            onChange={onChange}
            onBlur={onBlur}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
            aria-invalid={hasError ? 'true' : 'false'}
            aria-describedby={hasError ? errorId : undefined}
            required={required}
            {...rest}
          />
        )}

        {/* Input suffix decorators (success, error, toggle eyes) */}
        <div 
          className="input-decorator-container"
          style={{
            position: 'absolute',
            top: '50%',
            right: 'var(--space-md)',
            transform: 'translateY(-50%)',
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--space-xs)',
            pointerEvents: 'none',
            zIndex: 2
          }}
        >
          {/* Validation indicators */}
          {hasError && (
            <i 
              className="fa-solid fa-circle-exclamation text-danger" 
              style={{ color: 'var(--danger-500)', fontSize: 'var(--font-size-sm)' }}
              title="Invalid input"
            ></i>
          )}
          {isValid && (
            <i 
              className="fa-solid fa-circle-check text-success" 
              style={{ color: 'var(--success-500)', fontSize: 'var(--font-size-sm)' }}
              title="Valid input"
            ></i>
          )}

          {/* Password eye visibility toggle */}
          {type === 'password' && !disabled && (
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="password-toggle-btn"
              style={{
                background: 'none',
                border: 'none',
                padding: 'var(--space-2xs)',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                pointerEvents: 'auto',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'color var(--transition-fast)'
              }}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
            >
              <i className={showPassword ? 'fa-solid fa-eye-slash' : 'fa-solid fa-eye'}></i>
            </button>
          )}
        </div>
      </div>

      {/* Password strength meter visualizer */}
      {type === 'password' && value && passwordStrength && (
        <div className="password-strength-container d-flex flex-col gap-2xs mt-2xs">
          <div className="d-flex align-center justify-between" style={{ fontSize: 'var(--font-size-xs)' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Password Strength:</span>
            <span 
              className={`strength-label strength-${passwordStrength.strength}`}
              style={{
                fontWeight: 'var(--font-weight-bold)',
                color: 
                  passwordStrength.strength === 'strong' 
                    ? 'var(--success-500)' 
                    : passwordStrength.strength === 'medium'
                    ? 'var(--warning-500)'
                    : 'var(--danger-500)'
              }}
            >
              {passwordStrength.label}
            </span>
          </div>
          <div 
            className="strength-track" 
            style={{
              width: '100%',
              height: '4px',
              backgroundColor: 'var(--neutral-200)',
              borderRadius: 'var(--radius-full)',
              overflow: 'hidden'
            }}
          >
            <div 
              className={`strength-bar strength-bar-${passwordStrength.strength}`}
              style={{
                width: `${passwordStrength.percent}%`,
                height: '100%',
                backgroundColor: 
                  passwordStrength.strength === 'strong' 
                    ? 'var(--success-500)' 
                    : passwordStrength.strength === 'medium'
                    ? 'var(--warning-500)'
                    : 'var(--danger-500)',
                transition: 'width var(--transition-normal), background-color var(--transition-normal)'
              }}
            ></div>
          </div>
          <span style={{ fontSize: 'var(--font-size-xs)', color: 'var(--text-tertiary)', fontStyle: 'italic' }}>
            {passwordStrength.feedback}
          </span>
        </div>
      )}

      {/* Accessible Inline error text */}
      {hasError && (
        <span 
          id={errorId} 
          className="form-error"
          role="alert"
          style={{
            fontSize: 'var(--font-size-xs)',
            color: 'var(--danger-500)',
            fontWeight: 'var(--font-weight-medium)',
            marginTop: '2px'
          }}
        >
          {error}
        </span>
      )}
    </div>
  );
};

export default FormInput;
