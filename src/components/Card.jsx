const Card = ({
  children,
  interactive = false,
  className = '',
  ...rest
}) => {
  const baseClass = 'card';
  const interactiveClass = interactive ? 'card-interactive' : '';
  
  return (
    <div
      className={`${baseClass} ${interactiveClass} ${className}`}
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
