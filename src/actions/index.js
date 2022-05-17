import { getGameResultsFromAPI } from "./getGameResultsFromAPI";
import { login } from "./login";
import { postUserGame } from "./postUserGame";
import { sessionToken } from "./sessionToken";
import { userAuth } from "./userAuth";
import {getUserGames} from './getUserGames';
import { getUserCategories } from "./getUserCategories";
import { logout } from "./logout";
import { alertAction, clearAlertAction, infoAlertAction } from "./alertAction";
import { appNavigationAction, clearAppNavigation } from "./appNavigationAction";
import { postUserCategories } from "./postUserCategories";
import { putCategoryUser } from "./putCategoryUser";
import { deleteCategory } from "./deleteCategoryAction";
import { deleteGameFromMyGames } from "./deleteGameFromMyGames";
import { deleteGameFromCategory } from "./deleteGameFromCategory";
import { deleteUser } from "./deleteUser";

export const actions = {
    login: login,
    userAuth: userAuth,
    sessionToken: sessionToken,
    getGameResultsFromAPI: getGameResultsFromAPI,
    postUserGame: postUserGame,
    getUserGames: getUserGames,
    getUserCategories: getUserCategories,
    logout: logout,
    alertAction: alertAction,
    clearAlertAction: clearAlertAction,
    infoAlertAction: infoAlertAction,
    appNavigationAction: appNavigationAction,
    clearAppNavigation: clearAppNavigation,
    postUserCategories: postUserCategories,
    putCategoryUser: putCategoryUser,
    deleteCategory: deleteCategory,
    deleteGameFromMyGames: deleteGameFromMyGames,
    deleteGameFromCategory: deleteGameFromCategory,
    deleteUser: deleteUser
}