import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProfessionalSkillForm from "./ProfessionalSkillForm";
import professionalSkillService from "../../services/professionalSkillService";
import Toast from "../../../components/common/Toast";
import Card from "../../../components/common/Card";

function CreateProfessionalSkill() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      await professionalSkillService.create(data);
      setToast({ show: true, message: "Professional skill created successfully!", type: "success" });
      setTimeout(() => navigate("/admin/professional-skills"), 1500);
    } catch (error) {
      console.error(error);
      setToast({ show: true, message: "Failed to create professional skill", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Create Professional Skill</h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/professional-skills")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </button>
      </div>

      <Card>
        <ProfessionalSkillForm loading={loading} onSubmit={handleCreate} />
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

export default CreateProfessionalSkill;
