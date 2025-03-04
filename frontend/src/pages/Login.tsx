import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { login } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import 'bootstrap/dist/css/bootstrap.min.css'; 

const Login = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await login(credentials);
      setUser(userData);
      navigate("/dashboard");
    } catch {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0" style={{ borderRadius: "15px", animation: "fadeIn 0.5s ease-in-out" }}>
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4" style={{ color: "#2c3e50", fontWeight: "bold" }}>Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleLogin}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label" style={{ color: "#34495e" }}>Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    placeholder="Enter your email"
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label" style={{ color: "#34495e" }}>Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    name="password"
                    placeholder="Enter your password"
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "10px" }}
                  />
                </div>
                <button
                  type="submit"
                  className="btn w-100 mb-3"
                  style={{
                    backgroundColor: "#3498db",
                    color: "#fff",
                    borderRadius: "10px",
                    padding: "10px",
                    transition: "background-color 0.3s ease",
                  }}
                  onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#2980b9")}
                  onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "#3498db")}
                >
                  Login
                </button>
              </form>
              <div className="text-center mt-3">
                <p style={{ color: "#7f8c8d" }}>
                  Don't have an account?{" "}
                  <Link to="/signup" style={{ color: "#3498db", textDecoration: "none", fontWeight: "bold" }}>
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>
        {`
          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </div>
  );
};

export default Login;