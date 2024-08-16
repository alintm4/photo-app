import React, { useState } from 'react'
import { useNavigate, useOutletContext } from 'react-router-dom'

function Register() {
    
    const { setIsAuthenticated } = useOutletContext();
    const [user,setUser]=useState({ username: '', password: '' })
    const navigate=useNavigate()

const onInputChange=(e)=>{
    setUser({...user,[e.target.name]:e.target.value})
}

const onSubmit=async (e)=>{
    e.preventDefault()
    const response = await fetch('http://localhost:5005/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    })
    const data=await response.json()
    console.log(data)
    if(response.ok){
        localStorage.setItem('token',data.token)
        setIsAuthenticated(true)
        navigate('/')
    }
}

    const token=localStorage.getItem('token')

    return (
        <div>
<div>
    <div>
        <h2>Register</h2>
        <form onSubmit={onSubmit}>
            <div>
                <label>Username:</label>
                <input type="text" placeholder='Enter your username' name='username' value={user.username} onChange={onInputChange} />
            </div>
            <div>
                <label>Password:</label>
                <input type="password" name="password" placeholder='Enter your password' value={user.password} onChange={onInputChange}/>
            </div>
            <button type='submit'>Register</button>
        </form>
    </div>
</div>

        </div>
    )
}

export default Register;
