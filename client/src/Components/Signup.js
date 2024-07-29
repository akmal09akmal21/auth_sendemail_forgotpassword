import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const Signup = () => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/auth/signup", {
        userName,
        email,
        password,
      })
      .then((res) => {
        console.log(res.data.message);
        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response.data.message);
      });
  };
  return (
    <div className="sign-up-container">
      <h1>signup</h1>
      <form className="sign_form" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          placeholder="username"
          onChange={(e) => setUserName(e.target.value)}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Signup</button>
        <p>login bilan kirish</p> <Link to="/login">Login</Link>
      </form>
    </div>
  );
};

export default Signup;
