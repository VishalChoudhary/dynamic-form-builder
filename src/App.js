import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import CreateForm from "./pages/CreateForm";
import PreviewForm from "./pages/PreviewForm";
import MyForms from "./pages/MyForms";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/create" style={{ marginRight: "10px" }}>Create Form</Link>
        <Link to="/preview" style={{ marginRight: "10px" }}>Preview</Link>
        <Link to="/myforms">My Forms</Link>
      </nav>
      <Routes>
        <Route path="/create" element={<CreateForm />}/>
        <Route path="/preview" element={<PreviewForm />}/>
        <Route path="/myforms" element={<MyForms />}/>
      </Routes>
    </Router>
  );
}

export default App;
