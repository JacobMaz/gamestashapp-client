
const initialState = {
    navigationStatus: false,
    navigateTo: ''
}

export const app_navigate_to =navigateTo=>{
    return {
        type: 'NAVIGATE_TO',
        payload: navigateTo
    }
}

export const clear_app_navigation =()=>{
    return {
        type: 'CLEAR_APP_NAVIGATION'
    }
}

export const appNavigationReducer =(state=initialState, action)=>{
    switch(action.type){    
        case 'NAVIGATE_TO':
            return {
                navigationStatus: true,
                navigateTo:  action.payload
            }
        case 'CLEAR_APP_NAVIGATION':
            return initialState
        default:
            return state
    }
}