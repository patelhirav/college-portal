import { useAuth } from "../context/AuthContext";

const Dashboard = () => {
  const { user, handleLogout } = useAuth();

  return (
    <div>
      {user?.role === "superadmin" ? (
        <h1>Welcome Super Admin</h1>
      ) : user?.role === "admin" ? (
        <h1>Welcome Admin</h1>
      ) : (
        <h1>Welcome User</h1>
      )}
      <p>You are logged in as {user?.name}.</p>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Dashboard;
