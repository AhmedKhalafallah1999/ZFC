const FormRow = ({
  name,
  labelText,
  defaultValue = "",
  type,
  placeholder = "",
  onChange,
}) => {
  return (
    <div className="form-row">
      <label htmlFor="firstName" className="form-label">
        {labelText || name}
      </label>
      <input
        type={type}
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        id={name}
        className="form-input"
        onChange={onChange}
      ></input>
    </div>
  );
};
export default FormRow;
