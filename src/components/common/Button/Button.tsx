import { ReactNode } from "react";
interface ButtonProps {
    children: ReactNode,
    style?: string
}
const Button = ({ children, style }: ButtonProps) => {
    return (<button type="submit" className={`${style} text-white py-2 rounded-md mt-2 bg-blue-900 hover:bg-blue-900/90 font-bold`}>
        {children}
    </button>);
}

export default Button;