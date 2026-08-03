import { useState } from "react";
import profileService from "../../services/profileService";
import Button from "../../../components/common/Button";
import Toast from "../../../components/common/Toast";

function UploadResume({ onUploadSuccess }) {
  const [resume, setResume] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    const allowedTypes = [
      "application/pdf",
      "application/msword",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    ];
    if (!allowedTypes.includes(file.type)) {
      setToast({ show: true, message: "Please select a PDF or DOC/DOCX file", type: "error" });
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setToast({ show: true, message: "Resume size should be less than 10MB", type: "error" });
      return;
    }

    setResume(file);
  };

  const uploadResume = async () => {
    if (!resume) {
      setToast({ show: true, message: "Please select a resume file", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("resume", resume);

    try {
      setLoading(true);
      await profileService.uploadResume(formData);
      setToast({ show: true, message: "Resume uploaded successfully!", type: "success" });
      setResume(null);
      // Reset file input
      const fileInput = document.querySelector('input[type="file"][accept*="pdf"]');
      if (fileInput) fileInput.value = "";
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.log(error);
      setToast({
        show: true,
        message: error.response?.data?.message || "Failed to upload resume",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="mb-3">
        <input
          type="file"
          className="form-control"
          accept=".pdf,.doc,.docx"
          onChange={handleChange}
        />
        <small className="form-text text-muted">
          Maximum file size: 10MB. Supported formats: PDF, DOC, DOCX
        </small>
      </div>

      {resume && (
        <div className="alert alert-info mb-3">
          <i className="bi bi-file-earmark-text me-2"></i>
          Selected: {resume.name}
        </div>
      )}

      <Button onClick={uploadResume} disabled={!resume || loading}>
        {loading ? "Uploading..." : "Upload Resume"}
      </Button>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
}

export default UploadResume;