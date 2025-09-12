import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";

const Contact = () => {
  const containerRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: "", message: "" });

  useEffect(() => {
    emailjs.init("6IXH9Ehp3QiX7iYg6"); // your public key

    const items = document.querySelectorAll(".contact-item");
    items.forEach((item, i) => {
      item.style.opacity = "0";
      item.style.transform = "translateY(50px)";

      setTimeout(() => {
        item.style.transition = "all 0.8s ease";
        item.style.opacity = "1";
        item.style.transform = "translateY(0)";
      }, i * 200);
    });
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    if (!formData.name.trim()) return "Name is required";
    if (!formData.email.trim()) return "Email is required";
    if (!formData.message.trim()) return "Message is required";

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) return "Please enter a valid email";

    return null;
  };

  const handleSubmit = async () => {
    const validationError = validateForm();
    if (validationError) {
      setSubmitStatus({ type: "error", message: validationError });
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus({ type: "", message: "" });

    try {
      const templateParams = {
        user_name: formData.name,
        user_email: formData.email,
        user_message: formData.message,
      };

      await emailjs.send(
        "service_nz6uupa", // your service ID
        "template_ttlwouk", // your template ID
        templateParams,
        "6IXH9Ehp3QiX7iYg6" // your public key
      );

      setSubmitStatus({
        type: "success",
        message: "Message sent successfully! I'll get back to you soon.",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending email:", error);
      setSubmitStatus({
        type: "error",
        message: "Failed to send message. Please try again.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      ref={containerRef}
      className="min-h-screen bg-black w-full flex flex-col items-center justify-center px-6 py-16"
    >
      <h1 className="text-white font-semibold text-4xl md:text-6xl lg:text-7xl mb-12 text-center">
        Contact Me
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-4xl">
        <div className="contact-item bg-neutral-900 border border-neutral-800 rounded-lg p-6 text-white flex flex-col gap-4">
          <h2 className="text-2xl font-semibold">Get in Touch</h2>
          <p className="text-neutral-400">
            I'm always open to discussing new opportunities, collaborations, or
            just chatting about tech & ideas.
          </p>
          <div className="flex flex-col gap-2 text-neutral-300">
            <p>
              📧{" "}
              <a
                href="mailto:ayushsrivastava03004@gmail.com"
                className="underline hover:text-white transition"
              >
                ayushsrivastava03004@gmail.com
              </a>
            </p>
            <p>📱 +91 9336547072</p>
            <p>📍 Chandigarh, India</p>
          </div>
        </div>

        <div className="contact-item bg-neutral-900 border border-neutral-800 rounded-lg p-6 flex flex-col gap-4 text-white">
          <h2 className="text-2xl font-semibold">Send a Message</h2>

          {submitStatus.message && (
            <div
              className={`p-3 rounded-md text-sm ${
                submitStatus.type === "success"
                  ? "bg-green-900/50 text-green-300 border border-green-700"
                  : "bg-red-900/50 text-red-300 border border-red-700"
              }`}
            >
              {submitStatus.message}
            </div>
          )}

          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
            className="bg-neutral-800 px-4 py-2 rounded-md focus:outline-none focus:ring-0"
          />
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="Your Email"
            className="bg-neutral-800 px-4 py-2 rounded-md focus:outline-none focus:ring-0"
          />
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            rows="4"
            placeholder="Your Message"
            className="bg-neutral-800 px-4 py-2 rounded-md focus:outline-none focus:ring-0 resize-none"
          ></textarea>
          <button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className={`border border-white px-4 py-2 hover:bg-white hover:text-black transition duration-200 rounded-md flex items-center justify-center ${
              isSubmitting ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {isSubmitting ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                Sending...
              </div>
            ) : (
              "Send Message"
            )}
          </button>
        </div>
      </div>

      <div className="contact-item flex gap-6 mt-12 text-white">
        <a
          href="https://github.com/Ayush1403"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-400 transition duration-200"
        >
          GitHub
        </a>
        <a
          href="https://www.linkedin.com/in/ayush-srivastava1403/"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-neutral-400 transition duration-200"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
};

export default Contact;
