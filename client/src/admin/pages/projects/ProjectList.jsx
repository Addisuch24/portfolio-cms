import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import projectService from "../../services/projectService";
import SearchBar from "../../../components/common/SearchBar";
import DataTable from "../../../components/common/DataTable";
import Loader from "../../../components/common/Loader";
import Toast from "../../../components/common/Toast";
import ConfirmDialog from "../../../components/common/ConfirmDialog";
import EmptyState from "../../../components/common/EmptyState";
import Badge from "../../../components/common/Badge";

function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });
  const [confirmDialog, setConfirmDialog] = useState({ show: false, id: null });

  const columns = [
    {
      label: "Title",
      field: "title",
    },
    {
      label: "Status",
      field: "status",
      render: (row) => (
        <Badge variant={row.status === 'Published' ? 'success' : 'warning'}>
          {row.status}
        </Badge>
      )
    },
    {
      label: "Technologies",
      field: "technologies",
    },
  ];

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const response = await projectService.getAll();
      setProjects(response.data.data);
      setFilteredProjects(response.data.data);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to load projects", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);
    const result = projects.filter((project) =>
      project.title.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredProjects(result);
  };

  const handleDelete = async () => {
    try {
      await projectService.remove(confirmDialog.id);
      setToast({ show: true, message: "Project deleted successfully", type: "success" });
      loadProjects();
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to delete project", type: "error" });
    } finally {
      setConfirmDialog({ show: false, id: null });
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Projects</h1>
        <Link to="/admin/projects/create" className="btn btn-primary">
          <i className="bi bi-plus-circle me-2"></i>
          Add Project
        </Link>
      </div>

      <div className="card shadow-sm">
        <div className="card-body">
          <SearchBar
            value={search}
            onChange={handleSearch}
            placeholder="Search projects..."
          />

          {loading ? (
            <Loader />
          ) : filteredProjects.length === 0 ? (
            <EmptyState
              message={search ? "No projects found" : "No projects yet"}
              icon="folder"
              action={
                !search && (
                  <Link to="/admin/projects/create" className="btn btn-primary">
                    Create Your First Project
                  </Link>
                )
              }
            />
          ) : (
            <DataTable
              columns={columns}
              data={filteredProjects}
              onEdit={(project) => window.location.href = `/admin/projects/edit/${project.id}`}
              onDelete={(project) => setConfirmDialog({ show: true, id: project.id })}
            />
          )}
        </div>
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />

      <ConfirmDialog
        show={confirmDialog.show}
        onHide={() => setConfirmDialog({ show: false, id: null })}
        onConfirm={handleDelete}
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
      />
    </div>
  );
}

export default ProjectList;