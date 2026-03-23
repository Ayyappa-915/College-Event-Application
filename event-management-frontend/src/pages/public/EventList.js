import { useEffect, useState } from "react";
import MainLayout from "../../layouts/MainLayout";
import EventDetails from "./EventDetails";
import API from "../../api/api";

function EventList() {

const [events,setEvents] = useState([]);
const [selectedEvent,setSelectedEvent] = useState(null);

useEffect(()=>{
fetchEvents();
},[]);

const fetchEvents = async ()=>{
try{
const res = await API.get("/events/approved");
setEvents(res.data);
}catch(error){
console.error(error);
}
};

return(

<MainLayout>

<h2 className="page-title">Upcoming Events</h2>

<div className="event-grid">

{events.map(event => (

<div key={event._id} className="event-card">

<h3>{event.title}</h3>

<p>{new Date(event.date).toLocaleDateString()}</p>

<p>{event.location}</p>

<button
className="action-btn view-btn"
onClick={()=>setSelectedEvent(event)}
>
View Details
</button>

</div>

))}

</div>

{selectedEvent && (
<EventDetails
event={selectedEvent}
onClose={()=>setSelectedEvent(null)}
/>
)}

</MainLayout>

);

}

export default EventList;