const Card = ({
  children,
  interactive = false,
  className = '',
  onClick,
  ...rest
}) => {
  const baseClass = 'card';
  const interactiveClass = interactive ? 'card-interactive' : '';
  
  const isClickable = interactive && onClick;

  const handleKeyDown = (e) => {
    if (isClickable && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault();
      onClick(e);
    }
  };

  return (
    <div
      className={`${baseClass} ${interactiveClass} ${className}`}
      onClick={onClick}
      onKeyDown={handleKeyDown}
      tabIndex={isClickable ? 0 : undefined}
      role={isClickable ? 'button' : undefined}
      {...rest}
    >
      {children}
    </div>
  );
};

export const CardHeader = ({ children, className = '', ...rest }) => (
  <div className={`card-header ${className}`} {...rest}>
    {children}
  </div>
);

export const CardFooter = ({ children, className = '', ...rest }) => (
  <div className={`card-footer ${className}`} {...rest}>
    {children}
  </div>
);

Card.Header = CardHeader;
Card.Footer = CardFooter;

export default Card;
