import React, { useState, useContext } from "react";
import { GoogleLogin } from "@react-oauth/google";
import apiFetch from "../api/fetch";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState(""); // 'success' or 'error'

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await apiFetch("/users/register", {
        method: "POST",
        body: JSON.stringify({ email, username, password }),
      });
      localStorage.setItem("token", response.token);
      login(response.token, response.username);
      setMessageType("success");
      setMessage("User registered successfully!");
      setEmail("");
      setUsername("");
      setPassword("");
      navigate("/myrecipes");
    } catch (error) {
      setMessageType("error");
      setMessage("Error registering user: " + error.message);
    }
  };

  const handleRegisterSuccess = async (response) => {
    try {
      const res = await apiFetch("/auth/google", {
        method: "POST",
        body: JSON.stringify({ token: response.credential }),
      });
      const { token, username } = res;
      login(token, username);
      navigate("/");
    } catch (error) {
      console.error("Google registration failed:", error);
    }
  };

  const handleRegisterFailure = (response) => {
    console.error("Google registration failed:", response);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl mb-4">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="input-field">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
            className="w-full p-2 border rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-yellow-500"
          />
        </div>
        <div className="input-field">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
            className="w-full p-2 border rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-yellow-500"
          />
        </div>
        <div className="input-field">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
            className="w-full p-2 border rounded bg-gray-800 text-gray-200 placeholder-gray-500 focus:border-yellow-500"
          />
        </div>
        <button
          type="submit"
          className="btn w-full py-2 rounded bg-yellow-500 text-gray-900 hover:bg-yellow-400"
        >
          Register
        </button>
      </form>
      {message && (
        <p
          className={
            messageType === "success" ? "green-text mt-4" : "red-text mt-4"
          }
        >
          {message}
        </p>
      )}
      <div className="mt-4">
        <GoogleLogin
          onSuccess={handleRegisterSuccess}
          onError={handleRegisterFailure}
        />
      </div>
    </div>
  );
};

export default Register;
