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
    <div className="flex justify-center text-center font-sans">
      <div className="border rounded p-4 mt-2 shadow">
        <h2 className="m-3 text-4xl md:text-5xl">Sign Up Page </h2>
        <form onSubmit={onSubmit}>
          <div>
            <label>Username:</label>
            <input
              type="text"
              placeholder="Enter your username"
              name="username"
              value={user.username}
              onChange={onInputChange}
              className="my-4 rounded-md p-3"
            />
          </div>
          <div>
            <label className="pr-1 text-xl md:text-3xl ">Password: </label>
            <input
              type="password"
              name="password"
              placeholder="Enter your password"
              value={user.password}
              onChange={onInputChange}
              className="my-4 rounded-md p-3"
            />
          </div>
          <button
            type="submit"
            className=" cursor-pointer bg-yellow-700 p-2 rounded-lg m-4"
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
