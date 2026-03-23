import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function ProtectedRoute({ children, role }) {

  const { user, loading } = useContext(AuthContext);

  // Wait until auth is loaded
  if (loading) {
    return <p>Loading...</p>;
  }

  // Not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Role restriction
  if (role && user.role !== role) {

    if (user.role === "admin") {
      return <Navigate to="/admin-dashboard" replace />;
    }

    if (user.role === "organizer") {
      return <Navigate to="/organizer-dashboard" replace />;
    }

    if (user.role === "student") {
      return <Navigate to="/student-dashboard" replace />;
    }

  }

  return children;
}

export default ProtectedRoute;