
import React from 'react';
import { useState } from "react";
import {useDispatch, useSelector} from 'react-redux';
import { Navigate } from 'react-router-dom';
import { actions } from '../../actions';
import { Snackbar, Alert } from '@mui/material';

const Register = (props) => {
    const alerts = useSelector(state=>state.alerts)

    const dispatch = useDispatch();

    const [email, setEmail]=useState('');
    const [username, setUsername]=useState('');
    const [passwordOne, setPasswordOne]=useState('');
    const [passwordTwo, setPasswordTwo]=useState('');

    const passwordRequirement = (pass) => {
        if (
          pass.match(/[a-z]/g) &&
          pass.match(/[A-Z]/g) &&
          pass.match(/[0-9]/g) &&
          pass.match(/[^a-zA-z\d]/g) &&
          pass.length >= 8
        ) {
            return true
        } else {
            // alert('Must Meet Password Requirements')
            dispatch(actions.alertAction(false, {
                statusCode: 1,
                message: 'Must Meet Password Requirements'
            }))
            return false
        }
      };
    
    const handleSubmit=(e)=>{
        e.preventDefault();

        if(email!==''&&username!==''&&passwordOne!==''){

            if(passwordRequirement(passwordOne)){

                if(passwordOne===passwordTwo){
                    
                    dispatch(actions.userAuth('http://localhost:3069/user/register', JSON.stringify({
                                email: email.toLocaleLowerCase(),
                                username: username.toLocaleLowerCase().replace(/ /g, "_"),
                                password: passwordOne,
                            })))

                } else {
                    // alert('Passwords Do Not Match')
                    dispatch(actions.alertAction(false, {
                        statusCode: 1,
                        message: 'Passwords Do Not Match'
                    }))
                }     
            }

        } else  {
            // alert('Fill In All Fields')
            dispatch(actions.alertAction(false, {
                statusCode: 1,
                message: 'Fill In All Fields'
            }))
        }
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
            case 'INFO':
                return alerts.info.message
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
            case 'INFO':
                return 'info'
            default:
                return ''
        }
    }

  return (
    <div className='splashpageAndAuth'>
        <div className='containerForSplashAndAuth'>
            <div className='titleForSplashAndAuth'>
                <h2>Sign Up</h2>       
            </div>
            <form onSubmit={(e)=>handleSubmit(e)} className='authForm'>
                <label className='authLabels' >
                    <p className='authLabelPs' >Email:</p>
                    <input type='email' name='eamil' onChange={(e)=>setEmail(e.target.value)} className='authInputs' />
                </label>
                <label className='authLabels' >
                    <p className='authLabelPs' >Username:</p>
                    <input type='text' name='username' onChange={(e)=>setUsername(e.target.value)} className='authInputs' />
                </label>
                <label className='authLabels' >
                    <p className='authLabelPs' >Password:</p>
                    <input type='password' name='passwordOne' onChange={(e)=>setPasswordOne(e.target.value)} className='authInputs' />
                </label>
                <label className='authLabels' >
                    <p className='authLabelPs' >Confirm Password:</p>
                    <input type='password' name='passwordTwo' onChange={(e)=>setPasswordTwo(e.target.value)} className='authInputs' />
                </label>
                <p className='passwordRequirements'>
                    *Password Requirements:<br/>
                    *min 1 lowercare a-z<br/>
                    *min 1 uppercase A-Z<br/>
                    *min 1 number 0-9<br/>
                    *min 1 special character
                </p>
                <button type='submit' className='authSignUpLoginButtons'>Sign Up</button>
            </form>            
        </div>

        <Snackbar open={alerts.openAlert} autoHideDuration={6000} onClose={handleCloseAlert} >
            <Alert severity={handleAlertSeverity()} >{handleAlertMessage()}</Alert>
        </Snackbar>
    </div>
  )
}

export default Register;