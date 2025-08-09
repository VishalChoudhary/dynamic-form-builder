import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    currentForm:{
        name:"",
        fields:[]
    },
    savedForms: []
};

const formSlice = createSlice({
    name:"form",
    initialState,
    reducers:{
        setFormName(state,action){
            state.currentForm.name = action.payload;
        },
        addField(state,action){
            state.currentForm.fields.push(action.payload);
        },
        updateField(state,action){
            const {index,updatedField} = action.payload;
            state.currentForm.fields[index] = updatedField;
        },
        removeField(state,action){
            state.currentForm.fields.splice(action.payload,1);
        },

        //save current form to savedForms + reset currentForm
        saveForm(state){
            const newForm = {
                ...state.currentForm,
                createdAt: new Date().toISOString()
            };
            state.savedForms.push(newForm);
            state.currentForm = {name: "",fields:[]};
        },

        // Load form into currentForm (for previewing or editing)
        loadForm(state,action){
            state.currentForm = action.payload;
        },

        // Load saved forms from localStorage
        setSavedForms(state,action){
            state.savedForms = action.payload;
        }
    }
});

export const {
  setFormName,
  addField,
  updateField,
  removeField,
  saveForm,
  loadForm,
  setSavedForms
} = formSlice.actions;

export default formSlice.reducer;