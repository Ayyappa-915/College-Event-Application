import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/table.css";

function ParticipationRequests(){

const [requests,setRequests] = useState([]);
const [loading,setLoading] = useState(true);

useEffect(()=>{
fetchRequests();
},[]);

const fetchRequests = async ()=>{

try{

const res = await API.get("/organizer/participation-requests");

setRequests(res.data);

}catch(error){

console.error(error);
alert("Failed to load participation requests");

}finally{

setLoading(false);

}

};

const approve = async(id)=>{

if(!window.confirm("Approve this participant?")) return;

try{

await API.put(`/organizer/approve-participant/${id}`);

setRequests(requests.map(r =>
r._id === id ? {...r,status:"approved"} : r
));

}catch(error){

console.error(error);
alert("Failed to approve participant");

}

};

const reject = async(id)=>{

if(!window.confirm("Reject this participant?")) return;

try{

await API.put(`/organizer/reject-participant/${id}`);

setRequests(requests.map(r =>
r._id === id ? {...r,status:"rejected"} : r
));

}catch(error){

console.error(error);
alert("Failed to reject participant");

}

};

return(

<DashboardLayout>

<div className="table-container">

<h2 className="table-title">Participation Requests</h2>

{loading ? (

<p>Loading requests...</p>

) : requests.length === 0 ? (

<p>No participation requests</p>

) : (

<table>

<thead>
<tr>
<th>ID</th>
<th>Student</th>
<th>Roll Number</th>
<th>Event</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{requests.map(req => (

<tr key={req._id}>

<td>{req._id.slice(-4)}</td>

<td>{req.student?.name || "N/A"}</td>

<td>{req.student?.rollNumber || "N/A"}</td>

<td>{req.event?.title || "N/A"}</td>

<td style={{textTransform:"capitalize"}}>
{req.status}
</td>

<td>

{req.status === "requested" && (

<>
<button
className="action-btn approve-btn"
onClick={()=>approve(req._id)}
>
Approve
</button>

<button
className="action-btn reject-btn"
onClick={()=>reject(req._id)}
>
Reject
</button>
</>

)}

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

export default ParticipationRequests;