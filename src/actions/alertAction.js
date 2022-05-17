
import { success_alert, error_alert, clear_alert, info_alert } from "../fetch/alerts";

export const alertAction =(alert_status, alrt)=>{

    if(alert_status){
        return success_alert(alrt);
    } else {
        return error_alert(alrt);
    }
}

export const clearAlertAction =()=>{
    return clear_alert();
}

export const infoAlertAction =(alrt)=>{
    return info_alert(alrt)
}