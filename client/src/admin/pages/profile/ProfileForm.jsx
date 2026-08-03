import { useState } from "react";
import Input from "../../../components/common/Input";
import TextArea from "../../../components/common/TextArea";
import Button from "../../../components/common/Button";

function ProfileForm({ initialValues, loading, onSubmit }) {
  const [formData, setFormData] = useState({
    full_name: initialValues?.full_name || "",
    title: initialValues?.title || initialValues?.profession || "",
    about: initialValues?.about || initialValues?.bio || "",
    email: initialValues?.email || "",
    phone: initialValues?.phone || "",
    address: initialValues?.address || "",
  });

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

  return (
    <form onSubmit={submit}>
      <div className="row">
        <div className="col-md-6 mb-3">
          <Input
            label="Full Name"
            name="full_name"
            placeholder="Enter full name"
            value={formData.full_name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <Input
            label="Professional Title"
            name="title"
            placeholder="e.g. Full Stack Developer"
            value={formData.title}
            onChange={handleChange}
            required
          />
        </div>
      </div>

      <div className="mb-3">
        <TextArea
          label="About"
          name="about"
          placeholder="Write a brief description about yourself"
          value={formData.about}
          onChange={handleChange}
          rows={6}
          required
        />
      </div>

      <div className="row">
        <div className="col-md-6 mb-3">
          <Input
            label="Email"
            name="email"
            type="email"
            placeholder="your@email.com"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col-md-6 mb-3">
          <Input
            label="Phone"
            name="phone"
            placeholder="+1 234 567 8900"
            value={formData.phone}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="mb-3">
        <Input
          label="Address"
          name="address"
          placeholder="City, Country"
          value={formData.address}
          onChange={handleChange}
        />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Saving..." : "Save Profile"}
      </Button>
    </form>
  );
}

export default ProfileForm;