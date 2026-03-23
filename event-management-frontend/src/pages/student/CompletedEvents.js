import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/table.css";

function CompletedEvents(){

const [events,setEvents] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{
fetchEvents();
},[]);

const fetchEvents = async ()=>{

try{

//const user = JSON.parse(localStorage.getItem("user"));

const res = await API.get("/student/completed");
setEvents(res.data);

}catch(error){

console.error(error);
alert("Failed to load completed events");

}finally{

setLoading(false);

}

};

return(

<DashboardLayout>

<div className="table-container">

<h2 className="table-title">Completed Events</h2>

{loading ? (

<p>Loading events...</p>

) : events.length === 0 ? (

<p>No completed events yet</p>

) : (

<table>

<thead>
<tr>
<th>ID</th>
<th>Event</th>
<th>Date</th>
<th>Location</th>
<th>Certificate</th>
</tr>
</thead>

<tbody>

{events.map(e => (

<tr key={e._id}>

<td>{e._id.slice(-4)}</td>

<td>{e.event?.title}</td>

<td>
{new Date(e.event?.date).toLocaleDateString()}
</td>

<td>{e.event?.location}</td>

<td style={{color:"green",fontWeight:"bold"}}>
Available
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

export default CompletedEvents;