function EmptyState({ message = "No data found", icon = "inbox", action }) {
  return (
    <div className="text-center py-5">
      <i className={`bi bi-${icon} display-1 text-muted`}></i>
      <h5 className="mt-3 text-muted">{message}</h5>
      {action && <div className="mt-3">{action}</div>}
    </div>
  );
}

export default EmptyState;
