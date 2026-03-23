import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/table.css";

function MyParticipations(){

const [participations, setParticipations] = useState([]);
const [loading, setLoading] = useState(true);

useEffect(()=>{
fetchParticipations();
},[]);

const fetchParticipations = async ()=>{

try{

const res = await API.get("/student/participations");

setParticipations(res.data);

}catch(error){

console.error(error);
alert("Failed to load participations");

}finally{

setLoading(false);

}

};

return(

<DashboardLayout>

<div className="table-container">

<h2 className="table-title">My Participations</h2>

{loading ? (

<p>Loading participations...</p>

) : participations.length === 0 ? (

<p>No participation requests yet</p>

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

{participations.map(p => (

<tr key={p._id}>

<td>{p._id.slice(-4)}</td>

<td>{p.event?.title || "Event removed"}</td>

<td>
{p.event?.date
? new Date(p.event.date).toLocaleDateString()
: "N/A"}
</td>

<td>{p.event?.location || "N/A"}</td>

<td
style={{
textTransform:"capitalize",
fontWeight:"bold"
}}
>
{p.status}
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

export default MyParticipations;