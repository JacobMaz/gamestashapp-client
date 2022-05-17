import { Alert, Snackbar } from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../actions';

const AppAlert = () => {
    const alerts = useSelector(state=>state.alerts);

    const dispatch = useDispatch();

    const handleCloseAlert =()=>{
        dispatch(actions.clearAlertAction())
    }

    const handleAlertMessage =()=>{

        switch(alerts.status){
            case 'SUCCESS':
                return alerts.success.message
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
    <Snackbar open={alerts.openAlert} autoHideDuration={6000} onClose={handleCloseAlert} >
        <Alert severity={handleAlertSeverity()} >{handleAlertMessage()}</Alert>
    </Snackbar>
  )
}

export default AppAlert;