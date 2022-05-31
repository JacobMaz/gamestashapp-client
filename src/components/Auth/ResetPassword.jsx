
import React from "react";
import { useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { actions } from "../../actions";
import { Snackbar, Alert } from '@mui/material';
import APIURL from "../../helpers/environment";

export const ResetPassword = () => {
  const alerts = useSelector((state) => state.alerts);
  const appNavigation = useSelector(state=>state.appNavigation)

  const dispatch = useDispatch();

  const [passwordOne, setPasswordOne] = useState("");
  const [passwordTwo, setPasswordTwo] = useState("");
  const { token } = useParams();

  const passwordRequirement = (pass) => {
    if (
      pass.match(/[a-z]/g) &&
      pass.match(/[A-Z]/g) &&
      pass.match(/[0-9]/g) &&
      pass.match(/[^a-zA-z\d]/g) &&
      pass.length >= 8
    ) {
      return true;
    } else {
      console.log('NO')
      // alert('Must Meet Password Requirements')
      dispatch(
        actions.alertAction(false, {
          statusCode: 1,
          message: "Must Meet Password Requirements",
        })
      );
      return false;
    }
  };

  const sendPasswordResetRequest = (e) => {
    e.preventDefault();

    if(passwordRequirement(passwordOne)){
      if(passwordOne===passwordTwo){
        fetch(`${APIURL}/user/newpassword`, {
          method: 'POST',
          body: JSON.stringify({
            newPassword: passwordOne,
            sentToken: token
          }),
          headers: new Headers({
            'Content-Type':'Application/json'
          })
        })
          .then(res=>res.json())
          .then(data=>{
            switch(data.status){
              case 'SUCCESS':
                return (
                  dispatch(actions.appNavigationAction('/login'))
                  //   dispatch(actions.infoAlertAction({
                  //   statusCode: 2,
                  //   message: data.success
                  // }))
                )
              case 'ERROR':
                console.log(data)
                return dispatch(actions.alertAction(false, {
                  statusCode: 1,
                  message: data.error
                }))
              default:
                return
            }
          })
      } else {
        // console.log('pass no')
        dispatch(actions.alertAction(false, {
          statusCode: 1,
          message: 'Passwords Do Not Match'
        }))
      }
    }
  };

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
              return 'warning'
      }
  }

  if(appNavigation.navigationStatus){
    return (
      <Navigate to={appNavigation.navigateTo} />
    )
  }

  return (
    <div className="splashpageAndAuth" id="hi">
      <div className="containerForSplashAndAuth">
        <div className="titleForSplashAndAuth">
          <h1>Reset Password</h1>
        </div>
        <form onSubmit={sendPasswordResetRequest} className="authForm">
          <label className="authLabels">
            <p className="authLabelPs">Password:</p>
            <input
              required
              type="password"
              onChange={(e) => setPasswordOne(e.target.value)}
              className="authInputs"
            />
          </label>
          <label className="authLabels">
            <p className="authLabelPs">Confirm Password:</p>
            <input
              required
              type="password"
              onChange={(e) => setPasswordTwo(e.target.value)}
              className="authInputs"
            />
          </label>
          <p className='passwordRequirements'>
            *Password Requirements:<br/>
            *min 1 lowercare a-z<br/>
            *min 1 uppercase A-Z<br/>
            *min 1 number 0-9<br/>
            *min 1 special character
          </p>
          <button type="submit" className="authSignUpLoginButtons">
            Submit
          </button>
        </form>
      </div>

      <Snackbar open={alerts.openAlert} autoHideDuration={6000} onClose={handleCloseAlert} >
        <Alert severity={handleAlertSeverity()} >{handleAlertMessage()}</Alert>
      </Snackbar>      
    </div>
  );
};
