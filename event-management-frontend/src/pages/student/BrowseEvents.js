import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/table.css";

function BrowseEvents(){

const [events,setEvents] = useState([]);
const [participations,setParticipations] = useState({});
const [loading,setLoading] = useState(true);

useEffect(()=>{
fetchData();
},[]);

const fetchData = async ()=>{

try{

//const user = JSON.parse(localStorage.getItem("user"));

/* get approved events */
const eventsRes = await API.get("/events/approved");

/* get student participations */
const partRes = await API.get("/student/participations");
/* convert participation list to object */
const map = {};

partRes.data.forEach(p=>{
map[p.event._id] = p.status;
});

setEvents(eventsRes.data);
setParticipations(map);

}catch(error){

console.error(error);
alert("Failed to load events");

}finally{

setLoading(false);

}

};

const register = async(eventId)=>{

try{

const res = await API.post("/student/participate",{
event:eventId
});

alert(res.data.message);

/* update button instantly */

setParticipations({
...participations,
[eventId]:"requested"
});

}catch(error){

const message =
error.response?.data?.message || "Registration failed";

alert(message);

}

};

const renderButton = (eventId)=>{

const status = participations[eventId];

if(!status){

return(

<button
className="action-btn approve-btn"
onClick={()=>register(eventId)}
>
Register
</button>

);

}

if(status === "requested"){

return(
<button className="action-btn view-btn" disabled>
Requested
</button>
);

}

if(status === "approved"){

return(
<button className="action-btn approve-btn" disabled>
Approved
</button>
);

}

if(status === "rejected"){

return(
<button className="action-btn reject-btn" disabled>
Rejected
</button>
);

}

};

return(

<DashboardLayout>

<div className="table-container">

<h2 className="table-title">Browse Events</h2>

{loading ? (

<p>Loading events...</p>

) : events.length === 0 ? (

<p>No events available</p>

) : (

<table>

<thead>
<tr>
<th>ID</th>
<th>Event</th>
<th>Date</th>
<th>Location</th>
<th>Status</th>
</tr>
</thead>

<tbody>

{events.map(event => (

<tr key={event._id}>

<td>{event._id.slice(-4)}</td>

<td>{event.title}</td>

<td>
{new Date(event.date).toLocaleDateString()}
</td>

<td>{event.location}</td>

<td>
{renderButton(event._id)}
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

export default BrowseEvents;