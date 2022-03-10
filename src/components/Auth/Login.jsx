import { Button } from '@mui/material';
import React from 'react'
import { useState } from "react";

const Login = (props) => {
    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');

    const handleSubmit=(e)=>{
        e.preventDefault();

        fetch('http://localhost:3069/user/login', {
            method: "POST",
            body: JSON.stringify({
            username: username.toLocaleLowerCase().replace(/ /g,'_'),
            password: password,
        }),
            headers: new Headers({
            "Content-Type": "application/json",
        })
    })
        .then((res)=>res.json())
        .then((data)=>{
            props.setToken(data.sessionToken)
        })
    }

  return (
    <div>
        <h2>Log In</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Username:
                <input type='text' name='username' onChange={(e)=>setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type='password' name='password' onChange={(e)=>setPassword(e.target.value)}/>
            </label>
            <Button type='submit'>Login</Button>
        </form>
    </div>
  )
}

export default Login;