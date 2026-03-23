import SidePanel from "../components/dashboard/SidePanel";
import Navbar from "../components/common/Navbar";
import "../styles/layout.css";

function DashboardLayout({ children }) {

  return (

    <div className="dashboard-container">

      {/* Sidebar */}
      <SidePanel />

      {/* Main Area */}
      <div className="main-content">

        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <div className="page-content">
          {children}
        </div>

      </div>

    </div>

  );

}

export default DashboardLayout;