import { fetchGamesFromAPIFailure, fetchGamesFromAPIRequest, fetchGamesFromAPISuccess } from "../fetch/fetchGamesFromAPI"
import axios from 'axios'

export const getGameResultsFromAPI =(api)=>{
    return function(dispatch){
        dispatch(fetchGamesFromAPIRequest())
        axios.get(api)
            .then(response=>{
                const data = response.data
                dispatch(fetchGamesFromAPISuccess(data))
            })
            .catch(error=>{
                dispatch(fetchGamesFromAPIFailure(error))
            })
    }
}