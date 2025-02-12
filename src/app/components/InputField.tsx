type InputFieldProps = {
    label: string;
    type?: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  };
  
  export default function InputField({ label, type = "text", value, onChange }: InputFieldProps) {
    return (
      <div className="mb-4">
        <label className="block text-gray-700">{label}</label>
        <input
          type={type}
          value={value}
          onChange={onChange}
          className="border rounded w-full p-2"
        />
      </div>
    );
  }
  