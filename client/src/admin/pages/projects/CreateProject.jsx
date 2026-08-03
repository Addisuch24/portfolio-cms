import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProjectForm from "./ProjectForm";
import projectService from "../../services/projectService";
import Toast from "../../../components/common/Toast";
import Card from "../../../components/common/Card";

function CreateProject() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      await projectService.create(data);
      setToast({ show: true, message: "Project created successfully!", type: "success" });
      setTimeout(() => navigate("/admin/projects"), 1500);
    } catch (error) {
      console.error('Create project error:', error);
      const serverMessage = error.response?.data?.message || error.response?.data?.errors || error.message;
      const message = typeof serverMessage === 'string' ? serverMessage : JSON.stringify(serverMessage);
      setToast({ show: true, message: message || "Failed to create project", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Create Project</h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/projects")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </button>
      </div>

      <Card>
        <ProjectForm loading={loading} onSubmit={handleCreate} />
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

export default CreateProject;