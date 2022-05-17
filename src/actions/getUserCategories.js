
import axios from "axios";
import {userCategoriesRequest, userCategoriesSuccess, userCategoriesFailure} from '../fetch/userCategories';

export const getUserCategories =(appDB, token)=>{

    const userGameHeaders = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return function(dispatch){
        dispatch(userCategoriesRequest())
        axios.get(appDB, {
            headers: userGameHeaders
        })
            .then(res=>{
                const data  = res.data
                dispatch(userCategoriesSuccess(data))
            })
            .catch(error=>{
                dispatch(userCategoriesFailure(error))
            })
    }
}