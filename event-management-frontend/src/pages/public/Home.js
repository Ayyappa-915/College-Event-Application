import MainLayout from "../../layouts/MainLayout";
import { Link } from "react-router-dom";
import "../../styles/public.css";

function Home() {

  return (

    <MainLayout>

      <section className="hero">

        <h1>College Event Management System</h1>

        <p>
          Discover, manage and participate in amazing college events.
        </p>

        <Link to="/events">
          <button className="primary-btn">
            Browse Events
          </button>
        </Link>

      </section>


      <section className="features">

        <div className="feature-card">
          <h3>Create Events</h3>
          <p>Organizers can submit event requests easily.</p>
        </div>

        <div className="feature-card">
          <h3>Join Events</h3>
          <p>Students can explore and participate in events.</p>
        </div>

        <div className="feature-card">
          <h3>Manage Events</h3>
          <p>Admin can approve and manage all events.</p>
        </div>

      </section>

    </MainLayout>

  );

}

export default Home;