import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CreateProject from "./pages/CreateProject";
import CreateStudent from "./pages/CreateStudent";
import ShowStudents from "./pages/ShowStudents";
import "./App.css";
import Nav from "./pages/Nav";

function App() {
  return (

      <main>
        <Nav/>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createproject" element={<CreateProject />} />
          <Route path="/createstudent" element={<CreateStudent />} />
          <Route path="/posts/:postId" element={<ShowStudents />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>

  );
}

export default App;
