import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import Select from "../../../components/common/Select";

function ProfessionalSkillForm({ initialValues, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    icon: "bi-lightbulb",
    percentage: 85,
    display_order: 1,
    status: "Active"
  });

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        description: initialValues.description || "",
        icon: initialValues.icon || "bi-lightbulb",
        percentage: initialValues.percentage != null ? initialValues.percentage : 85,
        display_order: initialValues.display_order != null ? initialValues.display_order : 1,
        status: initialValues.status || "Active"
      });
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "percentage" || name === "display_order" ? parseInt(value, 10) || 0 : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        label="Skill Name"
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />

      <TextArea
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleChange}
        required
        rows={3}
      />

      <Input
        label="Bootstrap Icon Class (e.g., bi-lightbulb)"
        type="text"
        name="icon"
        value={formData.icon}
        onChange={handleChange}
        placeholder="bi-lightbulb"
      />

      <Input
        label="Confidence (%)"
        type="number"
        name="percentage"
        value={formData.percentage}
        onChange={handleChange}
        required
        min="0"
        max="100"
      />

      <Input
        label="Display Order"
        type="number"
        name="display_order"
        value={formData.display_order}
        onChange={handleChange}
        required
        min="1"
      />

      <Select
        label="Status"
        name="status"
        value={formData.status}
        onChange={handleChange}
        options={["Active", "Inactive"]}
        required
      />

      <Button className="btn btn-primary mt-2" type="submit">
        {loading ? "Saving..." : "Save Professional Skill"}
      </Button>
    </form>
  );
}

export default ProfessionalSkillForm;
