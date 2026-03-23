import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/table.css";
import "../../styles/forms.css";

function ManageOrganizers(){

const [organizers, setOrganizers] = useState([]);
const [loading, setLoading] = useState(true);
const [selectedOrganizer, setSelectedOrganizer] = useState(null);

useEffect(() => {
fetchOrganizers();
}, []);

const fetchOrganizers = async () => {

try {

const res = await API.get("/admin/organizers");
setOrganizers(res.data);

} catch (error) {

console.error(error);
alert("Failed to load organizers");

} finally {

setLoading(false);

}

};

const deleteOrganizer = async (id) => {

if(!window.confirm("Are you sure you want to delete this organizer?")) return;

try {

await API.delete(`/admin/organizer/${id}`);

setOrganizers(organizers.filter(o => o._id !== id));

alert("Organizer deleted successfully");

} catch (error) {

console.error(error);
alert("Failed to delete organizer");

}

};

return(

<DashboardLayout>

<div className="table-container">

<h2 className="table-title">Manage Organizers</h2>

{loading ? (

<p>Loading organizers...</p>

) : organizers.length === 0 ? (

<p>No organizers found</p>

) : (

<table>

<thead>
<tr>
<th>ID</th>
<th>Name</th>
<th>Email</th>
<th>Department</th>
<th>Actions</th>
</tr>
</thead>

<tbody>

{organizers.map(org => (

<tr key={org._id}>

<td>{org._id.slice(-4)}</td>

<td>{org.name}</td>

<td>{org.email}</td>

<td>{org.department}</td>

<td>

<button
className="action-btn view-btn"
onClick={()=>setSelectedOrganizer(org)}
>
View
</button>

<button
className="action-btn reject-btn"
onClick={() => deleteOrganizer(org._id)}
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


{/* ORGANIZER DETAILS MODAL */}

{selectedOrganizer && (

<div className="modal-overlay">

<div className="modal">

<h3>Organizer Details</h3>

<table className="details-table">

<tbody>

<tr>
<td><b>Name</b></td>
<td>{selectedOrganizer.name}</td>
</tr>

<tr>
<td><b>Email</b></td>
<td>{selectedOrganizer.email}</td>
</tr>

<tr>
<td><b>Roll Number</b></td>
<td>{selectedOrganizer.rollNumber}</td>
</tr>

<tr>
<td><b>Department</b></td>
<td>{selectedOrganizer.department}</td>
</tr>

<tr>
<td><b>Role</b></td>
<td>{selectedOrganizer.role}</td>
</tr>

</tbody>

</table>

<button
className="form-btn"
onClick={()=>setSelectedOrganizer(null)}
>
Close
</button>

</div>

</div>

)}

</DashboardLayout>

)

}

export default ManageOrganizers;