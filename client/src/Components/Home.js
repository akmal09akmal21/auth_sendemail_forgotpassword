import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  axios.defaults.withCredentials = true;
  const handleLogout = () => {
    axios
      .get("http://localhost:5000/auth/logout")
      .then((res) => {
        navigate("/");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div className="div">
      <h1>home</h1>
      <button>
        <Link to="/dashboard">dashboard</Link>
      </button>
      <button onClick={handleLogout}>LogOut</button>
    </div>
  );
};

export default Home;
