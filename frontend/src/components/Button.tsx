interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
  type?: 'button' | 'submit';
  className?: string;
}

export default function Button({ children, onClick, variant = 'primary', disabled, type = 'button', className }: ButtonProps) {
  const baseClass = variant === 'primary' ? 'btn' : 'btn-secondary';
  const finalClass = className ? className : baseClass;
  
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={finalClass}
    >
      {children}
    </button>
  );
}
