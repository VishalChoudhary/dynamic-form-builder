import React from 'react'
import { useSelector } from 'react-redux';

const MyForms = () => {

  const savedForms = useSelector((state) => state.form.savedForms);

  return (
    <div>
      <h1>My Forms</h1>
      {savedForms.length === 0 ? (
        <p>No forms saved yet.</p>
      ) : (
        <ul>
          {savedForms.map((form, index) => (
            <li key={index}>
              <strong>{form.name}</strong> —{" "}
              {new Date(form.createdAt).toLocaleString()}
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default MyForms
