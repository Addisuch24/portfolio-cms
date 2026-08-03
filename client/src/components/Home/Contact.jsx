import { useState } from "react";
import publicService from "../../services/publicService";
import Input from "../common/Input";
import TextArea from "../common/TextArea";
import Button from "../common/Button";
import Toast from "../common/Toast";

function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "", type: "success" });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      await publicService.sendMessage(form);
      setToast({ show: true, message: "Message sent successfully! We'll get back to you soon.", type: "success" });
      setForm({
        name: "",
        email: "",
        subject: "",
        message: "",
      });
    } catch (error) {
      console.error(error);
      setToast({
        show: true,
        message: error.response?.data?.message || "Failed to send message. Please try again.",
        type: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="contact-section">
      <div className="container">
        <div className="text-center mb-5">
          <h2 className="display-5 fw-bold">Get In Touch</h2>
          <p className="lead text-muted">Have a question or want to work together?</p>
        </div>

        <div className="row">
          <div className="col-lg-8 mx-auto">
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="row">
                <div className="col-md-6 mb-3">
                  <Input
                    label="Your Name"
                    name="name"
                    placeholder="Name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="col-md-6 mb-3">
                  <Input
                    label="Your Email"
                    name="email"
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="mb-3">
                <Input
                  label="Subject"
                  name="subject"
                  placeholder="What's this about?"
                  value={form.subject}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4">
                <TextArea
                  label="Message"
                  name="message"
                  placeholder="Your message here..."
                  value={form.message}
                  onChange={handleChange}
                  rows={6}
                  required
                />
              </div>

              <div className="d-grid gap-2">
                <Button type="submit" disabled={loading}>
                  {loading ? "Sending..." : "Send Message"}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>

      <Toast
        show={toast.show}
        message={toast.message}
        type={toast.type}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </section>
  );
}

export default Contact;