import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function Register() {
  const { setIsAuthenticated } = useOutletContext();
  const [user, setUser] = useState({ username: "", password: "" });
  const navigate = useNavigate();

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("https://simple-notes-app-np2c.onrender.com/api/users/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
      navigate("/");
    }
  };

  const token = localStorage.getItem("token");

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-r from-gray-900 via-gray-800 to-gray-600">
      <div className="border rounded-lg p-8 mt-2 shadow-xl bg-white bg-opacity-10 backdrop-blur-lg max-w-sm w-full">
        <h2 className="m-3 text-4xl text-white font-bold">Sign Up Page</h2>
        <form onSubmit={onSubmit}>
          <div>
            <label className="text-white text-xl">Username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={user.username}
              onChange={onInputChange}
              className="my-4 rounded-md p-3 w-full bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <div>
            <label className="text-white text-xl">Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={onInputChange}
              className="my-4 rounded-md p-3 w-full bg-gray-700 text-white border-none focus:outline-none focus:ring-2 focus:ring-gray-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-gray-500 hover:bg-gray-600 p-2 rounded-lg text-white mt-4 transition"
          >
            Sign Up
          </button>
        </form>
        <div className="text-center mt-4">
          <p className="text-white text-sm">Already have an account? <a href="/login" className="text-gray-400 hover:text-gray-200">Login here</a></p>
        </div>
      </div>
    </div>
  );
}

export default Register;
