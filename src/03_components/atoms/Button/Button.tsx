import classNames from "classnames";
import Link from "next/link";

interface ButtonProps {
    buttonType: 'primary' | 'secondary';
    label: string;
    href?: string;
    onClick?: () => void;
}

const Button = ({buttonType, label, href, onClick}: ButtonProps) => {
    const buttonClasses = classNames('cursor-pointer relative w-full flex items-center justify-center py-2 rounded-md mb-2',
        buttonType === 'primary' && 'bg-blue-100 border border-blue-300',
        buttonType === 'secondary' && 'bg-white border border-blue-300',
        'hover:bg-blue-800 hover:border-blue-800 hover:text-white transition-colors',
        'active:bg-black');

    if (href) {
        return <Link className={buttonClasses} href={href}>{label}</Link>
    }

    return (
        <button type="button" onClick={onClick}
                className={buttonClasses}
        >
            {label}
        </button>
    )
}

export default Button;