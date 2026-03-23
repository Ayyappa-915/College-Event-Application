import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/table.css";
import "../../styles/forms.css";

function ManageEvents(){

const [events, setEvents] = useState([]);
const [filtered, setFiltered] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedEvent, setSelectedEvent] = useState(null);
const [statusFilter, setStatusFilter] = useState("all");

useEffect(() => {
fetchEvents();
}, []);

const fetchEvents = async () => {

try {

const res = await API.get("/admin/events");

setEvents(res.data);
setFiltered(res.data);

} catch (error) {

console.error(error);
alert("Failed to load events");

} finally {

setLoading(false);

}

};

const filterEvents = (status) => {

setStatusFilter(status);

if(status === "all"){
setFiltered(events);
}else{
setFiltered(events.filter(e => e.status === status));
}

};

const deleteEvent = async (id) => {

if(!window.confirm("Are you sure you want to delete this event?")) return;

try {

await API.delete(`/admin/events/${id}`);

const updated = events.filter(e => e._id !== id);

setEvents(updated);
setFiltered(updated);

alert("Event deleted successfully");

} catch (error) {

console.error(error);
alert("Failed to delete event");

}

};

return(

<DashboardLayout>

<div className="table-container">

<h2 className="table-title">Manage Events</h2>

{/* FILTER BUTTONS */}

<div className="filter-container">

<button
className={`filter-btn ${statusFilter === "all" ? "active" : ""}`}
onClick={()=>filterEvents("all")}
>
All
</button>

<button
className={`filter-btn ${statusFilter === "approved" ? "active" : ""}`}
onClick={()=>filterEvents("approved")}
>
Approved
</button>

<button
className={`filter-btn ${statusFilter === "pending" ? "active" : ""}`}
onClick={()=>filterEvents("pending")}
>
Pending
</button>

<button
className={`filter-btn ${statusFilter === "rejected" ? "active" : ""}`}
onClick={()=>filterEvents("rejected")}
>
Rejected
</button>

</div>

{loading ? (

<p>Loading events...</p>

) : filtered.length === 0 ? (

<p>No events found</p>

) : (

<table>

<thead>
<tr>
<th>ID</th>
<th>Event</th>
<th>Date</th>
<th>Status</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{filtered.map(event => (

<tr key={event._id}>

<td>{event._id.slice(-4)}</td>

<td>{event.title}</td>

<td>{new Date(event.date).toLocaleDateString()}</td>

<td>{event.status}</td>

<td>

<button
className="action-btn view-btn"
onClick={() => setSelectedEvent(event)}
>
View
</button>

<button
className="action-btn reject-btn"
onClick={() => deleteEvent(event._id)}
>
Delete
</button>

</td>

</tr>

))}

</tbody>

</table>

)}

</div>

{/* EVENT DETAILS POPUP */}

{selectedEvent && (

<div className="modal-overlay">

<div className="modal">

<h3>Event Details</h3>

<table className="details-table">

<tbody>

<tr>
<td><b>Title</b></td>
<td>{selectedEvent.title}</td>
</tr>

<tr>
<td><b>Description</b></td>
<td>{selectedEvent.description}</td>
</tr>

<tr>
<td><b>Department</b></td>
<td>{selectedEvent.department}</td>
</tr>

<tr>
<td><b>Date</b></td>
<td>{new Date(selectedEvent.date).toLocaleDateString()}</td>
</tr>

<tr>
<td><b>Location</b></td>
<td>{selectedEvent.location}</td>
</tr>

<tr>
<td><b>Status</b></td>
<td>{selectedEvent.status}</td>
</tr>

<tr>
<td><b>Organizer</b></td>
<td>{selectedEvent.organizer?.name}</td>
</tr>

</tbody>

</table>

<button
className="form-btn"
onClick={()=>setSelectedEvent(null)}
>
Close
</button>

</div>

</div>

)}

</DashboardLayout>

)

}

export default ManageEvents;