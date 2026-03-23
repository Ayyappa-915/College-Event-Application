import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/forms.css";

function CreateOrganizer() {

const [form, setForm] = useState({
name: "",
rollNumber: "",
department: "",
email: "",
password: ""
});

const handleChange = (e) => {
setForm({
...form,
[e.target.name]: e.target.value
});
};

const handleSubmit = async () => {
try {

await API.post("/admin/create-organizer", form);

alert("Organizer created successfully");

setForm({
name: "",
rollNumber: "",
department: "",
email: "",
password: ""
});

} catch (error) {
console.error(error);
alert("Failed to create organizer");
}
};

return (

<DashboardLayout>

<div className="form-container">

<h2>Create Organizer</h2>

<input
type="text"
placeholder="Name"
name="name"
value={form.name}
onChange={handleChange}
/>

<input
type="text"
placeholder="Roll Number"
name="rollNumber"
value={form.rollNumber}
onChange={handleChange}
/>

<select
name="department"
value={form.department}
onChange={handleChange}
>

<option value="" disabled>
Select Department
</option>

<option value="CSE">CSE</option>
<option value="ECE">ECE</option>
<option value="EEE">EEE</option>
<option value="MECH">MECH</option>
<option value="CIVIL">CIVIL</option>
<option value="IT">IT</option>

</select>

<input
type="email"
placeholder="Email"
name="email"
value={form.email}
onChange={handleChange}
/>

<input
type="password"
placeholder="Password"
name="password"
value={form.password}
onChange={handleChange}
/>

<button className="form-btn" onClick={handleSubmit}>
Create Organizer
</button>

</div>

</DashboardLayout>

);

}

export default CreateOrganizer;