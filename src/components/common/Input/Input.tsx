/* eslint-disable @typescript-eslint/no-explicit-any */
interface InputProps {
  label: string;
  name: any;
  placeholder?: string;
  type: string;
  errors?: string;
  register: any;
}

const Input = ({
  label,
  name,
  placeholder,
  type,
  errors,
  register,
}: InputProps) => {
  return (
    <div className="flex flex-col">
      <label htmlFor={name} className="field-label">
        {label}
      </label>
      <input
        className={`field ${errors ? "border-rose-400/60 focus:border-rose-400/70 focus:ring-rose-500/15" : ""}`}
        type={type}
        id={name}
        {...register(name)}
        placeholder={placeholder}
      />
      <p className="field-error">{errors || " "}</p>
    </div>
  );
};

export default Input;
