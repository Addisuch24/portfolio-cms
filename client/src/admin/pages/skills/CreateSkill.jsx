import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SkillForm from "./SkillForm";
import skillService from "../../services/skillService";
import Toast from "../../../components/common/Toast";
import Card from "../../../components/common/Card";

function CreateSkill() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleCreate = async (data) => {
    try {
      setLoading(true);
      await skillService.create(data);
      setToast({ show: true, message: "Skill created successfully!", type: "success" });
      setTimeout(() => navigate("/admin/skills"), 1500);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to create skill", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Create Skill</h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/skills")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </button>
      </div>

      <Card>
        <SkillForm loading={loading} onSubmit={handleCreate} />
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

export default CreateSkill;