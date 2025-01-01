import React, { useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";

function Login() {
  const { setIsAuthenticated } = useOutletContext();
  const [user, setUser] = useState({ username: "", password: "" });

  const navigate = useNavigate();

  const onInputChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://simple-notes-app-np2c.onrender.com/api/users/login", {
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
      localStorage.setItem("refreshToken", data.refreshToken);
      setIsAuthenticated(true);
      navigate("/");
    } else {
      console.log("login failed");
    }
  };

  return (
    <div className="flex justify-center text-center font-sans">
      <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
        <h2 className="m-3 text-4xl md:text-5xl">Login Page</h2>

        <form onSubmit={onSubmit}>
          <div>
            <label className="pr-1 text-xl md:text-3xl">Username:</label>
            <input
              type="text"
              placeholder="Enter username"
              name="username"
              value={user.username}
              onChange={onInputChange}
              className="my-4 rounded-md p-3"
            />
          </div>
          <div>
            <label className="pr-1 text-xl md:text-3xl">Password:</label>
            <input
              type="password"
              placeholder="Enter password"
              name="password"
              value={user.password}
              onChange={onInputChange}
              className="my-4 rounded-md p-3"
            />
          </div>
          <button
            type="submit"
            className=" cursor-pointer bg-yellow-700 p-2 rounded-lg m-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
