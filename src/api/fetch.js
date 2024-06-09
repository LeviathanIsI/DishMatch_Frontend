import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:5000/api";

const apiFetch = async (endpoint, options = {}) => {
  const token = localStorage.getItem("token");
  const response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: token ? `Bearer ${token}` : "",
      ...(options.headers || {}),
    },
  });

  if (!response.ok) {
    if (response.status === 401) {
      // Clear token and redirect to login page if unauthorized
      localStorage.removeItem("token");
      // Use a navigation function to redirect to the login page
      const navigate = useNavigate();
      navigate("/login");
      return;
    }
    throw new Error("Network response was not ok");
  }
  return response.json();
};

export default apiFetch;
