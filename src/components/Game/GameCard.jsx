import { Card, CardContent, CardMedia, Dialog, DialogTitle, DialogActions, Stack, Typography } from '@mui/material'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../actions'
import { Snackbar, Alert } from '@mui/material'
import '../../css/game.css'
import APIURL from '../../helpers/environment'

const GameCard = (props) => {
  const token = useSelector(state=>state.user.user.sessionToken)
  const alerts = useSelector(state=>state.alerts)
  const userCategories = useSelector(state=>state.userCategories)

  const [addGameAlertOpen, setAddGameAlertOpen] = useState(false)
  const [platforms, setPlatforms]=useState([])
  const [categoriesSelection, setCategoriesSelection] = useState([])

  const dispatch = useDispatch();

  const handleGameCardClick=()=>{
    setAddGameAlertOpen(true);
  }
  
  const handleAddGameAlertClose=()=>{
    setAddGameAlertOpen(false);
  }

  const handleGameGenres=(genres)=>{

    return (
      <div className='gameGenres'>
        {genres.map((genre,index)=>(
          <p key={index} className='gameGenre'>{genre.name}</p>
        ))}
      </div>
    )
  }

  const checkAddGamePlatformCheckboxes =()=>{
    let tempPlatforms = [];
    let platformCheckboxes = document.getElementsByClassName('addGamePlatformCheckboxes');

    for(let i = 0; i<platformCheckboxes.length; i++){
      if(platformCheckboxes[i].checked){
        tempPlatforms.push(platformCheckboxes[i].value)
      }
    }
    setPlatforms(tempPlatforms);
  }

  const handleGamePlatforms=(platforms)=>{

    return (
      <div>
        {platforms.map((platform,index)=>(
          <div key={index}>
            <input type='checkbox' className='addGamePlatformCheckboxes' value={platform.platform.name} onChange={()=>{checkAddGamePlatformCheckboxes()}} />
            <label for={platform.platform.name}>{platform.platform.name}</label>
          </div>
        ))}
      </div>
    )
  }

  const checkUserCategoriesSelection=()=>{
    let tempCategoriesSelection = []
    let categoriesCheckboxes = document.getElementsByClassName('addToCategoryCheckboxes');

    for(let i=0; i<categoriesCheckboxes.length; i++){
      if(categoriesCheckboxes[i].checked){
        tempCategoriesSelection.push(categoriesCheckboxes[i].value)
      }
    }
    setCategoriesSelection(tempCategoriesSelection)
  }

  const handleUserCategoriesSelection=()=>{

    if(userCategories.status==='SUCCESS'){
      let categories = userCategories.categories.userCategories
      if(categories.length>0){
        if(categories.length>1){
          return (
            <div className='addGameCategoriesCheckboxesContainer'>
              <p>Category (Optional):</p>
              {categories.map((category, index)=>{if(category.name!=='My Games'){
              return (
                <div key={index}>
                  <input type='checkbox' className='addToCategoryCheckboxes' value={category.id} onChange={()=>{checkUserCategoriesSelection()}} />
                  <label for={category.id}>{category.name}</label>
                </div>
              )
              }})}
            </div>
          )          
        }
      }
    }
  }

  const handleAddGame=()=>{
    dispatch(actions.postUserGame(`${APIURL}/game/addgame`, {
      name: props.game.name,
      platform: platforms,
      coverArt: props.game.background_image,
      categories: categoriesSelection
    },
    token
    ))
  }

const handleCloseAlert =()=>{
    dispatch(actions.clearAlertAction())
}

const handleAlertMessage =()=>{

    switch(alerts.status){
        case 'SUCCESS':
            return alerts.success.message
        case 'ERROR':
            return alerts.error.message
        case 'INFO':
            return alerts.info.message
        default:
            return ''
    }
}

const handleAlertSeverity =()=>{

    switch(alerts.status){
        case 'SUCCESS':
            return 'success'
        case 'ERROR':
            return 'error'
        case 'INFO':
            return 'info'
        default:
            return ''
    }
}

const handleAddGameSubmit=()=>{

  if(platforms.length>0){
    handleAddGame();
    handleAddGameAlertClose();
  } else {
    dispatch(actions.alertAction(false, {
      statusCode: 1,
      message: 'Select the Platform!'
    }))
  }
}

  return (
    <div className='gameCardContainer'>
      <Card sx={{height: '100%', width: 265}} className='gameCard' onClick={()=>{handleGameCardClick()}}>
        <Stack sx={{height: '100%', width: '100%', justifyContent: 'space-between'}}>
          <Typography variant='h6' sx={{ height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>{props.game.name}</Typography>
          <CardContent sx={{backgroundColor: 'black', height: '70%'}}>
            <CardMedia component='img' image={props.game.background_image} sx={{ height: '100%', width: '100%', objectFit: 'cover'}} />
          </CardContent>
          <CardContent sx={{height: '30%', maxHeight: '30%', paddingTop: 0, paddingX: 2, '&:Last-child': {paddingBottom:0}, display: 'flex', alignItems: 'center'}}>
            {handleGameGenres(props.game.genres)}
          </CardContent>
        </Stack>
      </Card>
      <Dialog open={addGameAlertOpen} onClose={handleAddGameAlertClose}>
        <DialogTitle>
          Add {props.game.name} To Your Stash? 
        </DialogTitle>
        <div className='addGamePlatformsAndCategories'>
          <div className='addGamePlatformCheckboxesContainer'>
            <p>Platform (required):</p>
            {handleGamePlatforms(props.game.platforms)}
          </div>
          {handleUserCategoriesSelection()}     
        </div>
        <DialogActions>
          <button onClick={()=>handleAddGameAlertClose()}>Cancel</button>
          <button onClick={()=>{handleAddGameSubmit()}}>Add</button>
        </DialogActions>
      </Dialog>

      <Snackbar open={alerts.openAlert} autoHideDuration={6000} onClose={handleCloseAlert} >
        <Alert severity={handleAlertSeverity()} >{handleAlertMessage()}</Alert>
      </Snackbar>
    </div>
  )
}

export default GameCard