import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import MainLayout from "../../layouts/MainLayout";
import API from "../../api/api";
import "../../styles/auth.css";

function Login() {

const { login } = useContext(AuthContext);

const [form, setForm] = useState({
  rollNumber: "",
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

  if (!form.rollNumber || !form.password) {
    alert("Please fill all fields");
    return;
  }

  try {

    setLoading(true);

    const res = await API.post("/auth/login", form);

    login(res.data);

  } catch (error) {

    const message =
      error.response?.data?.message || "Login failed";

    alert(message);

  } finally {
    setLoading(false);
  }
};

return (

<MainLayout>

<div className="auth-page">

<div className="auth-card">

<h2>Login</h2>

<form onSubmit={handleSubmit} className="auth-form">

<input
type="text"
name="rollNumber"
placeholder="Roll Number"
value={form.rollNumber}
onChange={handleChange}
/>

<input
type="password"
name="password"
placeholder="Password"
value={form.password}
onChange={handleChange}
/>

<button type="submit" className="auth-btn" disabled={loading}>
{loading ? "Logging in..." : "Login"}
</button>

</form>

<p className="auth-link">
Don't have an account?
<Link to="/register"> Register</Link>
</p>

</div>

</div>

</MainLayout>

);

}

export default Login;