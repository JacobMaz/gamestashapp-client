import { app_navigate_to, clear_app_navigation } from "../fetch/appNavigation"


export const appNavigationAction =(navigateTo)=>{
    return app_navigate_to(navigateTo)
}

export const clearAppNavigation =()=>{
    return clear_app_navigation()
}