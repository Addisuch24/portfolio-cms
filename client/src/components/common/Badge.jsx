function Badge({ children, variant = "primary", pill = false }) {
  return (
    <span className={`badge bg-${variant} ${pill ? 'rounded-pill' : ''}`}>
      {children}
    </span>
  );
}

export default Badge;