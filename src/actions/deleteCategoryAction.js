
import axios from "axios";
import { userCategoriesRequest, userCategoriesSuccess } from "../fetch/userCategories";
import APIURL from "../helpers/environment";
import { getUserCategories } from "./getUserCategories";


export const deleteCategory =(api, token)=>{

    const userHeaders = {
        'Content-Type': 'application/json',
        'Authorization': token
    }

    return function(dispatch){
        dispatch(userCategoriesRequest())
        axios.delete(api, {
            headers: userHeaders
        })
            .then(res=>{
                const data=res.data
                dispatch(userCategoriesSuccess(data))
            })
                .then(res=>{dispatch(getUserCategories(`${APIURL}/category/usercategories`, token))})
            .catch(err=>{
                console.log(err)
            })
    }
}