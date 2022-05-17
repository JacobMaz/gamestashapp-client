
const initialState = {
    // success: {
    //     status: false
    // },
    // error: {
    //     status: false,
    //     statusCode: 0,
    //     error: ''
    // }
    openAlert: false,
    status: '',
    success: {
        statusCode: 0,
        message: ''
    },
    error: {
        statusCode: 0,
        message: ''
    },
    info: {
        statusCode: 0,
        message: ''
    }
}

const SUCCESS_ALERT = 'SUCCESS_ALERT';
const ERROR_ALERT = 'ERROR_ALERT';
const INFO_ALERT = 'INFO_ALERT'
const CLEAR_ALERT = 'CLEAR_ALERT';

export const success_alert =success=>{
    return {
        type: 'SUCCESS_ALERT',
        payload: success
    }
}

export const error_alert =error=>{
    return {
        type: 'ERROR_ALERT',
        payload: error
    }
}

export const info_alert =info=>{
    return {
        type: 'INFO_ALERT',
        payload: info
    }
}

export const clear_alert =()=>{
    return {
        type: 'CLEAR_ALERT'
    }
}

export const alertReducer =(state=initialState, action)=>{
    switch(action.type){
        case SUCCESS_ALERT:
            return {
                openAlert: true,
                status: 'SUCCESS',
                success: {
                    statusCode: 200,
                    message: action.payload
                },
                error: {
                    statusCode: 0,
                    message: ''
                },
                info: {
                    statusCode: 0,
                    message: ''
                }
            }
        case ERROR_ALERT:
            return {
                openAlert: true,
                status: 'ERROR',
                success: {
                    statusCode: 0,
                    message: ''
                },
                error: action.payload,
                info: {
                    statusCode: 0,
                    message: ''
                }
            }
        case INFO_ALERT:
            return {
                openAlert:true,
                status: 'INFO',
                success: {
                    statusCode: 0,
                    message: ''
                },
                error: {
                    statusCode: 0,
                    message: ''
                },
                info: action.payload
            }
        case CLEAR_ALERT:
            return initialState;
        default:
            return state;
    }
}