import { useState } from "react";
import profileService from "../services/profileService";
import Button from "../../components/common/Button";
import Toast from "../../components/common/Toast";

function UploadImage({ onUploadSuccess }) {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleFile = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setToast({ show: true, message: "Please select an image file", type: "error" });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setToast({ show: true, message: "Image size should be less than 5MB", type: "error" });
      return;
    }

    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) {
      setToast({ show: true, message: "Please select an image", type: "error" });
      return;
    }

    const formData = new FormData();
    formData.append("image", image);

    try {
      setLoading(true);
      await profileService.uploadImage(formData);
      setToast({ show: true, message: "Image uploaded successfully!", type: "success" });
      setImage(null);
      setPreview("");
      if (onUploadSuccess) onUploadSuccess();
    } catch (error) {
      console.log(error);
      setToast({
        show: true,
        message: error.response?.data?.message || "Failed to upload image",
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
          accept="image/*"
          onChange={handleFile}
        />
        <small className="form-text text-muted">
          Maximum file size: 5MB. Supported formats: JPG, PNG, GIF
        </small>
      </div>

      {preview && (
        <div className="mb-3 text-center">
          <img
            src={preview}
            alt="preview"
            className="img-thumbnail"
            style={{ maxWidth: "300px", maxHeight: "300px" }}
          />
        </div>
      )}

      <Button onClick={handleUpload} disabled={!image || loading}>
        {loading ? "Uploading..." : "Upload Image"}
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

export default UploadImage;