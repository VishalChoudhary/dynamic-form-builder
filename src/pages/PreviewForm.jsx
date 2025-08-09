import React, { useState } from "react";
import { useSelector } from "react-redux";

const PreviewForm = () => {
  const { currentForm } = useSelector((state) => state.form);

  // State for holding user input
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});

  if (!currentForm || currentForm.fields.length === 0) {
    return <p>No form loaded. Please create a form first.</p>;
  }

  const handleChange = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    let newErrors = {};

    currentForm.fields.forEach((field) => {
      if (field.required && !formData[field.label]) {
        newErrors[field.label] = "This field is required.";
      }
      // Example email validation
      if (field.type === "text" && field.label.toLowerCase().includes("email")) {
        const emailRegex = /\S+@\S+\.\S+/;
        if (formData[field.label] && !emailRegex.test(formData[field.label])) {
          newErrors[field.label] = "Invalid email format.";
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      alert("Form submitted successfully!");
      console.log("User Input:", formData);
    }
  };

  return (
    <div>
      <h1>Preview: {currentForm.name}</h1>

      <form onSubmit={handleSubmit}>
        {currentForm.fields.map((field, index) => (
          <div key={index} style={{ marginBottom: "15px" }}>
            <label>
              {field.label}
              {field.required && <span style={{ color: "red" }}> *</span>}
            </label>
            <div>
              {field.type === "text" && (
                <input
                  type="text"
                  defaultValue={field.defaultValue || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              )}
              {field.type === "number" && (
                <input
                  type="number"
                  defaultValue={field.defaultValue || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              )}
              {field.type === "textarea" && (
                <textarea
                  defaultValue={field.defaultValue || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              )}
              {field.type === "select" && (
                <select
                  defaultValue={field.defaultValue || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                >
                  <option value="">Select</option>
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt}>
                      {opt}
                    </option>
                  ))}
                </select>
              )}
              {field.type === "radio" && (
                field.options.map((opt, i) => (
                  <label key={i} style={{ marginRight: "10px" }}>
                    <input
                      type="radio"
                      name={field.label}
                      value={opt}
                      onChange={(e) => handleChange(field.label, e.target.value)}
                    />
                    {opt}
                  </label>
                ))
              )}
              {field.type === "checkbox" && (
                <input
                  type="checkbox"
                  defaultChecked={field.defaultValue || false}
                  onChange={(e) => handleChange(field.label, e.target.checked)}
                />
              )}
              {field.type === "date" && (
                <input
                  type="date"
                  defaultValue={field.defaultValue || ""}
                  onChange={(e) => handleChange(field.label, e.target.value)}
                />
              )}
            </div>
            {errors[field.label] && (
              <p style={{ color: "red" }}>{errors[field.label]}</p>
            )}
          </div>
        ))}

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default PreviewForm;