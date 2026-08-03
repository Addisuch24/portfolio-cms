function TextArea({ 
  label, 
  name, 
  value, 
  onChange, 
  placeholder, 
  required = false,
  error,
  rows = 4,
  disabled = false,
  className = ""
}) {
  return (
    <div className="mb-3">
      {label && (
        <label htmlFor={name} className="form-label">
          {label} {required && <span className="text-danger">*</span>}
        </label>
      )}
      <textarea
        className={`form-control ${error ? 'is-invalid' : ''} ${className}`}
        id={name}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        disabled={disabled}
        rows={rows}
      />
      {error && <div className="invalid-feedback">{error}</div>}
    </div>
  );
}

export default TextArea;
