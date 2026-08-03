function Card({ title, children, footer, className = "" }) {
  return (
    <div className={`card shadow-sm ${className}`}>
      {title && (
        <div className="card-header">
          <h5 className="mb-0">{title}</h5>
        </div>
      )}
      <div className="card-body">
        {children}
      </div>
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
}

export default Card;
