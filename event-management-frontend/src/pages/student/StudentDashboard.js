import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCard from "../../components/dashboard/StatsCard";
import API from "../../api/api";
import { FaCalendarAlt, FaCheckCircle, FaClock } from "react-icons/fa";
import "../../styles/dashboard.css";
import "../../styles/table.css";

function StudentDashboard(){

const [stats,setStats] = useState({
totalEvents:0,
totalParticipations:0,
approvedParticipations:0
});

const [events,setEvents] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{
fetchDashboard();
},[]);

const fetchDashboard = async ()=>{

try{

const res = await API.get("/student/dashboard");
setStats(res.data);

const res2 = await API.get("/student/participations");
setEvents(res2.data);

}catch(error){

console.error(error);
alert("Failed to load dashboard");

}finally{
setLoading(false);
}

};

return(

<DashboardLayout>

<h2>Student Dashboard</h2>

<div className="cards">

<StatsCard
title="Available Events"
value={stats.totalEvents}
icon={<FaCalendarAlt />}
color="#2563eb"
/>

<StatsCard
title="Registered Events"
value={stats.totalParticipations}
icon={<FaCheckCircle />}
color="#10b981"
/>

<StatsCard
title="Completed Events"
value={stats.approvedParticipations}
icon={<FaClock />}
color="#f59e0b"
/>

</div>

<div className="table-container">

<h3 className="table-title">My Recent Events</h3>

{loading ? (

<p>Loading events...</p>

) : events.length === 0 ? (

<p>No participations yet</p>

) : (

<table>

<thead>
<tr>
<th>ID</th>
<th>Event</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{events.map(event => (

<tr key={event._id}>
<td>{event._id.slice(-4)}</td>
<td>{event.event?.title}</td>
<td style={{textTransform:"capitalize",fontWeight:"bold"}}>
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

export default StudentDashboard;