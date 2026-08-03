function QuickStats({ stats }) {
  const statsData = [
    { label: 'Total Projects', value: stats.totalProjects, icon: 'folder', color: 'primary' },
    { label: 'Total Skills', value: stats.totalSkills, icon: 'star', color: 'success' },
    { label: 'Experiences', value: stats.totalExperiences, icon: 'briefcase', color: 'info' },
    { label: 'Unread Messages', value: stats.unreadMessages, icon: 'envelope', color: 'warning' }
  ];

  return (
    <div className="row g-3 mb-4">
      {statsData.map((stat, index) => (
        <div key={index} className="col-lg-3 col-md-6">
          <div className="card shadow-sm">
            <div className="card-body">
              <div className="d-flex align-items-center">
                <div className={`bg-${stat.color} text-white rounded p-3 me-3`}>
                  <i className={`bi bi-${stat.icon} fs-4`}></i>
                </div>
                <div>
                  <h3 className="mb-0">{stat.value}</h3>
                  <small className="text-muted">{stat.label}</small>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default QuickStats;