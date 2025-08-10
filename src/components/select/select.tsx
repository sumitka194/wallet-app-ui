type SelectProps = {
  options: { label: string; value: string; }[];
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  selected: string;
};

const Select = (props: SelectProps) => {
  const { options, onChange, selected } = props;
  return (
    <select onChange={onChange} value={selected} className="form-select" aria-label="Default select example">
      {options?.map((op) => (
        <option
          key={op.label}
          value={op.value}
        >
          {op.label}
        </option>
      ))}
    </select>
  );
}

export default Select;
