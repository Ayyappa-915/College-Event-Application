import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/table.css";

function EventRequests(){

const [requests, setRequests] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(() => {
fetchRequests();
}, []);

const fetchRequests = async () => {

try {

const res = await API.get("/admin/event-requests");
setRequests(res.data);

} catch (error) {

console.error(error);
alert("Failed to load event requests");

} finally {

setLoading(false);

}

};

const approveEvent = async (id) => {

if(!window.confirm("Approve this event?")) return;

try {

await API.put(`/admin/approve-event/${id}`);

setRequests(requests.filter(r => r._id !== id));

alert("Event approved");

} catch (error) {

console.error(error);
alert("Failed to approve event");

}

};

const rejectEvent = async (id) => {

if(!window.confirm("Reject this event?")) return;

try {

await API.put(`/admin/reject-event/${id}`);

setRequests(requests.filter(r => r._id !== id));

alert("Event rejected");

} catch (error) {

console.error(error);
alert("Failed to reject event");

}

};

return(

<DashboardLayout>

<div className="table-container">

<h2 className="table-title">Event Requests</h2>

{loading ? (

<p>Loading requests...</p>

) : requests.length === 0 ? (

<p>No event requests</p>

) : (

<table>

<thead>
<tr>
<th>ID</th>
<th>Event</th>
<th>Organizer</th>
<th>Department</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{requests.map(req => (

<tr key={req._id}>

<td>{req._id.slice(-4)}</td>

<td>{req.title}</td>

<td>{req.organizer?.name}</td>

<td>{req.department}</td>

<td>

<button
className="action-btn approve-btn"
onClick={() => approveEvent(req._id)}
>
Approve
</button>

<button
className="action-btn reject-btn"
onClick={() => rejectEvent(req._id)}
>
Reject
</button>

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

export default EventRequests;