import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import projectService from "../../services/projectService";
import Toast from "../../../components/common/Toast";
import Card from "../../../components/common/Card";
import Loader from "../../../components/common/Loader";

function EditProject() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [project, setProject] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    fetchProject();
  }, []);

  const fetchProject = async () => {
    try {
      setFetching(true);
      const response = await projectService.getById(id);
      setProject(response.data.data);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to load project", type: "error" });
    } finally {
      setFetching(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      await projectService.update(id, data);
      setToast({ show: true, message: "Project updated successfully!", type: "success" });
      setTimeout(() => navigate("/admin/projects"), 1500);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to update project", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Loader fullScreen />;
  }

  if (!project) {
    return (
      <div className="alert alert-danger">Project not found</div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Edit Project</h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/projects")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </button>
      </div>

      <Card>
        <ProjectForm
          initialValues={project}
          loading={loading}
          onSubmit={handleUpdate}
        />
      </Card>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default EditProject;