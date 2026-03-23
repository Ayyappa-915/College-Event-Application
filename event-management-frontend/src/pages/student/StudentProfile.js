import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";
import API from "../../api/api";
import "../../styles/forms.css";

function StudentProfile(){

const [profile,setProfile] = useState({
name:"",
email:"",
rollNumber:"",
department:""
});

const [loading,setLoading] = useState(true);
const [saving,setSaving] = useState(false);

useEffect(()=>{
fetchProfile();
},[]);

const fetchProfile = async ()=>{

try{

const res = await API.get("/auth/profile");

setProfile(res.data);

}catch(error){

console.error(error);
alert("Failed to load profile");

}finally{

setLoading(false);

}

};

const updateProfile = async ()=>{

try{

setSaving(true);

await API.put("/auth/profile",{
name:profile.name,
email:profile.email
});

alert("Profile updated successfully");

}catch(error){

console.error(error);
alert("Failed to update profile");

}finally{

setSaving(false);

}

};

if(loading){

return(

<DashboardLayout>
<p style={{padding:"20px"}}>Loading profile...</p>
</DashboardLayout>

)

}

return(

<DashboardLayout>

<div className="form-container">

<h2>My Profile</h2>

<div className="form-group">
<label>Roll Number</label>
<input
type="text"
value={profile.rollNumber}
disabled
/>
</div>

<div className="form-group">
<label>Department</label>
<input
type="text"
value={profile.department}
disabled
/>
</div>

<div className="form-group">
<label>Name</label>
<input
type="text"
value={profile.name}
onChange={(e)=>setProfile({...profile,name:e.target.value})}
/>
</div>

<div className="form-group">
<label>Email</label>
<input
type="email"
value={profile.email}
onChange={(e)=>setProfile({...profile,email:e.target.value})}
/>
</div>

<button
className="form-btn"
onClick={updateProfile}
disabled={saving}
>
{saving ? "Updating..." : "Update Profile"}
</button>

</div>

</DashboardLayout>

)

}

export default StudentProfile;