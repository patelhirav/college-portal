import axios from "axios";

const API_URL = "http://localhost:4000/api/auth"; // Change as per your API

export const login = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await axios.post(`${API_URL}/login`, credentials);
  localStorage.setItem("token", response.data.token);
  return response.data;
};

export const signup = async (userData: any) => {
  await axios.post(`${API_URL}/signup`, userData);
};

export const getUserDetails = async () => {
  const token = localStorage.getItem("token");
  if (!token) return null;

  const response = await axios.get(`${API_URL}/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;
};

export const logout = () => {
  localStorage.removeItem("token");
};
