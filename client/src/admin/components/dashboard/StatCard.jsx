function StatCard({ title, value, color = "primary", icon = "bar-chart" }) {
  return (
    <div className="col-lg-3 col-md-6 mb-4">
      <div className={`card bg-${color} text-white shadow`}>
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center">
            <div>
              <h2 className="mb-0">{value}</h2>
              <p className="mb-0">{title}</p>
            </div>
            <div>
              <i className={`bi bi-${icon} display-4`}></i>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default StatCard;