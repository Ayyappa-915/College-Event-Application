import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCard from "../../components/dashboard/StatsCard";
import API from "../../api/api";
import { FaCalendarAlt, FaClock, FaCheckCircle } from "react-icons/fa";
import "../../styles/dashboard.css";
import "../../styles/table.css";

function OrganizerDashboard(){

const [events,setEvents] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{
fetchEvents();
},[]);

const fetchEvents = async ()=>{

try{

const res = await API.get("/organizer/my-events");

setEvents(res.data);

}catch(error){

console.error(error);
alert("Failed to load events");

}finally{

setLoading(false);

}

};

return(

<DashboardLayout>

<h2>Organizer Dashboard</h2>

<div className="cards">

<StatsCard
title="My Events"
value={events.length}
icon={<FaCalendarAlt />}
color="#2563eb"
/>

<StatsCard
title="Pending Requests"
value={events.filter(e=>e.status==="pending").length}
icon={<FaClock />}
color="#f59e0b"
/>

<StatsCard
title="Approved Events"
value={events.filter(e=>e.status==="approved").length}
icon={<FaCheckCircle />}
color="#10b981"
/>

</div>

<div className="table-container">

<h3 className="table-title">My Recent Events</h3>

{loading ? (

<p>Loading events...</p>

) : events.length === 0 ? (

<p>No events created yet</p>

) : (

<table>

<thead>
<tr>
<th>ID</th>
<th>Event</th>
<th>Date</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{events.map(event => (

<tr key={event._id}>

<td>{event._id.slice(-4)}</td>

<td>{event.title}</td>

<td>{new Date(event.date).toLocaleDateString()}</td>

<td style={{textTransform:"capitalize"}}>
{event.status}
</td>

</tr>

))}

</tbody>

</table>

)}

</div>

</DashboardLayout>

)

}

export default OrganizerDashboard;