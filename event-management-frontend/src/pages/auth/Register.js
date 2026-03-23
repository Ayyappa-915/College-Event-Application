import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/api";
import "../../styles/auth.css";

function Register() {

const navigate = useNavigate();

const [form, setForm] = useState({
  name: "",
  rollNumber: "",
  department: "",
  email: "",
  password: ""
});

const [loading, setLoading] = useState(false);

const handleChange = (e) => {
  setForm({
    ...form,
    [e.target.name]: e.target.value
  });
};

const handleSubmit = async (e) => {
  e.preventDefault();

  if (!form.name || !form.rollNumber || !form.department || !form.email || !form.password) {
    alert("Please fill all fields");
    return;
  }

  if (form.password.length < 6) {
    alert("Password must be at least 6 characters");
    return;
  }

  try {

    setLoading(true);

    await API.post("/auth/register", form);

    alert("Registration successful");

    navigate("/login");

  } catch (error) {

    const message =
      error.response?.data?.message || "Registration failed";

    alert(message);

  } finally {
    setLoading(false);
  }
};

return (

<MainLayout>

<div className="auth-page">

<div className="auth-card">

<h2>Student Registration</h2>

<form onSubmit={handleSubmit} className="auth-form">

<div className="input-row">

<input
type="text"
name="name"
placeholder="Name"
value={form.name}
onChange={handleChange}
/>

<input
type="text"
name="rollNumber"
placeholder="Roll Number"
value={form.rollNumber}
onChange={handleChange}
/>

</div>

<div className="input-row">

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
name="email"
placeholder="Email"
value={form.email}
onChange={handleChange}
/>

</div>

<input
type="password"
name="password"
placeholder="Password"
value={form.password}
onChange={handleChange}
/>

<button
type="submit"
className="auth-btn"
disabled={loading}
>
{loading ? "Registering..." : "Register"}
</button>

</form>

<p className="auth-link">
Already have an account?
<Link to="/login"> Login</Link>
</p>

</div>

</div>

</MainLayout>

);

}

export default Register;