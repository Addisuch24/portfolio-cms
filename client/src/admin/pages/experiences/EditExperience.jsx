import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ExperienceForm from "./ExperienceForm";
import experienceService from "../../services/experienceService";
import Toast from "../../../components/common/Toast";
import Card from "../../../components/common/Card";
import Loader from "../../../components/common/Loader";

function EditExperience() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [experience, setExperience] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    loadExperience();
  }, []);

  const loadExperience = async () => {
    try {
      setFetching(true);
      const response = await experienceService.getById(id);
      setExperience(response.data.data);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to load experience", type: "error" });
    } finally {
      setFetching(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      await experienceService.update(id, data);
      setToast({ show: true, message: "Experience updated successfully!", type: "success" });
      setTimeout(() => navigate("/admin/experiences"), 1500);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to update experience", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Loader fullScreen />;
  }

  if (!experience) {
    return <div className="alert alert-danger">Experience not found</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Edit Experience</h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/experiences")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </button>
      </div>

      <Card>
        <ExperienceForm
          initialValues={experience}
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

export default EditExperience;