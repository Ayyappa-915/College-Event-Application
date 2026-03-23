import { Routes, Route } from "react-router-dom";

/* Public Pages */

import Home from "./pages/public/Home";
import EventList from "./pages/public/EventList";
import EventDetails from "./pages/public/EventDetails";

/* Auth Pages */

import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

/* Admin Pages */

import AdminDashboard from "./pages/admin/AdminDashboard";
import CreateOrganizer from "./pages/admin/CreateOrganizer";
import ManageOrganizers from "./pages/admin/ManageOrganizers";
import EventRequests from "./pages/admin/EventRequests";
import ManageEvents from "./pages/admin/ManageEvents";
import Participants from "./pages/admin/Participants";

/* Organizer Pages */

import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import SendEventRequest from "./pages/organizer/SendEventRequest";
import MyEvents from "./pages/organizer/MyEvents";
import ParticipationRequests from "./pages/organizer/ParticipationRequests";
import OrganizerParticipants from "./pages/organizer/Participants";

/* Student Pages */

import StudentDashboard from "./pages/student/StudentDashboard";
import BrowseEvents from "./pages/student/BrowseEvents";
import MyParticipations from "./pages/student/MyParticipations";
import CompletedEvents from "./pages/student/CompletedEvents";
import StudentProfile from "./pages/student/StudentProfile";

/* Error */

import NotFound from "./pages/errors/NotFound";

/* Protected Route */

import ProtectedRoute from "./routes/ProtectedRoute";

function App() {

  return (

    <Routes>

      {/* PUBLIC */}

      <Route path="/" element={<Home />} />
      <Route path="/events" element={<EventList />} />
      <Route path="/events/:id" element={<EventDetails />} />

      {/* AUTH */}

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* ADMIN ROUTES */}

      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/create-organizer"
        element={
          <ProtectedRoute role="admin">
            <CreateOrganizer />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/manage-organizers"
        element={
          <ProtectedRoute role="admin">
            <ManageOrganizers />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/event-requests"
        element={
          <ProtectedRoute role="admin">
            <EventRequests />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/manage-events"
        element={
          <ProtectedRoute role="admin">
            <ManageEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/admin/participants"
        element={
          <ProtectedRoute role="admin">
            <Participants />
          </ProtectedRoute>
        }
      />

      {/* ORGANIZER ROUTES */}

      <Route
        path="/organizer-dashboard"
        element={
          <ProtectedRoute role="organizer">
            <OrganizerDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/send-event"
        element={
          <ProtectedRoute role="organizer">
            <SendEventRequest />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/my-events"
        element={
          <ProtectedRoute role="organizer">
            <MyEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/organizer/participation-requests"
        element={
          <ProtectedRoute role="organizer">
            <ParticipationRequests />
          </ProtectedRoute>
        }
      />

      {/* ⭐ NEW ROUTE ADDED */}

      <Route
        path="/organizer/participants"
        element={
          <ProtectedRoute role="organizer">
            <OrganizerParticipants />
          </ProtectedRoute>
        }
      />

      {/* STUDENT ROUTES */}

      <Route
        path="/student-dashboard"
        element={
          <ProtectedRoute role="student">
            <StudentDashboard />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/browse-events"
        element={
          <ProtectedRoute role="student">
            <BrowseEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/my-participations"
        element={
          <ProtectedRoute role="student">
            <MyParticipations />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/completed-events"
        element={
          <ProtectedRoute role="student">
            <CompletedEvents />
          </ProtectedRoute>
        }
      />

      <Route
        path="/student/profile"
        element={
          <ProtectedRoute role="student">
            <StudentProfile />
          </ProtectedRoute>
        }
      />

      {/* 404 */}

      <Route path="*" element={<NotFound />} />

    </Routes>

  );

}

export default App;