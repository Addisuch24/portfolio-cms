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
  });

  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    if (initialValues) {
      setFormData({
        title: initialValues.title || "",
        description: initialValues.description || "",
        technologies: initialValues.technologies || "",
        github_url: initialValues.github_url || "",
        live_demo_url: initialValues.live_demo_url || "",
        status: initialValues.status || "Draft",
        image_url: initialValues.image_url || "",
      });
      if (initialValues.image_url) {
        setImagePreview(initialValues.image_url);
      }
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
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));
      setImagePreview(URL.createObjectURL(file));
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

    if (formData.image instanceof File) {
      data.append("image", formData.image);
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
        <label htmlFor="image" className="form-label">
          Project Image
        </label>
        <input
          type="file"
          className="form-control"
          id="image"
          accept="image/*"
          onChange={handleFile}
        />
      </div>

      {imagePreview && (
        <div className="mb-3">
          <img
            src={imagePreview}
            alt="Preview"
            className="img-thumbnail"
            style={{ maxWidth: "300px" }}
          />
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