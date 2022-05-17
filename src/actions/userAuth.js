import axios from 'axios'
import { error_alert, success_alert } from '../fetch/alerts'
import { userRegisterFailure, userRegisterRequest, userRegisterSuccess } from "../fetch/user"

const userRegisterHeaders = {
    'Content-Type': 'application/json'
}

export const userAuth =(api, user)=>{
    return function(dispatch){
        dispatch(userRegisterRequest())
        axios.post(api, user, {
            headers: userRegisterHeaders
        })
            .then(res=>{
                const data = res.data
                dispatch(userRegisterSuccess(data))
            })
            .catch(err=>{
                // console.log('WHY???', err)
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