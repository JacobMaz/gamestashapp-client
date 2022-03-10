import { Button } from '@mui/material';
import React from 'react'
import { useState } from "react";

const Register = () => {
    const [email, setEmail]=useState('');
    const [username, setUsername]=useState('');
    const [passwordOne, setPasswordOne]=useState('');
    const [passwordTwo, setPasswordTwo]=useState('')

    const handleSubmit=(e)=>{
        e.preventDefault();
        
        if(passwordOne===passwordTwo){
            fetch('http://localhost:3069/user/register', {
                method: 'POST',
                body: JSON.stringify({
                    email: email.toLocaleLowerCase(),
                    username: username.toLocaleLowerCase().replace(/ /g, "_"),
                    password: passwordOne,
                  }),
                  headers: new Headers({
                    "Content-Type": "application/json",
                  })
            })
            .then((res) => res.json())
            .then((data)=>{
                console.log(data)
            })
        } else {
            console.log(passwordOne, ' does not match ', passwordTwo)
        }
        // console.log('email: ', email)
        // console.log('username: ', username)
        // console.log('passwordOne: ', passwordOne)
        // console.log('passowrdTwo: ', passwordTwo)
    }

  return (
    <div>
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
            <label>
                Email:
                <input type='email' name='eamil' onChange={(e)=>setEmail(e.target.value)}/>
            </label>
            <label>
                Username:
                <input type='text' name='username' onChange={(e)=>setUsername(e.target.value)}/>
            </label>
            <label>
                Password:
                <input type='password' name='passwordOne' onChange={(e)=>setPasswordOne(e.target.value)}/>
            </label>
            <label>
                Confirm Password:
                <input type='password' name='passwordTwo' onChange={(e)=>setPasswordTwo(e.target.value)}/>
            </label>
            <Button type='submit'>Sign Up</Button>
        </form>
    </div>
  )
}

export default Register;