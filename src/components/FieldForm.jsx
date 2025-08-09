import React, { useState } from "react";

const FIELD_TYPES = [
  "text",
  "number",
  "textarea",
  "select",
  "radio",
  "checkbox",
  "date"
];

function FieldForm({ onAddField }) {
  const [type, setType] = useState("text");
  const [label, setLabel] = useState("");
  const [required, setRequired] = useState(false);
  const [defaultValue, setDefaultValue] = useState("");
  const [options, setOptions] = useState(""); // for select/radio

  const handleSubmit = (e) => {
    e.preventDefault();

    const newField = {
      type,
      label,
      required,
      defaultValue,
      options: options
        ? options.split(",").map((opt) => opt.trim())
        : [] // only used for select/radio
    };

    onAddField(newField);

    // Reset form
    setLabel("");
    setRequired(false);
    setDefaultValue("");
    setOptions("");
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
      <label>
        Field Type:
        <select value={type} onChange={(e) => setType(e.target.value)}>
          {FIELD_TYPES.map((t) => (
            <option key={t} value={t}>
              {t}
            </option>
          ))}
        </select>
      </label>

      <label style={{ marginLeft: "10px" }}>
        Label:
        <input
          type="text"
          value={label}
          onChange={(e) => setLabel(e.target.value)}
          required
        />
      </label>

      <label style={{ marginLeft: "10px" }}>
        Required:
        <input
          type="checkbox"
          checked={required}
          onChange={(e) => setRequired(e.target.checked)}
        />
      </label>

      {type !== "checkbox" && (
        <label style={{ marginLeft: "10px" }}>
          Default Value:
          <input
            type="text"
            value={defaultValue}
            onChange={(e) => setDefaultValue(e.target.value)}
          />
        </label>
      )}

      {(type === "select" || type === "radio") && (
        <label style={{ marginLeft: "10px" }}>
          Options (comma separated):
          <input
            type="text"
            value={options}
            onChange={(e) => setOptions(e.target.value)}
          />
        </label>
      )}

      <button type="submit" style={{ marginLeft: "10px" }}>
        Add Field
      </button>
    </form>
  );
}

export default FieldForm;
