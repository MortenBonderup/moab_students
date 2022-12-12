import { NavLink } from "react-router-dom";

export default function Nav() {
  return (
    <nav>
      <NavLink to="/" end>Home</NavLink>&nbsp;&nbsp;
      <NavLink to="/createproject" end>Create Project</NavLink>&nbsp;&nbsp;
      <NavLink to="/createstudent" end>Create Student</NavLink>&nbsp;&nbsp;
    </nav>
  );
}
