import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/table.css";
import "../../styles/forms.css";

function Participants(){

const [participants,setParticipants] = useState([]);
const [selected,setSelected] = useState(null);
const [loading,setLoading] = useState(true);

useEffect(()=>{
fetchParticipants();
},[]);

const fetchParticipants = async ()=>{

try{

const res = await API.get("/admin/participants");

setParticipants(res.data);

}catch(error){

console.error(error);
alert("Failed to load participants");

}finally{

setLoading(false);

}

};

const deleteParticipant = async(id)=>{

if(!window.confirm("Delete this participation record?")) return;

try{

await API.delete(`/admin/participant/${id}`);

setParticipants(participants.filter(p => p._id !== id));

}catch(error){

console.error(error);
alert("Failed to delete participant");

}

};

return(

<DashboardLayout>

<div className="table-container">

<h2 className="table-title">Participants</h2>

{loading ? (

<p>Loading participants...</p>

) : participants.length === 0 ? (

<p>No participants found</p>

) : (

<table>

<thead>
<tr>
<th>ID</th>
<th>Student</th>
<th>Roll Number</th>
<th>Department</th>
<th>Event</th>
<th>Status</th>
<th>Action</th>
</tr>
</thead>

<tbody>

{participants.map(p => (

<tr key={p._id}>

<td>{p._id.slice(-4)}</td>

<td>{p.student?.name}</td>

<td>{p.student?.rollNumber}</td>

<td>{p.student?.department}</td>

<td>{p.event?.title}</td>

<td style={{textTransform:"capitalize"}}>
{p.status}
</td>

<td>

<button
className="action-btn view-btn"
onClick={()=>setSelected(p)}
>
View
</button>

<button
className="action-btn reject-btn"
onClick={()=>deleteParticipant(p._id)}
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


{/* VIEW MODAL */}

{selected && (

<div className="modal-overlay">

<div className="modal">

<h3>Participant Details</h3>

<table className="details-table">

<tbody>

<tr>
<td><b>Name</b></td>
<td>{selected.student?.name}</td>
</tr>

<tr>
<td><b>Roll Number</b></td>
<td>{selected.student?.rollNumber}</td>
</tr>

<tr>
<td><b>Department</b></td>
<td>{selected.student?.department}</td>
</tr>

<tr>
<td><b>Email</b></td>
<td>{selected.student?.email}</td>
</tr>

<tr>
<td><b>Event</b></td>
<td>{selected.event?.title}</td>
</tr>

<tr>
<td><b>Date</b></td>
<td>{new Date(selected.event?.date).toLocaleDateString()}</td>
</tr>

<tr>
<td><b>Location</b></td>
<td>{selected.event?.location}</td>
</tr>

<tr>
<td><b>Status</b></td>
<td>{selected.status}</td>
</tr>

</tbody>

</table>

<button
className="form-btn"
onClick={()=>setSelected(null)}
>
Close
</button>

</div>

</div>

)}

</DashboardLayout>

)

}

export default Participants;