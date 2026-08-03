import { Link } from "react-router-dom";
import Badge from "../../../components/common/Badge";
import EmptyState from "../../../components/common/EmptyState";

function LatestProjects({ projects }) {
  if (!projects || projects.length === 0) {
    return (
      <div className="card shadow-sm">
        <div className="card-header">
          <h5>Latest Projects</h5>
        </div>
        <div className="card-body">
          <EmptyState message="No projects yet" icon="folder" />
        </div>
      </div>
    );
  }

  return (
    <div className="card shadow-sm">
      <div className="card-header d-flex justify-content-between align-items-center">
        <h5 className="mb-0">Latest Projects</h5>
        <Link to="/admin/projects" className="btn btn-sm btn-primary">
          View All
        </Link>
      </div>
      <div className="card-body p-0">
        <div className="table-responsive">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Created</th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr key={project.id}>
                  <td>{project.title}</td>
                  <td>
                    <Badge variant={project.status === 'Published' ? 'success' : 'warning'}>
                      {project.status}
                    </Badge>
                  </td>
                  <td>{new Date(project.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LatestProjects;