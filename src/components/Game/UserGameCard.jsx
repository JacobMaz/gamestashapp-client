
import React, { useState } from 'react'
import { Card, CardContent, CardMedia, Stack, Typography, Dialog, DialogTitle } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../actions';
import APIURL from '../../helpers/environment';

const UserGameCard = (props) => {
  const token = useSelector(state=>state.user.user.sessionToken)
  const userCategories = useSelector(state=>state.userCategories)

  const [addGameToCategoryAlertOpen, setAddGameToCategoryAlertOpen] = useState(false)
  const [deleteGameFromCategoryAlertOpen, setDeleteGameFromCategoryAlertOpen] = useState(false)
  const [categoriesSelection, setCategoriesSelection] = useState([])

  const game = props.game

  const dispatch = useDispatch();

  const handleGamePlatformDisplay=(platforms)=>{

    return (
      <div>
        {platforms.map((platform,index)=>(
          <p key={index}>{platform}</p>
        ))}
      </div>
    )
  }

  const handleAddGameToCategoryAlertClose =()=>{
    setAddGameToCategoryAlertOpen(false)
  }
  const handleDeleteGameFromCategoryClose=()=>{
    setDeleteGameFromCategoryAlertOpen(false)
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

  const handleAddGameToCategorySubmit=()=>{
    dispatch(actions.postUserCategories(`${APIURL}/category/addgametocategory`, {
      categoryId: categoriesSelection,
      gameId: game.id
    }, token))
  }

  const handleRemoveGameFromCategory =(category)=>{

    if(category.name==='My Games'){
      dispatch(actions.deleteGameFromMyGames(`${APIURL}/game/${game.id}`, token))
    } else {
      // console.log(`From ${category.name}`)
      dispatch(actions.deleteGameFromCategory(`${APIURL}/category/removegamefromcategory`, {
        categoryId: category.id,
        gameId: game.id
      }, token))
    }
  }

  return (
    <>
      <Card sx={{height: '300px', minWidth: '250px', width: '250px', margin: '0px 5px 0px 5px'}} className='gameCard'>
        <Stack sx={{height: '100%', width: '100%', justifyContent: 'space-between'}}>
            <Typography  variant='h6' sx={{ height: '20%', display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center'}}>{game.name}</Typography>
            <CardContent sx={{backgroundColor: 'black', height: '70%'}}>
              <CardMedia component='img' image={game.coverArt} sx={{ height: '100%', width: '100%', objectFit: 'cover'}} />
            </CardContent>    
            <div>
              {handleGamePlatformDisplay(game.platform)}
              <AddIcon onClick={()=>{setAddGameToCategoryAlertOpen(true)}} />
              <RemoveIcon onClick={()=>{setDeleteGameFromCategoryAlertOpen(true)}} />
            </div>
        </Stack>
      </Card> 
      <Dialog open={addGameToCategoryAlertOpen} onClose={handleAddGameToCategoryAlertClose} >
        <DialogTitle>
          Select Categories to add {game.name} to?
        </DialogTitle>
        {handleUserCategoriesSelection()}
        <button onClick={()=>handleAddGameToCategorySubmit()}>Add</button>
      </Dialog>

      <Dialog open={deleteGameFromCategoryAlertOpen} onClose={handleDeleteGameFromCategoryClose} >
        <DialogTitle>
          Delete {game.name} From {props.category.name}?
        </DialogTitle>
        <button onClick={()=>{handleRemoveGameFromCategory(props.category); setDeleteGameFromCategoryAlertOpen(false)}}>Delete</button>
        <button onClick={()=>{handleDeleteGameFromCategoryClose()}}>Cancel</button>
      </Dialog>
    </>
  )
}

export default UserGameCard;