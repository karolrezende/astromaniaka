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
    <>
      <label htmlFor={name} className='text-sm font-semibold text-blue-700'>{label}</label>
      <input className='border text-blue-800 py-1 rounded outline-blue-500/60 pl-4' type={type} id={name} {...register(name)} placeholder={placeholder} />
      <p className="my-0.5 text-red-900 text-sm">{errors || '\u00A0'}</p>
    </>
  );
};

export default Input;
