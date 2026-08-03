function DataTable({ columns, data, onEdit, onDelete, loading = false }) {
  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="text-center py-5 text-muted">
        <i className="bi bi-inbox display-1"></i>
        <p className="mt-3">No data available</p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead className="table-light">
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{col.label}</th>
            ))}
            {(onEdit || onDelete) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>
                  {col.render ? col.render(row) : row[col.field]}
                </td>
              ))}
              {(onEdit || onDelete) && (
                <td>
                  {onEdit && (
                    <button 
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => onEdit(row)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                  )}
                  {onDelete && (
                    <button 
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => onDelete(row)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DataTable;