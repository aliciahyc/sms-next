type ButtonProps = {
    text: string;
    onClick?: () => void;
    className?: string;
  };
  
  export default function Button({ text, onClick, className = "" }: ButtonProps) {
    return (
      <button
        onClick={onClick}
        className={`px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 ${className}`}
      >
        {text}
      </button>
    );
  }
  