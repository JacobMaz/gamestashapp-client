
const initialState = {
    loading: false,
    data: [],
    games: [],
    error: ''
}

const FETCH_GAMES_FROM_API_REQUEST = 'FETCH_GAMES_FROM_API_REQUEST'
const FETCH_GAMES_FROM_API_SUCCESS = 'FETCH_GAMES_FROM_API_SUCCESS'
const FETCH_GAMES_FROM_API_FAILURE = 'FETCH_GAMES_FROM_API_FAILURE'
const USER_LOGOUT = 'USER_LOGOUT'

export const fetchGamesFromAPIRequest = () => {
    return {
        type: 'FETCH_GAMES_FROM_API_REQUEST'
    }
}

export const fetchGamesFromAPISuccess = games => {
    return {
        type: 'FETCH_GAMES_FROM_API_SUCCESS',
        payload: games
    }
}

export const fetchGamesFromAPIFailure = error => {
    return {
        type: 'FETCH_GAMES_FROM_API_FAILURE',
        payload: error
    }
}


export const userLogout_fetchFromAPI =()=>{
    return {
        type: 'USER_LOGOUT'
    }
}


export const fetchGamesFromAPIReducer =(state=initialState,action)=>{
    switch(action.type){
        case FETCH_GAMES_FROM_API_REQUEST:
            return {
                ... state,
                loading: true
            }
        case FETCH_GAMES_FROM_API_SUCCESS:
            return {
                loading: false,
                data: action.payload,
                games: action.payload.results,
                error: ''
            }
        case FETCH_GAMES_FROM_API_FAILURE:
            return {
                loading: false,
                data: [],
                games: [],
                error: action.payload
            }
        case USER_LOGOUT:
            return initialState
        default:
            return state
    }
}