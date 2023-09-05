import clsx from "clsx";

interface ButtonProps {
  children?: React.ReactNode;
  onClick?: () => void;
  fullWidth?: boolean;
  type?: "button" | "submit" | "reset" | undefined;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  fullWidth,
  type = 'button',
  disabled,
}) => {
  return (
    <button
      onClick={onClick}
      type={type}
      disabled={disabled}
      className={clsx('flex justify-center rounded-md px-3 py-2 bg-sky-500 text-sm font-semibold hover:bg-sky-600 text-white transition',
        disabled && 'opacity-50 cursor-default',
        fullWidth && 'w-full',
      )}>
      {children}
    </button>
  )
}

export default Button
