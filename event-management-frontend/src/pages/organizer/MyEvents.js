import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/table.css";

function MyEvents(){

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

<div className="table-container">

<h2 className="table-title">My Events</h2>

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

export default MyEvents;