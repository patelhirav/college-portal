import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { signup } from "../services/authService"; // Assuming you have a signup service

const Signup = () => {
  const { setUser } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    branch: "",
    year: "",
    password: "",
    enrollmentNumber: "",
    semester: "",
  });
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const userData = await signup(formData);
      setUser(userData);
      navigate("/dashboard"); // Redirect to dashboard after successful signup
    } catch (err) {
      setError("Signup failed. Please try again.");
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6 col-lg-4">
          <div className="card shadow-lg border-0" style={{ borderRadius: "15px", animation: "fadeIn 0.5s ease-in-out" }}>
            <div className="card-body p-4">
              <h2 className="card-title text-center mb-4" style={{ color: "#2c3e50", fontWeight: "bold" }}>Sign Up</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <form onSubmit={handleSignup}>
                <div className="mb-3">
                  <label htmlFor="name" className="form-label" style={{ color: "#34495e" }}>Name</label>
                  <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    placeholder="Enter your name"
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "10px" }}
                  />
                </div>

                {/* Email Field */}
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

                {/* Branch Field */}
                <div className="mb-3">
                  <label htmlFor="branch" className="form-label" style={{ color: "#34495e" }}>Select Branch</label>
                  <select
                    className="form-control"
                    id="branch"
                    name="branch"
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "10px" }}
                  >
                    <option value="">Select Branch</option>
                    <option value="Computer Science">Computer Engineering</option>
                    <option value="Electrical Engineering">Electrical Engineering</option>
                    <option value="Mechanical Engineering">Mechanical Engineering</option>
                    <option value="Civil Engineering">Civil Engineering</option>
                    <option value="Chemical Engineering">Chemical Engineering</option>
                  </select>
                </div>

                {/* Year Field */}
                <div className="mb-3">
                  <label htmlFor="year" className="form-label" style={{ color: "#34495e" }}>Select Year</label>
                  <select
                    className="form-control"
                    id="year"
                    name="year"
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "10px" }}
                  >
                    <option value="">Select Year</option>
                    <option value="1">1st Year</option>
                    <option value="2">2nd Year</option>
                    <option value="3">3rd Year</option>
                    <option value="4">4th Year</option>
                  </select>
                </div>

                {/* Password Field */}
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

                {/* Enrollment Number Field */}
                <div className="mb-3">
                  <label htmlFor="enrollmentNumber" className="form-label" style={{ color: "#34495e" }}>Enrollment Number</label>
                  <input
                    type="text"
                    className="form-control"
                    id="enrollmentNumber"
                    name="enrollmentNumber"
                    placeholder="Enter your enrollment number"
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "10px" }}
                  />
                </div>

                {/* Semester Field */}
                <div className="mb-3">
                  <label htmlFor="semester" className="form-label" style={{ color: "#34495e" }}>Select Semester</label>
                  <select
                    className="form-control"
                    id="semester"
                    name="semester"
                    onChange={handleChange}
                    required
                    style={{ borderRadius: "10px" }}
                  >
                    <option value="">Select Semester</option>
                    <option value="1">1st Semester</option>
                    <option value="2">2nd Semester</option>
                    <option value="3">3rd Semester</option>
                    <option value="4">4th Semester</option>
                    <option value="5">5th Semester</option>
                    <option value="6">6th Semester</option>
                    <option value="7">7th Semester</option>
                    <option value="8">8th Semester</option>
                  </select>
                </div>

                {/* Signup Button */}
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
                  Sign Up
                </button>
              </form>
              <div className="text-center mt-3">
                <p style={{ color: "#7f8c8d" }}>
                  Already have an account?{" "}
                  <Link to="/login" style={{ color: "#3498db", textDecoration: "none", fontWeight: "bold" }}>
                    Login
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Add custom CSS for animations */}
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

export default Signup;