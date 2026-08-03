import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SocialForm from "./SocialForm";
import socialService from "../../services/socialService";
import Toast from "../../../components/common/Toast";
import Card from "../../../components/common/Card";
import Loader from "../../../components/common/Loader";

function EditSocial() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
  const [social, setSocial] = useState(null);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  useEffect(() => {
    fetchSocial();
  }, []);

  const fetchSocial = async () => {
    try {
      setFetching(true);
      const response = await socialService.getById(id);
      setSocial(response.data.data);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to load social link", type: "error" });
    } finally {
      setFetching(false);
    }
  };

  const handleUpdate = async (data) => {
    try {
      setLoading(true);
      await socialService.update(id, data);
      setToast({ show: true, message: "Social link updated successfully!", type: "success" });
      setTimeout(() => navigate("/admin/social"), 1500);
    } catch (error) {
      console.log(error);
      setToast({ show: true, message: "Failed to update social link", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return <Loader fullScreen />;
  }

  if (!social) {
    return (
      <div className="alert alert-danger">Social link not found</div>
    );
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3">Edit Social Link</h1>
        <button
          className="btn btn-secondary"
          onClick={() => navigate("/admin/social")}
        >
          <i className="bi bi-arrow-left me-2"></i>
          Back
        </button>
      </div>

      <Card>
        <SocialForm
          initialValues={social}
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

export default EditSocial;