
import { Alert, Snackbar } from '@mui/material';
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { actions } from '../../actions';

export const PasswordResetRequest = () => {
  const alerts = useSelector(state=>state.alerts)

  const dispatch = useDispatch();

    const [email, setEmail] = useState("");

    const sendPasswordResetRequest =(e)=>{
        e.preventDefault();

        fetch("http://localhost:3069/user/resetpassword", {
            method: "POST",
            body: JSON.stringify({
              email,
            }),
            headers: new Headers({
              "Content-Type": "application/json",
            }),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data)
              switch(data.status){
                case 'SUCCESS':
                  return dispatch(actions.infoAlertAction({
                    statusCode: 2,
                    message: data.success
                  }))
                case 'ERROR':
                  return dispatch(actions.alertAction(false, {
                    statusCode: 1,
                    message: data.error
                  }))
                default:
                  return
              }
            });
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
              return 'warning'
      }
  }

  return (
    <div className='splashpageAndAuth'>
      <div className='containerForSplashAndAuth'>
        <div className='titleForSplashAndAuth'>
          <h1>Request Password Reset</h1>          
        </div>
        <form onSubmit={sendPasswordResetRequest} className='authForm'>
            <label className='authLabels' ><p className='authLabelPs'>Email:</p><input type={'email'} onChange={e=>(setEmail(e.target.value))} className='authInputs'/></label>
            <button type='submit' className='authSignUpLoginButtons'>Request Reset</button>
        </form>
      </div>

      <Snackbar open={alerts.openAlert} autoHideDuration={6000} onClose={handleCloseAlert} >
            <Alert severity={handleAlertSeverity()} >{handleAlertMessage()}</Alert>
        </Snackbar>
    </div>

  )
}
