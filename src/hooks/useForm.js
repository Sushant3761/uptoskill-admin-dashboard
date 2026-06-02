import { useState, useCallback } from 'react';

/**
 * Reusable form hook for Phase 4 validation and loading/success states.
 * 
 * @param {Object} initialValues - Starting fields and values.
 * @param {Function} validate - Validation logic callback returning errors object.
 * @param {Function} onSubmit - Form submit handler invoked if validation passes.
 */
const useForm = (initialValues, validate, onSubmit) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(null);

  // Handle input change
  const handleChange = useCallback((e) => {
    const { name, value, type, checked } = e.target;
    const fieldValue = type === 'checkbox' ? checked : value;
    
    setValues((prev) => {
      const updated = { ...prev, [name]: fieldValue };
      
      // Real-time validation after value changes
      if (validate) {
        const validationErrors = validate(updated);
        setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: validationErrors ? validationErrors[name] : undefined
        }));
      }
      return updated;
    });
  }, [validate]);

  // Handle field blur (interaction start)
  const handleBlur = useCallback((e) => {
    const { name } = e.target;
    setTouched((prev) => ({ ...prev, [name]: true }));
    
    if (validate) {
      const validationErrors = validate(values);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationErrors ? validationErrors[name] : undefined
      }));
    }
  }, [validate, values]);

  // Handle form submission
  const handleSubmit = useCallback(async (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }

    // Touch all fields to trigger validation errors visually
    const touchedAll = {};
    Object.keys(values).forEach((key) => {
      touchedAll[key] = true;
    });
    setTouched(touchedAll);

    // Run full validation check
    const validationErrors = validate ? validate(values) : {};
    setErrors(validationErrors || {});
    const isValid = validationErrors ? Object.keys(validationErrors).length === 0 : true;

    if (isValid) {
      setIsSubmitting(true);
      setSubmitSuccess(null);
      
      try {
        // Simulate network API request with a 1.5s timeout
        await new Promise((resolve) => setTimeout(resolve, 1500));
        
        // Trigger success callback
        if (onSubmit) {
          onSubmit(values);
        }
        
        setSubmitSuccess('Form submitted successfully!');
        // Reset form values to initial state
        setValues(initialValues);
        setTouched({});
        setErrors({});
      } catch (err) {
        setErrors({ form: err.message || 'An error occurred during submission.' });
      } finally {
        setIsSubmitting(false);
      }
    }
  }, [values, validate, onSubmit, initialValues]);

  // Clear states manually
  const resetForm = useCallback(() => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
    setIsSubmitting(false);
    setSubmitSuccess(null);
  }, [initialValues]);

  return {
    values,
    errors,
    touched,
    isSubmitting,
    submitSuccess,
    setValues,
    setErrors,
    setTouched,
    setSubmitSuccess,
    handleChange,
    handleBlur,
    handleSubmit,
    resetForm
  };
};

export default useForm;
