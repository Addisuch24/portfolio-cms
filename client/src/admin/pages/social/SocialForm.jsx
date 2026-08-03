import { useState, useEffect } from "react";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";

function SocialForm({ initialValues, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    platform: "",
    url: "",
    icon: "",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        platform: initialValues.platform || "",
        url: initialValues.url || "",
        icon: initialValues.icon || "",
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const submit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const iconOptions = [
    { value: "github", label: "GitHub" },
    { value: "linkedin", label: "LinkedIn" },
    { value: "twitter", label: "Twitter" },
    { value: "facebook", label: "Facebook" },
    { value: "instagram", label: "Instagram" },
    { value: "youtube", label: "YouTube" },
    { value: "telegram", label: "Telegram" },
    { value: "whatsapp", label: "WhatsApp" },
    { value: "envelope", label: "Email" },
    { value: "link-45deg", label: "Website" },
  ];

  return (
    <form onSubmit={submit}>
      <Input
        label="Platform"
        name="platform"
        placeholder="e.g., GitHub, LinkedIn"
        value={formData.platform}
        onChange={handleChange}
        required
      />

      <Input
        label="URL"
        name="url"
        type="url"
        placeholder="https://..."
        value={formData.url}
        onChange={handleChange}
        required
      />

      <Select
        label="Icon"
        name="icon"
        value={formData.icon}
        onChange={handleChange}
        options={iconOptions}
        placeholder="Select icon..."
        required
      />

      {formData.icon && (
        <div className="mb-3">
          <label className="form-label">Icon Preview</label>
          <div>
            <i className={`bi bi-${formData.icon} fs-1`}></i>
          </div>
        </div>
      )}

      <button
        type="submit"
        className="btn btn-primary"
        disabled={loading}
      >
        {loading ? (
          <>
            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            Saving...
          </>
        ) : (
          "Save Social Link"
        )}
      </button>
    </form>
  );
}

export default SocialForm;