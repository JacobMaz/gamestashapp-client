import React, { useEffect, useState } from 'react'
import { Button, CircularProgress } from '@mui/material';
import GameCard from './GameCard';
import {useSelector, useDispatch} from 'react-redux'
import { actions } from '../../actions';
import '../../css/game.css'

const GamesSearch = () => {
    const gamesFromAPI = useSelector(state=>state.gamesFromAPI)

    const [gameName, setGameName]=useState('')
    
    const dispatch = useDispatch();

    const today_date = String(new Date().getDate())
    const today_month =()=>{
        let m = String(new Date().getMonth()+1)
        if(m.length===1){
            m = '0'+m
        }
        return m
    }

    const handleGameSearchApiString=()=>{
        let base_rawg_api_search = `https://api.rawg.io/api/games?key=fd50575b9a74462186a715b3ed2832eb`;
        let page_params = '&page=1&page_size=10';

        if(gameName!==''){
            base_rawg_api_search=base_rawg_api_search+'&search='+gameName;
        }

        return base_rawg_api_search+page_params;
    }
    
    useEffect(()=>{
        if(gamesFromAPI.games.length===0){
            dispatch(actions.getGameResultsFromAPI(handleGameSearchApiString()))
        }
    }, [])

    const nextPage=()=>{
        dispatch(actions.getGameResultsFromAPI(gamesFromAPI.data.next))
    }

    const previousPage=()=>{
        dispatch(actions.getGameResultsFromAPI(gamesFromAPI.data.previous))
    }

    const handleButtonDispaly=()=>{
        let games=gamesFromAPI.games
        if(games.length>0){
            return (
                <div className='gameSearchPageBtnContainer'>
                    <Button className='gameSearchPageBtns' onClick={()=>nextPage()}>Next Page</Button>
                    <Button className='gameSearchPageBtns' onClick={()=>previousPage()}>Previous Page</Button>                
                </div>
            )
        } else {
            return null
        }
    }

    const handleGameResultsDisplay=()=>{
        let games = gamesFromAPI.games
        if(games.length>0){
            return (
                <div className='gameSearchResults'>
                    {games.map((game, index)=>(
                        <GameCard key={index} game={game} />
                    ))}
                </div>
            )
        } else {
            return (
                <div className='gameSearchLoading'>
                    <CircularProgress />                    
                </div>
            )
        }
    }

  return (
      <div className='gameSearchBaseContainer'>
          <div className='gameSearchContainer'>
                <div className='titleDivForGameSearch'>
                    <h1 className='titleForGameSearch'>Game Search</h1>
                </div>
                <div className='gameSearchSecondaryContainer'>
                    <div>
                        <label>Name: <input type={'text'} name='gameName' onChange={e=>setGameName(e.target.value)}/></label>
                        <button onClick={()=>dispatch(actions.getGameResultsFromAPI(handleGameSearchApiString()))}>search</button>
                    </div> 
                    {handleGameResultsDisplay()}
                    {handleButtonDispaly()}
                </div>
          </div>
      </div>
  )
}

export default GamesSearch;