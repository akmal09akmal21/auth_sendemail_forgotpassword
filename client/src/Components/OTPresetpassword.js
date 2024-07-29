import { useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";

const OTPresetpassword = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const { token } = useParams();
  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/verifyotp/", {
        otp,
        email,
      })
      .then((res) => {
        console.log(res.data.message);

        navigate("/login");
      })
      .catch((err) => {
        console.log(err.response);
      });
  };
  return (
    <div className="d">
      <div className="sign-up-container">
        <h1>new password</h1>
        <form className="sign_form" onSubmit={handleSubmit}>
          <label htmlFor="password">Password:</label>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <label htmlFor="password">Password:</label>
          <input
            type="text"
            placeholder="otb code"
            onChange={(e) => setOtp(e.target.value)}
          />
          <button type="submit">Send</button>
          <p>login bilan kirish</p> <Link to="/login">Login</Link>
        </form>
      </div>
    </div>
  );
};

export default OTPresetpassword;
