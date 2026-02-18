import React from 'react';
import clsx from 'clsx';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'viewBtn' | 'authPrimary';

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  leftIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  variant = 'secondary',
  leftIcon,
  children,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'inline-flex justify-center cursor-pointer items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all focus:outline-none';

  const variants = {
    secondary:
      'bg-white border font-medium border-btn-border text-[#111928] hover:bg-gray-50',
    primary:
      'bg-[#3b83f6] border border-[#3b83f6] text-white hover:bg-[#2563eb]',
    danger:
      'bg-transparent text-[#F05252] p-0!',
    viewBtn:
      'text-xl border h-[2.125rem] border-btn-border cursor-pointer px-2! py-0.5! rounded shadow-sm text-[#111928] bg-[#F9FAFB] hover:bg-gray-50',
    viewBtn2:
      'text-sm !p-2 rounded-lg bg-[#3b83f6] text-white hover:bg-[#2563eb]',
    authPrimary:
    'bg-primaryLogo border-primaryLogo text-white rounded-lg font-medium hover:opacity-80'
};

const disabledStyles = 'opacity-50 cursor-not-allowed';

return (
  <button
    type="button"
    className={clsx(
      baseStyles,
      variants[variant],
      disabled && disabledStyles,
      className
    )}
    disabled={disabled}
    {...props}
  >
    {leftIcon && <span className="w-3 h-3">{leftIcon}</span>}
    {children}
  </button>
);
};

export default Button;
