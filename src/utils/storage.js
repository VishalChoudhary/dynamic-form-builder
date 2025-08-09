//Key names in localstorage
const SAVED_FORMS_KEY = "savedForms";

//Get saved forms from localstorage

export const getSavedForms = () =>{
    const forms = localStorage.getItem(SAVED_FORMS_KEY);
    return forms ? JSON.parse(forms) : [];
};

//save form list to localStorage
export const saveFormsToStorage = (forms) =>{
    localStorage.setItem(SAVED_FORMS_KEY,JSON.stringify(forms));
}