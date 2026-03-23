import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/navbar.css";

function Navbar() {

const { user, logout } = useContext(AuthContext);

return(

<nav className="navbar">

<h2 className="logo">ST.ANN'S COLLEGE OF ENGINEERING AND TECHNOLOGY (AUTONOMOUS)</h2>

{!user && (

<div className="nav-links">

<NavLink to="/" className="nav-link">
Home
</NavLink>

<NavLink to="/events" className="nav-link">
Events
</NavLink>

<NavLink to="/login" className="nav-link">
Login
</NavLink>

<NavLink to="/register" className="nav-link register-btn">
Register
</NavLink>

</div>

)}

{user && (

<div className="nav-links">

<span className="user-name">
Welcome, {user.name}
</span>

{/* Admin Dashboard */}
{user.role === "admin" && (
<NavLink to="/admin" className="nav-link">
Dashboard
</NavLink>
)}

{/* Organizer Dashboard */}
{user.role === "organizer" && (
<NavLink to="/organizer" className="nav-link">
Dashboard
</NavLink>
)}

{/* Student Dashboard */}
{user.role === "student" && (
<NavLink to="/student" className="nav-link">
Dashboard
</NavLink>
)}

<button className="logout-btn" onClick={logout}>
Logout
</button>

</div>

)}

</nav>

)

}

export default Navbar;