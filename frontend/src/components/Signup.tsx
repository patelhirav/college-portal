import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";

const Signup: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [year, setYear] = useState("");
  const [branch, setBranch] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Signing up with:", { name, email, password, year, branch });
    navigate("/dashboard");
  };

  return (
    <Container 
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ 
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "#fff"
      }}
    >
      <Card className="p-4 shadow" style={{ width: "600px", borderRadius: "15px" }}>
        <h3 className="text-center mb-3">Signup</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Enter name" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              required 
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Enrollment Number</Form.Label>
            <Form.Control 
              type="number" 
              placeholder="Enter Enrollment number" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control 
              type="password" 
              placeholder="Enter password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
              required 
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Year</Form.Label>
            <Form.Select 
              value={year} 
              onChange={(e) => setYear(e.target.value)} 
              required 
              style={{ borderRadius: "10px" }}
            >
              <option value="">Select Year</option>
              <option value="1st">1st Year</option>
              <option value="2nd">2nd Year</option>
              <option value="3rd">3rd Year</option>
              <option value="4th">4th Year</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Branch</Form.Label>
            <Form.Select 
              value={branch} 
              onChange={(e) => setBranch(e.target.value)} 
              required 
              style={{ borderRadius: "10px" }}
            >
              <option value="">Select Branch</option>
              <option value="Computer">Computer</option>
              <option value="Mechanical">Mechanical</option>
              <option value="Civil">Civil</option>
              <option value="Chemical">Chemical</option>
              <option value="Electrical">Electrical</option>
            </Form.Select>
          </Form.Group>

          <Button 
            variant="primary" 
            type="submit" 
            className="w-100 mb-3"
            style={{ 
              borderRadius: "10px", 
              background: "#667eea", 
              border: "none",
              transition: "background 0.3s"
            }}
            onMouseOver={(e) => (e.currentTarget.style.background = "#764ba2")}
            onMouseOut={(e) => (e.currentTarget.style.background = "#667eea")}
          >
            Signup
          </Button>

          <div className="text-center">
            <span style={{ color: "#000" }}>Already have an account? </span>
            <Link to="/" style={{ color: "#667eea", textDecoration: "none" }}>
              Login
            </Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Signup;