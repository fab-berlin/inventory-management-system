import classNames from "classnames";

interface ButtonProps {
    buttonType: 'primary' | 'secondary';
    label: string;
    onClick?: () => void;
}

const Button = ({buttonType, label, onClick}: ButtonProps) => {
    return (
        <button type="button" onClick={onClick}
                className={classNames('cursor-pointer relative w-full flex items-center justify-center py-2 rounded-md',
                    buttonType === 'primary' && 'bg-blue-100 border border-blue-300',
                    buttonType === 'secondary' && 'bg-white border border-blue-300',
                    'hover:bg-blue-800 hover:border-blue-800 hover:text-white transition-colors',
                    'active:bg-black')}
        >
            {label}
        </button>
    )
}

export default Button;