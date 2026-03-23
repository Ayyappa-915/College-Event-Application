import { useNavigate } from "react-router-dom";
import API from "../../api/api";
import "../../styles/modal.css";

function EventDetails({ event, onClose }) {

const navigate = useNavigate();

const participate = async ()=>{

const user = JSON.parse(localStorage.getItem("user"));

if(!user){

alert("Login to participate in this event");
navigate("/login");
return;

}

try{

const res = await API.post("/student/participate",{
event:event._id
});

alert(res.data.message);

}catch(error){

const message =
error.response?.data?.message || "Participation failed";

alert(message);

}

};

return(

<div className="modal-overlay">

<div className="modal">

<h2>{event.title}</h2>

<p>
<strong>Date:</strong>{" "}
{new Date(event.date).toLocaleDateString()}
</p>

<p>
<strong>Location:</strong> {event.location}
</p>

<p>
<strong>Department:</strong> {event.department}
</p>

<p>
<strong>Description:</strong>
</p>

<p>{event.description}</p>

<div className="modal-actions">

<button
className="modal-close-btn"
onClick={onClose}
>
Close
</button>

<button
className="modal-participate-btn"
onClick={participate}
>
Participate
</button>

</div>

</div>

</div>

);

}

export default EventDetails;