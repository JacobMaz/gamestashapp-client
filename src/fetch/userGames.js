
const initialState = {
    loading: false,
    status: '',
    games: [],
    error: ''
}

const USER_GAMES_REQUEST = 'USER_GAMES_REQUEST'
const USER_GAMES_SUCCESS = 'USER_GAMES_SUCCESS'
const USER_GAMES_FAILURE = 'USER_GAMES_FAILURE'
const USER_LOGOUT = 'USER_LOGOUT'

export const userGamesRequest =()=>{
    return {
        type: 'USER_GAMES_REQUEST'
    }
}

export const userGamesSuccess =games=>{
    return {
        type: 'USER_GAMES_SUCCESS',
        payload: games
    }
}

export const userGamesFailure =error=>{
    return {
        type: 'USER_GAMES_FAILURE',
        payload: error
    }
}


export const userLogout_userGames =()=>{
    return {
        type: 'USER_LOGOUT'
    }
}


export const userGamesReducer =(state=initialState, action)=>{
    switch(action.type){
        case USER_GAMES_REQUEST:
            return {
                ... state,
                loading: true
            }
        case USER_GAMES_SUCCESS:
            return {
                loading: false,
                status: 'SUCCESS',
                games: action.payload,
                error: ''
            }
        case USER_GAMES_FAILURE:
            return {
                loading: false,
                status: 'ERROR',
                games: [],
                error: action.payload
            }
        case USER_LOGOUT:
            return initialState
        default:
            return state
    }
}