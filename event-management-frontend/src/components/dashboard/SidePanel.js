import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import "../../styles/sidebar.css";

function SidePanel() {

  const { user, logout } = useContext(AuthContext);

  if (!user) return null;

  const role = user.role;

  const dashboardPath = {
    admin: "/admin-dashboard",
    organizer: "/organizer-dashboard",
    student: "/student-dashboard"
  };

  return (

    <div className="sidebar">

      <h2 className="sidebar-title">EMS</h2>

      {/* Dashboard */}

      <NavLink to={dashboardPath[role]} className="menu">
        Dashboard
      </NavLink>

      {/* ADMIN */}

      {role === "admin" && (
        <>

          <p className="menu-section">Organizer</p>

          <NavLink to="/admin/create-organizer" className="menu">
            Create Organizer
          </NavLink>

          <NavLink to="/admin/manage-organizers" className="menu">
            Manage Organizers
          </NavLink>

          <p className="menu-section">Events</p>

          <NavLink to="/admin/event-requests" className="menu">
            Event Requests
          </NavLink>

          <NavLink to="/admin/manage-events" className="menu">
            Manage Events
          </NavLink>

          <p className="menu-section">Users</p>

          <NavLink to="/admin/participants" className="menu">
            Participants
          </NavLink>

        </>
      )}

      {role === "organizer" && (
  <>

    <p className="menu-section">Events</p>

    <NavLink to="/organizer/send-event" className="menu">
      Send Event Request
    </NavLink>

    <NavLink to="/organizer/my-events" className="menu">
      My Events
    </NavLink>

    <p className="menu-section">Participants</p>

    <NavLink to="/organizer/participation-requests" className="menu">
      Participation Requests
    </NavLink>

    <NavLink to="/organizer/participants" className="menu">
      Manage Participants
    </NavLink>

  </>
)}

      {/* STUDENT */}

      {role === "student" && (
        <>

          <p className="menu-section">Events</p>

          <NavLink to="/student/browse-events" className="menu">
            Browse Events
          </NavLink>

          <NavLink to="/student/my-participations" className="menu">
            My Participations
          </NavLink>

          <NavLink to="/student/completed-events" className="menu">
            Completed Events
          </NavLink>

          <p className="menu-section">Account</p>

          <NavLink to="/student/profile" className="menu">
            Profile
          </NavLink>

        </>
      )}

      <button className="logout-btn" onClick={logout}>
        Logout
      </button>

    </div>

  );

}

export default SidePanel;