import "../../styles/public.css";
import { useNavigate } from "react-router-dom";

function EventCard({ event }) {

  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/events/${event._id}`);
  };

  return (

    <div className="event-card">

      <h3>{event.title}</h3>

      <p><strong>Date:</strong> {event.date}</p>

      <p><strong>Location:</strong> {event.location}</p>

      <button className="primary-btn" onClick={handleViewDetails}>
        View Details
      </button>

    </div>

  );

}

export default EventCard;