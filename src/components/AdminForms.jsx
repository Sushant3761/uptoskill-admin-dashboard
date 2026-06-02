import useForm from '../hooks/useForm';
import FormInput from './FormInput';
import Button from './Button';
import {
  validateRequired,
  validateEmail,
  validateMinMax,
  checkPasswordStrength,
  isDuplicateEmail,
  isDuplicateCourseCode,
  MOCK_DATABASE
} from '../utils/validation';

/**
 * --- ADD INTERN FORM COMPONENT ---
 */
export const AddInternForm = ({ onComplete }) => {
  const initialValues = {
    name: '',
    email: '',
    password: '',
    role: ''
  };

  const validate = (values) => {
    const errors = {};

    // 1. Name validation
    const nameErr = validateRequired(values.name, 'Full Name') || validateMinMax(values.name, 3, 50, 'Full Name');
    if (nameErr) errors.name = nameErr;

    // 2. Email validation
    const emailErr = validateEmail(values.email);
    if (emailErr) {
      errors.email = emailErr;
    } else if (isDuplicateEmail(values.email)) {
      errors.email = 'This email is already registered in the system';
    }

    // 3. Password validation
    const passwordErr = validateRequired(values.password, 'Password');
    if (passwordErr) {
      errors.password = passwordErr;
    } else {
      const strength = checkPasswordStrength(values.password);
      if (strength.score < 2) {
        errors.password = 'Password is too weak. Please add uppercase/lowercase/numbers/symbols.';
      }
    }

    // 4. Role validation
    const roleErr = validateRequired(values.role, 'Role Selection');
    if (roleErr) errors.role = roleErr;

    return errors;
  };

  const onSubmit = (values) => {
    // Simulate updating our local database in memory for duplicate checking in current session
    MOCK_DATABASE.emails.push(values.email);
    
    if (onComplete) {
      onComplete(`Intern "${values.name}" has been successfully registered under the role "${values.role}".`);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(initialValues, validate, onSubmit);

  const pwdStrength = values.password ? checkPasswordStrength(values.password) : null;

  return (
    <form onSubmit={handleSubmit} className="admin-form d-flex flex-col" noValidate>
      {submitSuccess && (
        <div className="form-success-banner mb-md" role="alert">
          <i className="fa-solid fa-circle-check" style={{ fontSize: 'var(--font-size-md)', marginTop: '2px' }}></i>
          <div>
            <strong style={{ display: 'block', fontWeight: 'var(--font-weight-bold)' }}>Success!</strong>
            <span>{submitSuccess} {touched.email && `(Duplicate prevention will now block ${values.email})`}</span>
          </div>
        </div>
      )}

      <FormInput
        label="Full Name"
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.name}
        touched={touched.name}
        placeholder="e.g. John Doe"
        required
        disabled={isSubmitting}
      />

      <FormInput
        label="Email Address"
        name="email"
        type="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.email}
        touched={touched.email}
        placeholder="e.g. j.doe@uptoskill.com"
        required
        disabled={isSubmitting}
      />

      <FormInput
        label="Access Password"
        name="password"
        type="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.password}
        touched={touched.password}
        placeholder="Choose a strong password"
        required
        disabled={isSubmitting}
        passwordStrength={pwdStrength}
      />

      <FormInput
        label="Internship Role"
        name="role"
        type="select"
        value={values.role}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.role}
        touched={touched.role}
        placeholder="Choose role assignment..."
        required
        disabled={isSubmitting}
        options={[
          { value: 'Software Intern', label: 'Software Engineer Intern' },
          { value: 'UX/UI Intern', label: 'Product UX/UI Intern' },
          { value: 'Data Science Intern', label: 'Data Science Analyst Intern' },
          { value: 'Lead Intern', label: 'Lead Systems Intern' }
        ]}
      />

      <div className="d-flex align-center justify-end mt-md gap-xs">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          style={{ minWidth: '130px' }}
        >
          {isSubmitting ? (
            <>
              <span className="form-spinner mr-xs" aria-hidden="true"></span>
              <span>Registering...</span>
            </>
          ) : (
            'Add Intern'
          )}
        </Button>
      </div>
    </form>
  );
};


/**
 * --- CREATE COURSE FORM COMPONENT ---
 */
export const CreateCourseForm = ({ onComplete }) => {
  const initialValues = {
    title: '',
    code: '',
    instructorEmail: '',
    hours: '',
    description: ''
  };

  const validate = (values) => {
    const errors = {};

    // 1. Title validation
    const titleErr = validateRequired(values.title, 'Course Title') || validateMinMax(values.title, 3, 100, 'Course Title');
    if (titleErr) errors.title = titleErr;

    // 2. Code validation (Uppercase code)
    const codeErr = validateRequired(values.code, 'Course Code') || validateMinMax(values.code, 3, 10, 'Course Code');
    if (codeErr) {
      errors.code = codeErr;
    } else if (isDuplicateCourseCode(values.code)) {
      errors.code = `Course Code "${values.code.toUpperCase()}" is already registered`;
    }

    // 3. Instructor Email validation
    const emailErr = validateEmail(values.instructorEmail);
    if (emailErr) errors.instructorEmail = emailErr;

    // 4. Hours validation
    const hoursErr = validateRequired(values.hours, 'Estimated Hours');
    if (hoursErr) {
      errors.hours = hoursErr;
    } else {
      const parsedHours = Number(values.hours);
      if (isNaN(parsedHours) || parsedHours <= 0) {
        errors.hours = 'Estimated hours must be a positive number';
      } else if (parsedHours > 200) {
        errors.hours = 'Estimated hours must be 200 hours or less';
      }
    }

    // 5. Description validation
    if (values.description && values.description.length > 500) {
      errors.description = 'Description cannot exceed 500 characters';
    }

    return errors;
  };

  const onSubmit = (values) => {
    // Add to simulation database in memory
    MOCK_DATABASE.courseCodes.push(values.code.toUpperCase());
    
    if (onComplete) {
      onComplete(`Course "${values.title}" [${values.code.toUpperCase()}] has been successfully scheduled!`);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(initialValues, validate, onSubmit);

  return (
    <form onSubmit={handleSubmit} className="admin-form d-flex flex-col" noValidate>
      {submitSuccess && (
        <div className="form-success-banner mb-md" role="alert">
          <i className="fa-solid fa-circle-check" style={{ fontSize: 'var(--font-size-md)', marginTop: '2px' }}></i>
          <div>
            <strong style={{ display: 'block', fontWeight: 'var(--font-weight-bold)' }}>Success!</strong>
            <span>{submitSuccess}</span>
          </div>
        </div>
      )}

      <div className="form-row-grid">
        <FormInput
          label="Course Title"
          name="title"
          value={values.title}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.title}
          touched={touched.title}
          placeholder="e.g. Web Development Boot Camp"
          required
          disabled={isSubmitting}
        />

        <FormInput
          label="Course Code"
          name="code"
          value={values.code}
          onChange={(e) => {
            // Auto uppercase course code for premium developer ergonomics
            e.target.value = e.target.value.toUpperCase();
            handleChange(e);
          }}
          onBlur={handleBlur}
          error={errors.code}
          touched={touched.code}
          placeholder="e.g. WD202"
          required
          disabled={isSubmitting}
        />
      </div>

      <div className="form-row-grid">
        <FormInput
          label="Instructor Email"
          name="instructorEmail"
          type="email"
          value={values.instructorEmail}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.instructorEmail}
          touched={touched.instructorEmail}
          placeholder="e.g. instructor@uptoskill.com"
          required
          disabled={isSubmitting}
        />

        <FormInput
          label="Estimated Hours"
          name="hours"
          type="number"
          value={values.hours}
          onChange={handleChange}
          onBlur={handleBlur}
          error={errors.hours}
          touched={touched.hours}
          placeholder="e.g. 40"
          required
          disabled={isSubmitting}
        />
      </div>

      <FormInput
        label="Course Description (Optional)"
        name="description"
        type="textarea"
        value={values.description}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.description}
        touched={touched.description}
        placeholder="Provide a brief summary of the curriculum, structure, or learning outcomes..."
        disabled={isSubmitting}
      />

      <div className="d-flex align-center justify-end mt-md gap-xs">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          style={{ minWidth: '130px' }}
        >
          {isSubmitting ? (
            <>
              <span className="form-spinner mr-xs" aria-hidden="true"></span>
              <span>Scheduling...</span>
            </>
          ) : (
            'Schedule Course'
          )}
        </Button>
      </div>
    </form>
  );
};


/**
 * --- ADD ANNOUNCEMENT FORM COMPONENT ---
 */
export const AddAnnouncementForm = ({ onComplete }) => {
  const initialValues = {
    annTitle: '',
    content: '',
    priority: ''
  };

  const validate = (values) => {
    const errors = {};

    // 1. Title validation
    const titleErr = validateRequired(values.annTitle, 'Announcement Title') || validateMinMax(values.annTitle, 3, 100, 'Announcement Title');
    if (titleErr) errors.annTitle = titleErr;

    // 2. Content validation
    const contentErr = validateRequired(values.content, 'Announcement Content') || validateMinMax(values.content, 10, 500, 'Announcement Content');
    if (contentErr) errors.content = contentErr;

    // 3. Priority validation
    const priorityErr = validateRequired(values.priority, 'Priority Level');
    if (priorityErr) errors.priority = priorityErr;

    return errors;
  };

  const onSubmit = (values) => {
    if (onComplete) {
      onComplete(`Announcement "${values.annTitle}" has been broadcast to all users!`);
    }
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    submitSuccess,
    handleChange,
    handleBlur,
    handleSubmit
  } = useForm(initialValues, validate, onSubmit);

  return (
    <form onSubmit={handleSubmit} className="admin-form d-flex flex-col" noValidate>
      {submitSuccess && (
        <div className="form-success-banner mb-md" role="alert">
          <i className="fa-solid fa-circle-check" style={{ fontSize: 'var(--font-size-md)', marginTop: '2px' }}></i>
          <div>
            <strong style={{ display: 'block', fontWeight: 'var(--font-weight-bold)' }}>Success!</strong>
            <span>{submitSuccess}</span>
          </div>
        </div>
      )}

      <FormInput
        label="Announcement Title"
        name="annTitle"
        value={values.annTitle}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.annTitle}
        touched={touched.annTitle}
        placeholder="e.g. Schedule Update for Software Engineering Interns"
        required
        disabled={isSubmitting}
      />

      <FormInput
        label="Broadcast Priority"
        name="priority"
        type="select"
        value={values.priority}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.priority}
        touched={touched.priority}
        placeholder="Choose notification priority level..."
        required
        disabled={isSubmitting}
        options={[
          { value: 'Low', label: 'Low - Informational Notice' },
          { value: 'Medium', label: 'Medium - General Broadcast' },
          { value: 'High', label: 'High - Immediate Alert' }
        ]}
      />

      <FormInput
        label="Announcement Content"
        name="content"
        type="textarea"
        value={values.content}
        onChange={handleChange}
        onBlur={handleBlur}
        error={errors.content}
        touched={touched.content}
        placeholder="Enter announcement details..."
        required
        disabled={isSubmitting}
      />

      <div className="d-flex align-center justify-end mt-md gap-xs">
        <Button
          type="submit"
          variant="primary"
          disabled={isSubmitting}
          style={{ minWidth: '130px' }}
        >
          {isSubmitting ? (
            <>
              <span className="form-spinner mr-xs" aria-hidden="true"></span>
              <span>Publishing...</span>
            </>
          ) : (
            'Publish Broadcast'
          )}
        </Button>
      </div>
    </form>
  );
};
