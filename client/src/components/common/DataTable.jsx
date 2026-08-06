function DataTable({ columns, data, onEdit, onDelete, renderActions, loading = false }) {
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

  const getColumnLabel = (col) => col.label || col.header || "";

  const getCellValue = (row, col) => {
    if (col.render) {
      return col.render(row);
    }
    if (typeof col.accessor === "function") {
      return col.accessor(row);
    }
    if (col.accessor) {
      return row[col.accessor];
    }
    if (col.field) {
      return row[col.field];
    }
    return null;
  };

  return (
    <div className="table-responsive">
      <table className="table table-hover table-striped">
        <thead className="table-light">
          <tr>
            {columns.map((col, index) => (
              <th key={index}>{getColumnLabel(col)}</th>
            ))}
            {(onEdit || onDelete || renderActions) && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {data.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {columns.map((col, colIndex) => (
                <td key={colIndex}>{getCellValue(row, col)}</td>
              ))}
              {(onEdit || onDelete || renderActions) && (
                <td>
                  {renderActions && renderActions(row)}
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