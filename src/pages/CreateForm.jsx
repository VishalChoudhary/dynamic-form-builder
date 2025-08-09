import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  setFormName,
  addField,
  removeField,
  saveForm
} from "../redux/formSlice";
import FieldForm from "../components/FieldForm";

function CreateForm() {
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.form.currentForm);

  const handleAddField = (field) => {
    dispatch(addField(field));
  };

  const handleDelete = (index) => {
    dispatch(removeField(index));
  };

  const handleSave = () => {
    if (!currentForm.name) {
      alert("Please enter a form name before saving.");
      return;
    }
    if (currentForm.fields.length === 0) {
      alert("Please add at least one field before saving.");
      return;
    }
    dispatch(saveForm());
    alert("Form saved successfully!");
  };

  return (
    <div>
      <h1>Create Form</h1>

      {/* Form name input */}
      <div style={{ marginBottom: "20px" }}>
        <label>
          Form Name:{" "}
          <input
            type="text"
            value={currentForm.name}
            onChange={(e) => dispatch(setFormName(e.target.value))}
          />
        </label>
      </div>

      {/* Field creator */}
      <FieldForm onAddField={handleAddField} />

      {/* List of added fields */}
      <h3>Added Fields:</h3>
      {currentForm.fields.length === 0 ? (
        <p>No fields added yet.</p>
      ) : (
        <ul>
          {currentForm.fields.map((field, index) => (
            <li key={index}>
              {field.label} ({field.type}){" "}
              {field.required && <strong>[Required]</strong>}{" "}
              <button onClick={() => handleDelete(index)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      <button
        onClick={handleSave}
        style={{ marginTop: "20px", padding: "5px 10px" }}
      >
        Save Form
      </button>
    </div>
  );
}

export default CreateForm;