import { ReactNode, ButtonHTMLAttributes } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
}

const Button = ({ children, className, ...props }: ButtonProps) => {
  return (
    <button
      {...props}
      type="submit"
      className={`${className} text-white py-2 rounded-md mt-2 bg-blue-900 hover:bg-blue-900/90 font-bold`}
    >
      {children}
    </button>
  );
};

export default Button;
