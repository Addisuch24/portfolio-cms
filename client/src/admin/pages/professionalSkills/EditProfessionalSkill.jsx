import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import ProfessionalSkillForm from "./ProfessionalSkillForm";
import professionalSkillService from "../../services/professionalSkillService";
import Toast from "../../../components/common/Toast";
import Card from "../../../components/common/Card";
import Loader from "../../../components/common/Loader";

function EditProfessionalSkill() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [skill, setSkill] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    fetchSkill();
  }, []);

  const fetchSkill = async () => {
    try {
      setFetching(true);
      const response = await professionalSkillService.getById(id);
      setSkill(response.data.data);
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: "Failed to load professional skill", type: "error" });
    } finally {
      setFetching(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      await professionalSkillService.update(id, data);
      setToast({ show: true, message: "Professional skill updated successfully!", type: "success" });
      setTimeout(() => navigate("/admin/professional-skills"), 1500);
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: "Failed to update professional skill", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Loader fullScreen />;
  }

  if (!skill) {
    return <div className="alert alert-danger">Professional skill not found</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Edit Professional Skill</h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/professional-skills")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </button>
      </div>

      <Card>
        <ProfessionalSkillForm
          initialValues={skill}
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

export default EditProfessionalSkill;
