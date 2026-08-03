import { useState, useEffect } from "react";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";

function ExperienceForm({ initialValues, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    location: "",
    employment_type: "",
    start_date: "",
    end_date: "",
    is_current: false,
    description: "",
    technologies: "",
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        company: initialValues.company || "",
        position: initialValues.position || "",
        location: initialValues.location || "",
        employment_type: initialValues.employment_type || "",
        start_date: initialValues.start_date || "",
        end_date: initialValues.end_date || "",
        is_current: initialValues.is_current || false,
        description: initialValues.description || "",
        technologies: initialValues.technologies || "",
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Company"
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        required
        placeholder="Company name"
      />

      <Input
        label="Position"
        type="text"
        name="position"
        value={formData.position}
        onChange={handleChange}
        required
        placeholder="Your role"
      />

      <Input
        label="Location"
        type="text"
        name="location"
        value={formData.location}
        onChange={handleChange}
        placeholder="City, Country or Remote"
      />

      <Input
        label="Employment Type"
        type="text"
        name="employment_type"
        value={formData.employment_type}
        onChange={handleChange}
        placeholder="Full-time, Part-time, Contract, etc."
      />

      <Input
        label="Start Date"
        type="date"
        name="start_date"
        value={formData.start_date}
        onChange={handleChange}
        required
      />

      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="is_current"
          name="is_current"
          checked={formData.is_current}
          onChange={handleChange}
        />
        <label className="form-check-label" htmlFor="is_current">
          Currently working here
        </label>
      </div>

      {!formData.is_current && (
        <Input
          label="End Date"
          type="date"
          name="end_date"
          value={formData.end_date}
          onChange={handleChange}
        />
      )}

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        rows={5}
        placeholder="Describe your role and responsibilities"
      />

      <Input
        label="Technologies"
        type="text"
        name="technologies"
        value={formData.technologies}
        onChange={handleChange}
        placeholder="e.g., React, Node.js, AWS"
      />

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
          "Save Experience"
        )}
      </button>
    </form>
  );
}

export default ExperienceForm;