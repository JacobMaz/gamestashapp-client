
import axios from "axios";
import { userGamesRequest, userGamesSuccess } from "../fetch/userGames";
import { getUserCategories } from "./getUserCategories";

export const deleteGameFromMyGames =(api, token)=>{

    const userHeaders = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return function(dispatch){
        dispatch(userGamesRequest())
        axios.delete(api, {
            headers: userHeaders
        })
            .then(res=>{
                const data=res.data
                dispatch(userGamesSuccess(data))
            })
                .then(res=>dispatch(getUserCategories(`http://localhost:3069/category/usercategories`, token)))
            .catch(err=>{console.log(err)})
    }
}