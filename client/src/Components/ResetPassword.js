import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const ResetPassword = () => {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("parolni togri yoz");
    } else {
      axios
        .post("http://localhost:5000/auth/resetpassword/" + token, {
          password,
        })
        .then((res) => {
          console.log(res.data);

          navigate("/login");
        })
        .catch((err) => {
          console.log(err.response);
        });
    }
  };
  return (
    <div className="d">
      <div className="sign-up-container">
        <h1>new password</h1>
        <form className="sign_form" onSubmit={handleSubmit}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            placeholder="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit">Send</button>
          <p>login bilan kirish</p> <Link to="/login">Login</Link>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
