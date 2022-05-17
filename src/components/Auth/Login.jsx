
import React from 'react'
import { useState } from "react";
import { actions } from '../../actions';
import {useDispatch, useSelector} from 'react-redux';
import { Link } from "react-router-dom";
import { Navigate } from 'react-router-dom';
import { Alert, Snackbar } from '@mui/material';

const Login = (props) => {
    const alerts = useSelector(state=>state.alerts)
    const appNavigation = useSelector(state=>state.appNavigation)

    const dispatch = useDispatch();

    const [username, setUsername]=useState('');
    const [password, setPassword]=useState('');

    if(appNavigation.navigationStatus){
        dispatch(actions.clearAppNavigation())
    }

    const handleSubmit=(e)=>{
        e.preventDefault();

        dispatch(actions.userAuth('http://localhost:3069/user/login', JSON.stringify({
            username: username.toLocaleLowerCase().replace(/ /g, "_"),
            password: password,
          })))
    }

    if(props.isLoggedIn){
        return <Navigate to={'/usergames'} />
    }

    const handleCloseAlert =()=>{
        dispatch(actions.clearAlertAction())
    }

    const handleAlertMessage =()=>{

        switch(alerts.status){
            case 'SUCCESS':
                return 'Great Success'
            case 'ERROR':
                return alerts.error.message
            default:
                return ''
        }
    }

    const handleAlertSeverity =()=>{

        switch(alerts.status){
            case 'SUCCESS':
                return 'success'
            case 'ERROR':
                return 'error'
            default:
                return 'warning'
        }
    }

  return (
      <div className='splashpageAndAuth'>
        <div className='containerForSplashAndAuth'>
            <div className='titleForSplashAndAuth'>
                <h2>Log In</h2>                
            </div>

            <form onSubmit={handleSubmit} className='authForm'>
                <label className='authLabels'>
                    <p className='authLabelPs'>Username:</p>
                    <input type='text' name='username' onChange={(e)=>setUsername(e.target.value)} className='authInputs'/>
                </label>
                <label className='authLabels'>
                    <p className='authLabelPs'>Password:</p>
                    <input type='password' name='password' onChange={(e)=>setPassword(e.target.value)} className='authInputs'/>
                </label>
                <button type='submit' className='authSignUpLoginButtons'>Login</button>
            </form>
            <div>
                <Link to='/passwordresetrequest' className='forgotPasswordLink'>Forgot Password?</Link> 
            </div>
        </div>

        <Snackbar open={alerts.openAlert} autoHideDuration={6000} onClose={handleCloseAlert} >
            <Alert severity={handleAlertSeverity()} >{handleAlertMessage()}</Alert>
        </Snackbar>
      </div>
    
  )
}

export default Login;