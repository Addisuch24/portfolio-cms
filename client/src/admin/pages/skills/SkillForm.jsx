import { useEffect, useState } from "react";
import Button from "../../../components/common/Button";
import Input from "../../../components/common/Input";
import Select from "../../../components/common/Select";
import TextArea from "../../../components/common/TextArea";
import { resolveIcon, mapSkillToIcon } from "../../../utils/iconHelpers";
import { resolveAssetUrl } from "../../../utils/assetUrls";

function SkillForm({ initialValues, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    icon: "",
    description: ""
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(initialValues?.icon || "");

  useEffect(() => {
    if (initialValues) {
      setFormData({
        name: initialValues.name || "",
        category: initialValues.category || "",
        icon: initialValues.icon || "",
        description: initialValues.description || ""
      });
      setPreviewUrl(initialValues.icon || "");
    }
  }, [initialValues]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => {
      const next = { ...prev, [name]: value };

      if (name === "name") {
        const suggested = mapSkillToIcon(value);
        if (!prev.icon) next.icon = suggested;
        if (!previewUrl) {
          setPreviewUrl("");
        }
      }

      return next;
    });
  };

  const handleFileChange = (e) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setFormData((p) => ({ ...p, icon: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedFile) {
      const fd = new FormData();
      fd.append("name", formData.name);
      fd.append("category", formData.category);
      fd.append("description", formData.description || "");
      fd.append("icon", selectedFile);
      onSubmit(fd);
      return;
    }

    const submitData = {
      ...formData,
      icon: formData.icon || initialValues?.icon || ""
    };
    onSubmit(submitData);
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

            <Select
                label="Skill Category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                options={[
                    {
                        label: "Soft / Professional",
                        options: [
                            { label: "Soft Skill", value: "Soft Skill" }
                        ]
                    },
                    {
                        label: "Technical Subcategories",
                        options: [
                            { label: "Programming Languages", value: "Programming Languages" },
                            { label: "Frontend", value: "Frontend" },
                            { label: "Backend", value: "Backend" },
                            { label: "Frameworks & Libraries", value: "Frameworks & Libraries" },
                            { label: "Databases", value: "Databases" },
                            { label: "Tools & Platforms", value: "Tools & Platforms" },
                            { label: "Version Control", value: "Version Control" },
                            { label: "Software Engineering", value: "Software Engineering" },
                            { label: "Other Technologies", value: "Other Technologies" }
                        ]
                    }
                ]}
                placeholder="Select category..."
            />

            <TextArea
                label="Professional Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Describe what this skill is used for in a short professional sentence"
                rows={3}
            />

            <Input
                label="Bootstrap Icon Class (optional)"
                type="text"
                name="icon"
                value={formData.icon}
                onChange={handleChange}
                placeholder="e.g. bi-filetype-html or bi-file-earmark-code"
            />

            <div className="d-flex align-items-center gap-3 mb-3">
                <div className="d-flex align-items-center gap-2">
                    <div className="rounded-circle d-inline-flex align-items-center justify-content-center" style={{ width: 40, height: 40 }}>
                        {previewUrl ? (
                            <img src={previewUrl.startsWith('blob:') ? previewUrl : resolveAssetUrl(previewUrl)} alt="icon preview" style={{ width: 28, height: 28, objectFit: 'cover', borderRadius: 6 }} />
                        ) : (
                            <i className={`bi ${resolveIcon(formData.name, formData.icon)} fs-4`}></i>
                        )}
                    </div>
                </div>
                <div className="d-flex flex-column">
                    <small className="text-muted">Preview</small>
                    <div className="d-flex gap-2 align-items-center">
                        <Button className="btn btn-sm btn-outline-secondary" type="button" onClick={() => setFormData((p) => ({ ...p, icon: mapSkillToIcon(p.name) }))}>
                            Use Suggested
                        </Button>
                        <small className="text-muted">or pick:</small>
                        <div className="d-flex gap-2">
                            {[
                                'bi-filetype-html',
                                'bi-filetype-css',
                                'bi-filetype-js',
                                'bi-git',
                                'bi-github',
                                'bi-database',
                                'bi-terminal',
                                'bi-braces'
                            ].map((ic) => (
                                <button key={ic} type="button" className="btn btn-sm btn-light border" onClick={() => setFormData((p) => ({ ...p, icon: ic }))}>
                                    <i className={`${ic}`}></i>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
                <div className="ms-3">
                    <label className="btn btn-sm btn-outline-primary mb-0">
                        Upload Icon
                        <input type="file" accept="image/*" onChange={handleFileChange} hidden />
                    </label>
                </div>
            </div>

            <Button className="btn btn-primary" type="submit">

                {loading ? "Saving..." : "Save Skill"}

            </Button>

        </form>

    );

}

export default SkillForm;