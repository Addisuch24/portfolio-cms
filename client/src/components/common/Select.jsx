function Select({ 
  label, 
  name, 
  value, 
  onChange, 
  options = [],
  required = false,
  error,
  disabled = false,
  className = "",
  placeholder = "Select..."
}) {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <select
        className={`form-select ${error ? 'is-invalid' : ''} ${className}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        disabled={disabled}
      >
        <option value="">{placeholder}</option>
        {options.map((option, index) => {
          if (option.options && Array.isArray(option.options)) {
            return (
              <optgroup key={index} label={option.label}>
                {option.options.map((item, itemIndex) => (
                  <option key={`${index}-${itemIndex}`} value={item.value || item}>
                    {item.label || item}
                  </option>
                ))}
              </optgroup>
            );
          }

          return (
            <option key={index} value={option.value || option}>
              {option.label || option}
            </option>
          );
        })}
      </select>
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default Select;
