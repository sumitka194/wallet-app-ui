type InputProps = {
  onChange: (name: string, value: string) => void;
  type?: 'text' | 'email' | 'password' | 'number';
  placeholder?: string;
  value: string;
  name: string;
}

const Input = (props: InputProps) => {
  const {
    onChange,
    type = 'text',
    placeholder,
    value,
    name
  } = props;
  return (
    <input
      type={type}
      value={value}
      onChange={(e) => onChange(name, e.target.value)}
      name={name}
      className="form-control"
      placeholder={placeholder}
      aria-label="Username"
      aria-describedby="basic-addon1"
    />
  );
}

export default Input;
