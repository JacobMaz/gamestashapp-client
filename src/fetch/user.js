
const initialState = {
    loading: false,
    isLoggedIn: false,
    user: [],
    error: ''
}

const USER_REGISTER_REQUEST = 'USER_REGISTER_REQUEST'
const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS'
const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE'
const USER_LOGOUT = 'USER_LOGOUT'

export const userRegisterRequest =()=>{
    return {
        type: 'USER_REGISTER_REQUEST'
    }
}

export const userRegisterSuccess =user=>{
    return {
        type: 'USER_REGISTER_SUCCESS',
        payload: user
    }
}

export const userRegisterFailure =error=>{
    return {
        type: 'USER_REGISTER_FAILURE',
        payload: error
    }
}

export const userLogout_user =()=>{
    return {
        type: 'USER_LOGOUT'
    }
}

export const userReducer =(state=initialState,action)=>{
    switch(action.type){
        case USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case USER_REGISTER_SUCCESS:
            return {
                loading: false,
                isLoggedIn: true,
                user: action.payload,
                error: ''
            }
        case USER_REGISTER_FAILURE:
            return {
                loading: false,
                isLoggedIn: false,
                user: [],
                error: action.payload
            }
        case USER_LOGOUT:
            return initialState
        default:
            return state
    }
}