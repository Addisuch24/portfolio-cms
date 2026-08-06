import { useState, useEffect } from "react";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import Select from "../../../components/common/Select";

function ProjectForm({
  initialValues,
  onSubmit,
  loading,
}) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    technologies: "",
    github_url: "",
    live_demo_url: "",
    status: "Draft",
    image_url: "",
    images: [],
  });

  const [imagePreviewUrls, setImagePreviewUrls] = useState([]);

  useEffect(() => {
    if (initialValues) {
      const initialImages = String(initialValues.image_url || "")
        .split(",")
        .map((url) => url.trim())
        .filter(Boolean);

      setFormData({
        title: initialValues.title || "",
        description: initialValues.description || "",
        technologies: initialValues.technologies || "",
        github_url: initialValues.github_url || "",
        live_demo_url: initialValues.live_demo_url || "",
        status: initialValues.status || "Draft",
        image_url: initialValues.image_url || "",
        images: [],
      });

      setImagePreviewUrls(initialImages);
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFile = (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        images: [...prev.images, ...files],
      }));

      setImagePreviewUrls((prev) => [
        ...prev,
        ...files.map((file) => URL.createObjectURL(file)),
      ]);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Trim string inputs to avoid validation errors from leading/trailing spaces
    const title = (formData.title || "").trim();
    const description = (formData.description || "").trim();
    const technologies = (formData.technologies || "").trim();
    const github_url = (formData.github_url || "").trim();
    const live_demo_url = (formData.live_demo_url || "").trim();
    const status = (formData.status || "").trim();

    const data = new FormData();
    data.append("title", title);
    data.append("description", description);
    data.append("technologies", technologies);
    data.append("github_url", github_url);
    data.append("live_demo_url", live_demo_url);
    data.append("status", status);

    if (Array.isArray(formData.images) && formData.images.length > 0) {
      formData.images.forEach((file) => {
        data.append("images", file);
      });
    }

    onSubmit(data);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Project Title"
        type="text"
        name="title"
        value={formData.title}
        onChange={handleChange}
        required
        placeholder="Enter project title"
      />

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        rows={5}
        placeholder="Describe your project"
      />

      <Input
        label="Technologies"
        type="text"
        name="technologies"
        value={formData.technologies}
        onChange={handleChange}
        placeholder="e.g., React, Node.js, MySQL"
      />

      <Input
        label="GitHub URL"
        type="url"
        name="github_url"
        value={formData.github_url}
        onChange={handleChange}
        placeholder="https://github.com/username/repo"
      />

      <Input
        label="Live Demo URL"
        type="url"
        name="live_demo_url"
        value={formData.live_demo_url}
        onChange={handleChange}
        placeholder="https://your-project.com"
      />

      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={[
          { value: "Published", label: "Published" },
          { value: "Draft", label: "Draft" },
          { value: "Coming Soon", label: "Coming Soon" },
        ]}
      />

      <div className="mb-3">
        <label htmlFor="images" className="form-label">
          Project Images
        </label>
        <input
          type="file"
          name="images"
          className="form-control"
          id="images"
          accept="image/*"
          multiple
          onChange={handleFile}
        />
      </div>

      {imagePreviewUrls.length > 0 && (
        <div className="mb-3 d-flex flex-wrap gap-2">
          {imagePreviewUrls.map((src, idx) => (
            <img
              key={idx}
              src={src}
              alt={`Preview ${idx + 1}`}
              className="img-thumbnail"
              style={{ width: 120, height: 120, objectFit: "cover" }}
            />
          ))}
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
          "Save Project"
        )}
      </button>
    </form>
  );
}

export default ProjectForm;