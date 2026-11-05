import React, { useState, useRef } from "react";
import { motion } from "framer-motion";

import { styles } from "../styles";
import { EarthCanvas } from "./canvas";
import { SectionWrapper } from "../hoc";
import { slideIn } from "../utils/motion";

// Contact
const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);

  // handle form change
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  // validate form on submit
  const validateForm = () => {
    // form fields
    const { name, email, message } = form;

    // Error message
    const nameError = document.querySelector("#name-error");
    const emailError = document.querySelector("#email-error");
    const messageError = document.querySelector("#message-error");
    let current = { name: false, email: false, message: false };

    // validate name
    if (name.trim().length < 3) {
      nameError.classList.remove("hidden");
      current["name"] = false;
    } else {
      nameError.classList.add("hidden");
      current["name"] = true;
    }

    const email_regex =
      /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    // valiate email
    if (!email.trim().toLowerCase().match(email_regex)) {
      emailError.classList.remove("hidden");
      current["email"] = false;
    } else {
      emailError.classList.add("hidden");
      current["email"] = true;
    }

    // validate message
    if (message.trim().length < 5) {
      messageError.classList.remove("hidden");
      current["message"] = false;
    } else {
      messageError.classList.add("hidden");
      current["message"] = true;
    }

    // True if all fields are validated
    return Object.keys(current).every((k) => current[k]);
  };

  // handle form submit
  const handleSubmit = async (e) => {
    // prevent default page reload
    e.preventDefault();

    // validate form
    if (!validateForm()) return false;

    // show loader
    setLoading(true);

    try {
      // Send form data to Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          access_key: import.meta.env.VITE_WEB3FORMS_KEY,
          name: form.name,
          email: form.email,
          company: form.company || 'N/A',
          message: form.message,
          subject: `Portfolio Contact from ${form.name}`,
          from_name: 'Portfolio Contact Form',
          replyto: form.email,
        }),
      });

      const data = await response.json();

      if (data.success) {
        // Success
        setLoading(false);
        alert("Thank you! Your message has been sent successfully.");

        setForm({
          name: "",
          email: "",
          company: "",
          message: "",
        });
      } else {
        // Error from Web3Forms
        setLoading(false);
        alert(data.message || "Sorry, something went wrong. Please try again.");
      }
    } catch (error) {
      // Network or other error
      setLoading(false);
      console.error("Error:", error);
      alert("Sorry, something went wrong. Please try again.");
    }
  };

  return (
    <div className="xl:mt-12 xl:flex-row flex-col-reverse flex gap-10 overflow-hidden">
      <motion.div
        variants={slideIn("left", "tween", 0.2, 1)}
        className="flex-[0.75] bg-black-100 p-8 rounded-2xl"
      >
        {/* Title */}
        <p className={styles.sectionSubText}>Get in touch</p>
        <h3 className={styles.sectionHeadText}>Contact.</h3>

        {/* Form */}
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="mt-12 flex flex-col gap-8"
        >
          {/* Name */}
          <label htmlFor="name" className="flex flex-col">
            <span className="text-white font-medium mb-4">Name*</span>
            <input
              type="text"
              name="name"
              id="name"
              value={form.name}
              onChange={handleChange}
              placeholder="John Doe"
              title="What's your name?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />

            {/* Invalid Name */}
            <span className="text-red-400 mt-2 hidden" id="name-error">
              Invalid Name!
            </span>
          </label>

          {/* Email */}
          <label htmlFor="email" className="flex flex-col">
            <span className="text-white font-medium mb-4">Reply Email*</span>
            <input
              type="email"
              name="email"
              id="email"
              value={form.email}
              onChange={handleChange}
              placeholder="johndoe@email.com"
              title="What's your email?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />

            {/* Invalid Email */}
            <span className="text-red-400 mt-2 hidden" id="email-error">
              Invalid E-mail!
            </span>
          </label>

          {/* Company */}
          <label htmlFor="company" className="flex flex-col">
            <span className="text-white font-medium mb-4">Company</span>
            <input
              type="text"
              name="company"
              id="company"
              value={form.company}
              onChange={handleChange}
              placeholder="Your Company"
              title="What's your company?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />
          </label>

          {/* Message */}
          <label htmlFor="message" className="flex flex-col">
            <span className="text-white font-medium mb-4">Message*</span>
            <textarea
              rows={7}
              type="text"
              name="message"
              id="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Hello there!"
              title="What do you want to say?"
              className="bg-tertiary py-4 px-6 placeholder:text-secondary text-white rounded-lg outline-none border-none font-medium"
            />

            {/* Invalid Message */}
            <span className="text-red-400 mt-2 hidden" id="message-error">
              Invalid Message!
            </span>
          </label>

          {/* Submit */}
          <button
            type="submit"
            title={loading ? "Sending..." : "Send"}
            className="bg-tertiary py-3 px-8 outline-none w-fit text-white font-bold shadow-md shadow-primary rounded-xl"
            disabled={loading}
          >
            {/* check loader state */}
            {loading ? "Sending..." : "Send"}
          </button>
        </form>
      </motion.div>

      {/* Earth Model */}
      <motion.div
        variants={slideIn("right", "tween", 0.2, 1)}
        className="xl:flex-1 xl:h-auto md:h-[550px] h-[350px]"
      >
        <EarthCanvas />
      </motion.div>
    </div>
  );
};

export default SectionWrapper(Contact, "contact");
