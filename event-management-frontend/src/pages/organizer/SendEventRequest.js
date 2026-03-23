import { useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/forms.css";

function SendEventRequest() {

const [form,setForm] = useState({
title:"",
department:"",
date:"",
location:"",
description:""
});

const [loading,setLoading] = useState(false);

const handleChange = (e)=>{
setForm({
...form,
[e.target.name]:e.target.value
});
};

const submitEvent = async ()=>{

if(!form.title || !form.department || !form.date || !form.location || !form.description){
alert("Please fill all fields");
return;
}

try{

setLoading(true);

await API.post("/organizer/event-request",form);

alert("Event request sent");

setForm({
title:"",
department:"",
date:"",
location:"",
description:""
});

}catch(error){

console.error(error);

const message =
error.response?.data?.message || "Failed to send event request";

alert(message);

}finally{

setLoading(false);

}

};

return (

<DashboardLayout>

<div className="form-container">

<h2>Create Event</h2>

<input
type="text"
placeholder="Event Title"
name="title"
value={form.title}
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
type="date"
name="date"
value={form.date}
onChange={handleChange}
/>

<input
type="text"
placeholder="Venue"
name="location"
value={form.location}
onChange={handleChange}
/>

<textarea
rows="4"
placeholder="Description"
name="description"
value={form.description}
onChange={handleChange}
></textarea>

<button
className="form-btn"
onClick={submitEvent}
disabled={loading}
>
{loading ? "Submitting..." : "Submit Event Request"}
</button>

</div>

</DashboardLayout>

);

}

export default SendEventRequest;