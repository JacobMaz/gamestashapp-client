
const initialState = {
    loading: false,
    status: '',
    categories: [],
    error: ''
};

const USER_CATEGORIES_REQUEST = 'USER_CATEGORIES_REQUEST';
const USER_CATEGORIES_SUCCESS = 'USER_CATEGORIES_SUCCESS';
const USER_CATEGORIES_FAILURE = 'USER_CATEGORIES_FAILURE';
const USER_LOGOUT = 'USER_LOGOUT'

export const userCategoriesRequest =()=>{
    return {
        type: 'USER_CATEGORIES_REQUEST'
    }
};

export const userCategoriesSuccess =categories=>{
    return {
        type: 'USER_CATEGORIES_SUCCESS',
        payload: categories
    }
};

export const userCategoriesFailure =error=>{
    return {
        type: 'USER_CATEGORIES_FAILURE',
        payload: error
    }
};

export const userLogout_userCats =()=>{
    return {
        type: 'USER_LOGOUT'
    }
}

export const userCategoriesReducer =(state=initialState, action)=>{
    switch(action.type){
        case USER_CATEGORIES_REQUEST:
            return {
                ... state,
                loading: true
            }
        case USER_CATEGORIES_SUCCESS:
            return {
                loading: false,
                status: 'SUCCESS',
                categories: action.payload,
                error: ''
            }
        case USER_CATEGORIES_FAILURE:
            return {
                loading: false,
                status: 'ERROR',
                categories: [],
                error: action.payload
            }
        case USER_LOGOUT:
            return initialState
        default:
            return state
    }
};