import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SkillForm from "./SkillForm";
import skillService from "../../services/skillService";
import Toast from "../../../components/common/Toast";
import Card from "../../../components/common/Card";
import Loader from "../../../components/common/Loader";

function EditSkill() {
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
      const response = await skillService.getById(id);
      setSkill(response.data.data);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to load skill", type: "error" });
    } finally {
      setFetching(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      await skillService.update(id, data);
      setToast({ show: true, message: "Skill updated successfully!", type: "success" });
      setTimeout(() => navigate("/admin/skills"), 1500);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to update skill", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Loader fullScreen />;
  }

  if (!skill) {
    return <div className="alert alert-danger">Skill not found</div>;
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Edit Skill</h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/skills")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </button>
      </div>

      <Card>
        <SkillForm
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

export default EditSkill;