import { userLogout_fetchFromAPI } from "../fetch/fetchGamesFromAPI"
import { userLogout_user } from "../fetch/user"
import { userLogout_userCats } from "../fetch/userCategories"
import { userLogout_userGames } from "../fetch/userGames"

export const logout =()=>{
    return function(dispatch){
        dispatch(userLogout_user())
        dispatch(userLogout_userGames())
        dispatch(userLogout_userCats())
        dispatch(userLogout_fetchFromAPI())
    }
}