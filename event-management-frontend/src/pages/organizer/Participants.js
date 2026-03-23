import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/table.css";
import "../../styles/forms.css";

function Participants(){

const [participants,setParticipants] = useState([]);
const [filtered,setFiltered] = useState([]);
const [selected,setSelected] = useState(null);
const [department,setDepartment] = useState("");
const [loading,setLoading] = useState(true);

useEffect(()=>{
fetchParticipants();
},[]);

const fetchParticipants = async ()=>{

try{

const res = await API.get("/organizer/participants");

setParticipants(res.data);
setFiltered(res.data);

}catch(error){

console.error(error);
alert("Failed to load participants");

}finally{

setLoading(false);

}

};

const filterByDepartment = (dept)=>{

setDepartment(dept);

if(dept === ""){
setFiltered(participants);
}else{
setFiltered(
participants.filter(p => p.student?.department === dept)
);
}

};

return(

<DashboardLayout>

<div className="table-container">

<h2 className="table-title">Manage Participants</h2>

{/* FILTER */}

<div className="filter-container">

<label className="filter-label">
Department:
</label>

<select
className="filter-select"
value={department}
onChange={(e)=>filterByDepartment(e.target.value)}
>

<option value="">All Departments</option>
<option value="CSE">CSE</option>
<option value="ECE">ECE</option>
<option value="EEE">EEE</option>
<option value="MECH">MECH</option>
<option value="CIVIL">CIVIL</option>
<option value="IT">IT</option>

</select>

</div>

{loading ? (

<p>Loading participants...</p>

) : filtered.length === 0 ? (

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

{filtered.map(p => (

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

</td>

</tr>

))}

</tbody>

</table>

)}

</div>

{/* VIEW DETAILS MODAL */}

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