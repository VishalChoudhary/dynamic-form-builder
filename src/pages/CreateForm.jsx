import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormName, addField, saveForm } from "../redux/formSlice";

function CreateForm() {
  const dispatch = useDispatch();
  const currentForm = useSelector((state) => state.form.currentForm);

  const handleTest = () => {
    dispatch(setFormName("My First Form"));
    dispatch(addField({ type: "text", label: "Name", required: true }));
  };

  const handleSave = () => {
    dispatch(saveForm());
    alert("Form saved to localStorage!");
  };

  return (
    <div>
      <h1>Create Form</h1>
      <button onClick={handleTest}>Test Add Field</button>
      <button onClick={handleSave} style={{ marginLeft: "10px" }}>
        Save Form
      </button>
      <pre>{JSON.stringify(currentForm, null, 2)}</pre>
    </div>
  );
}

export default CreateForm;