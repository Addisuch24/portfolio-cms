import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExperienceForm from "./ExperienceForm";
import experienceService from "../../services/experienceService";
import Toast from "../../../components/common/Toast";
import Card from "../../../components/common/Card";

function CreateExperience() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      await experienceService.create(data);
      setToast({ show: true, message: "Experience created successfully!", type: "success" });
      setTimeout(() => navigate("/admin/experiences"), 1500);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to create experience", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Create Experience</h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/experiences")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </button>
      </div>

      <Card>
        <ExperienceForm loading={loading} onSubmit={handleCreate} />
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

export default CreateExperience;