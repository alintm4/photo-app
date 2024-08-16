import React, { useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';

function Login() {
    const { setIsAuthenticated } = useOutletContext();
    const [user, setUser] = useState({ username: '', password: '' });
  
    const navigate = useNavigate();

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        
            const response = await fetch('http://localhost:5005/api/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',

                },
                body: JSON.stringify(user),
            });

            const data = await response.json();
            console.log(data)

            if (response.ok) {
                localStorage.setItem('token', data.token);
                setIsAuthenticated(true);
                navigate('/');
            } 
            else{
                console.log("login failed")
            }
       
    };

    return (
        <div className="container">
            <div className="row">
                <div className="col-md-6 offset-md-3 border rounded p-4 mt-2 shadow">
                    <h2 className="text-center m-4">Login</h2>

                    <form onSubmit={onSubmit}>
                        <div className="mb-3">
                            <label htmlFor="username" className="form-label">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Enter username"
                                name="username"
                                value={user.username}
                                onChange={onInputChange}
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="password" className="form-label">Password</label>
                            <input
                                type="password"
                                className="form-control"
                                placeholder="Enter password"
                                name="password"
                                value={user.password}
                                onChange={onInputChange}
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Login;
