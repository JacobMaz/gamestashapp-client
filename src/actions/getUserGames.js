
import axios from "axios";
import { userGamesFailure, userGamesRequest, userGamesSuccess } from "../fetch/userGames";

export const getUserGames=(appDB, token)=>{

    const userGameHeaders = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return function(dispatch){
        dispatch(userGamesRequest())
        axios.get(appDB, {
            headers: userGameHeaders
        })
            .then(res=>{
                const data  = res.data
                dispatch(userGamesSuccess(data))
            })
            .catch(error=>{
                dispatch(userGamesFailure(error))
            })
    }
}