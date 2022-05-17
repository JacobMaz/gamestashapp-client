
import axios from 'axios'
import { userCategoriesRequest, userCategoriesSuccess } from '../fetch/userCategories'
import { getUserCategories } from './getUserCategories'


export const putCategoryUser = (api, category, token) => {

    const userHeaders = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return function(dispatch){
        dispatch(userCategoriesRequest())
        axios.put(api, category, {
            headers: userHeaders
        })
            .then(res=>{
                const data=res.data
                dispatch(userCategoriesSuccess(data))
            })
                .then(res=>{dispatch(getUserCategories(`http://localhost:3069/category/usercategories`, token))})
            .catch(err=>{
                console.log(err)
            })
    }
}