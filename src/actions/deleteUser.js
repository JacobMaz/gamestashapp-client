
import axios from 'axios'
import { userLogout_fetchFromAPI } from '../fetch/fetchGamesFromAPI'
import { userLogout_user, userRegisterRequest, userRegisterSuccess } from '../fetch/user'
import { userLogout_userCats } from '../fetch/userCategories'
import { userLogout_userGames } from '../fetch/userGames'


export const deleteUser =(api, token)=>{

    const userHeaders = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return function(dispatch){
        dispatch(userRegisterRequest())
        axios.delete(api, {
            headers: userHeaders
        })
            .then(res=>{
                const data=res.data
                dispatch(userLogout_user())
                dispatch(userLogout_userGames())
                dispatch(userLogout_userCats())
                dispatch(userLogout_fetchFromAPI())
            })
                .catch(err=>console.log(err))
    }
}