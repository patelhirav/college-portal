import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Form, Button, Container, Card } from "react-bootstrap";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Logging in with:", { email, password });
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
        <h3 className="text-center mb-3">Login</h3>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="email">
            <Form.Label>Email address</Form.Label>
            <Form.Control 
              type="email" 
              placeholder="Enter email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
              style={{ borderRadius: "10px" }}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="password">
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
            Login
          </Button>

          <div className="text-center">
            <span style={{ color: "#000" }}>Don't have an account? </span>
            <Link to="/signup" style={{ color: "#667eea", textDecoration: "none" }}>
              Sign Up
            </Link>
          </div>
        </Form>
      </Card>
    </Container>
  );
};

export default Login;