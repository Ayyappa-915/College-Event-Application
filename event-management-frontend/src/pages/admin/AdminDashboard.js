import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import StatsCard from "../../components/dashboard/StatsCard";
import { FaCalendarAlt, FaClock, FaCheckCircle, FaUsers } from "react-icons/fa";
import API from "../../api/api";
import "../../styles/dashboard.css";
import "../../styles/table.css";

function AdminDashboard() {

const [stats, setStats] = useState({
totalEvents: 0,
pendingEvents: 0,
totalStudents: 0,
totalOrganizers: 0,
totalParticipants: 0
});

const [recentEvents, setRecentEvents] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchDashboard();
fetchRecentEvents();
}, []);

const fetchDashboard = async () => {

try {

const res = await API.get("/admin/dashboard");
setStats(res.data);

} catch (error) {

console.error(error);
alert("Failed to load dashboard stats");

}

};

const fetchRecentEvents = async () => {

try {

const res = await API.get("/admin/event-requests");
setRecentEvents(res.data);

} catch (error) {

console.error(error);

} finally {

setLoading(false);

}

};

return (

<DashboardLayout>

<h2>Admin Dashboard</h2>

<div className="cards">

<StatsCard
title="Total Events"
value={stats.totalEvents}
icon={<FaCalendarAlt />}
color="#2563eb"
/>

<StatsCard
title="Pending Requests"
value={stats.pendingEvents}
icon={<FaClock />}
color="#f59e0b"
/>

<StatsCard
title="Approved Events"
value={stats.totalEvents - stats.pendingEvents}
icon={<FaCheckCircle />}
color="#10b981"
/>

<StatsCard
title="Participants"
value={stats.totalParticipants}
icon={<FaUsers />}
color="#ef4444"
/>

</div>

<div className="table-container">

<h3 className="table-title">Recent Event Requests</h3>

{loading ? (

<p>Loading requests...</p>

) : recentEvents.length === 0 ? (

<p>No pending event requests</p>

) : (

<table>

<thead>
<tr>
<th>ID</th>
<th>Event</th>
<th>Organizer</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{recentEvents.map(event => (

<tr key={event._id}>

<td>{event._id.slice(-4)}</td>

<td>{event.title}</td>

<td>{event.organizer?.name}</td>

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

);

}

export default AdminDashboard;