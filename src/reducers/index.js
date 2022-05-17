
import { fetchGamesFromAPIReducer } from "../fetch/fetchGamesFromAPI";
import { combineReducers } from "redux";
import { userReducer } from "../fetch/user";
import { userGamesReducer } from "../fetch/userGames";
import { userCategoriesReducer } from "../fetch/userCategories";
import { alertReducer } from "../fetch/alerts";
import { appNavigationReducer } from "../fetch/appNavigation";

const allReducers = combineReducers({
    gamesFromAPI: fetchGamesFromAPIReducer,
    user: userReducer,
    userGames: userGamesReducer,
    userCategories: userCategoriesReducer,
    alerts: alertReducer,
    appNavigation: appNavigationReducer
})

export default allReducers;
