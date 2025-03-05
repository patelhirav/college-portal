import { useEffect, useState } from "react";
import { fetchUser } from "../services/authService";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/auth?tab=login");
      return;
    }

    fetchUser(token)
      .then((data) => setUser(data))
      .catch(() => {
        localStorage.removeItem("token");
        navigate("/auth?tab=login");
      });
  }, [navigate]);

  return (
    <div className="container">
      <h2>Welcome {user?.name || "User"}</h2>
      <p>Email: {user?.email}</p>
      <button onClick={() => {
        localStorage.clear();
        navigate("/auth?tab=login");
      }}>
        Logout
      </button>
    </div>
  );
};

export default Dashboard;
