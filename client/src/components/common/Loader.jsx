function Loader({ fullScreen = false, size = "md" }) {
  const spinnerSize = size === "sm" ? "spinner-border-sm" : "";
  
  if (fullScreen) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '400px' }}>
        <div className={`spinner-border text-primary ${spinnerSize}`} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="text-center my-4">
      <div className={`spinner-border text-primary ${spinnerSize}`} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
}

export default Loader;
