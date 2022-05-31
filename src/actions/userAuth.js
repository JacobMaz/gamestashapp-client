
import axios from 'axios';
import { error_alert, success_alert } from '../fetch/alerts';
import { userRegisterFailure, userRegisterRequest, userRegisterSuccess } from "../fetch/user";
import emailjs from '@emailjs/browser';

const userRegisterHeaders = {
    'Content-Type': 'application/json'
}



export const userAuth =(api, user)=>{

    const sendEmailPlease=(emailInfo)=>{
        emailjs.send(process.env.REACT_APP_SERVICE_ID, process.env.REACT_APP_TEMPLATE_ID, emailInfo, '6evbxZ3vAU173qIAa');
    }

    return function(dispatch){
        dispatch(userRegisterRequest())
        axios.post(api, user, {
            headers: userRegisterHeaders
        })
            .then(res=>{
                const data = res.data
                dispatch(userRegisterSuccess(data))
                if(data.status==='SUCCESS'){
                    sendEmailPlease({to_email: data.user.email, to_name: data.user.username, my_html: '<h1>READY PLAYER ONE!</h1>'});
                }
            })
            .catch(err=>{
                if(err.response.status===409){
                    dispatch(error_alert({
                        statusCode: 409,
                        message: 'User Information Already In Use'
                    }));
                    // alert('User Information Already In Use')
                } else if(err.response.status===401){
                    dispatch(error_alert({
                        statusCode: 401,
                        message: 'User Information Incorrect'
                    }));
                    // alert('User Information Incorrect')
                }
                dispatch(userRegisterFailure(err))
            })
    }
}