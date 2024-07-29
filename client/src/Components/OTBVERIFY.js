import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const OTBVERIFY = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  //   const [otp, setOtp] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:5000/reqotp", {
        email,
      })
      .then((res) => {
        console.log(res);
        alert(res.data.message);
        navigate("/resetotp");
      })
      .catch((err) => {
        console.log(err.response.message);
      });
  };
  return (
    <div className="d">
      <div className="sign-up-container">
        <h1>forgot password</h1>
        <form className="sign_form" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit">requestOTB</button>
          <p>login bilan kirish</p> <Link to="/login">Login</Link>
        </form>
      </div>
    </div>
  );
};

export default OTBVERIFY;
