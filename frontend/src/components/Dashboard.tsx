import React from "react";
import { useLocation } from "react-router-dom";
import { Container, Card } from "react-bootstrap";

const Dashboard = () => {
  const location = useLocation();
  const user = location.state?.user || { role: "User", name: "Guest" };

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center">Welcome, {user.name}</h2>
        <h4 className="text-center text-primary">
          {user.role === "SUPERADMIN"
            ? "Super Admin Dashboard"
            : user.role === "SUBADMIN"
            ? "Sub-Admin Dashboard"
            : "User Dashboard"}
        </h4>
      </Card>
    </Container>
  );
};

export default Dashboard;
