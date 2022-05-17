
import axios from "axios";
import { userGamesFailure, userGamesRequest, userGamesSuccess } from "../fetch/userGames";
import { error_alert, success_alert } from '../fetch/alerts'

export const postUserGame=(api, game, token)=>{

    const userGameHeaders = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return function(dispatch){
        dispatch(userGamesRequest())
        axios.post(api, game, {
            headers: userGameHeaders
        })
            .then(res=>{
                const data=res.data
                // console.log('DATA:', data.message)
                dispatch(userGamesSuccess(data))
                dispatch(success_alert(data.message))
            })
            .catch(err=>{
                dispatch(userGamesFailure(err))
                dispatch(error_alert('An Error Happened. Game Not Added'))
            })
    }
}