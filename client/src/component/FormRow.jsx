const FormRow = ({
  name,
  labelText,
  defaultValue = "",
  type,
  placeholder = "",
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
      ></input>
    </div>
  );
};
export default FormRow;
