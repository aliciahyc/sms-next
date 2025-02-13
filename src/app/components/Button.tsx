type ButtonProps = {
    text: string;
    onClick?: () => void;
    className?: string;
  };
  
  export default function Button({ text, onClick, className = "" }: ButtonProps) {
    return (
      <button
        style={{ paddingRight: '10px' }}
        onClick={onClick}
        className={`px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 ${className}`}
      >
        {text}
      </button>
    );
  }
  