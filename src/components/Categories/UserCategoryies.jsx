
import React, { useState } from 'react';
import {Accordion,AccordionSummary,Dialog,DialogActions,DialogTitle,Typography} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import UserGameCard from '../Game/UserGameCard';
import { Link } from 'react-router-dom';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { useDispatch, useSelector } from 'react-redux'
import { actions } from '../../actions';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import APIURL from '../../helpers/environment';

const UserCategoryies = (props) => {
  const token = useSelector(state=>state.user.user.sessionToken);
  
  const [expanded, setExpanded] = useState(`panel0`);
  const [createCategoryDialogOpen, setCreateCategoryDialogOpen] = useState(false);
  const [editCategoryDialogOpen, setEditCategoryDialogOpen] = useState(false);
  const [deleteCategoryDialogOpen, setDeleteCategoryDialogOpen] = useState(false);
  const [categoryName, setCategoryName] = useState('');
  const [newCategoryName, setNewCategoryName] = useState('');
  const [activeCategoryId, setActiveCategoryId] = useState(0);

  const dispatch = useDispatch();

  const userCategories = props.userCategories;

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  const handleUserGameDispaly=(category)=>{

    if(category.games.length>0){
      return (
      <div className='userCategoryGameContainer_MyGames'>
        {category.games.map(game=>(
          <UserGameCard key={game.id} game={game} category={category} />
        ))}
      </div>
      )    
    } else {
      return (
        <div className='userCategoryGameContainerNoGames_MyGames'>
          <div className='noGamesInCategory'>
            <h3>No Games Yet</h3>
            <Link to='/searchgames' className='categoryLink' ><button className='noUserGamesBtn'>Search</button></Link>
          </div>          
        </div>
      )
    }
  }

  const handleGamesInCreatedCategoriesDisplay =(category)=>{

    if(category.games.length>0){
      return (
      <div className='userCategoryGameContainer'>
        {category.games.map(game=>(
          <UserGameCard key={game.id} game={game} category={category} />
        ))}
      </div>
      )    
    } else {
      return (
        <div className='userCategoryGameContainerNoGames'>
          <div className='noGamesInCategory'>
            <h3>No Games Yet</h3>
            <p className='addGameToCategoryInfo'>Add Games to Category by clicking on the "Add To Category" Icon on a Game in "My Games"</p>
          </div>          
        </div>
      )
    }    
  }

  const handleAddCategorySubmit=()=>{
    if(categoryName!=='My Games'){
      dispatch(actions.postUserCategories(`${APIURL}/category/createcategory`, {name: categoryName}, token))
    } else {
      console.log('Cannot Name Category "My Games"')
    }
  }

  const handleEditCategory =()=>{

    // console.log('edit cat: ', activeCategoryId)
    dispatch(actions.putCategoryUser(`${APIURL}/category/${activeCategoryId}`, {name: newCategoryName}, token))
  }

  const handleDeleteCategory =()=>{
    dispatch(actions.deleteCategory(`${APIURL}/category/${activeCategoryId}`, token))
  }

  const handleUserCategoriesAccordionDisplay=()=>{

    if(userCategories!==undefined){
      if(userCategories.length>0){

        let myGames = userCategories.find(category => category.name === 'My Games')

        return (
          <div className='userCategoriesSubDiv'>
            <Accordion key={myGames.id} expanded={expanded === `panel0`} onChange={handleChange(`panel0`)}
              sx={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.0)', border: 'solid rgb(163, 11, 201) 3px', borderRadius: '5px'}}>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls="panel1bh-content"
                  id="panel1bh-header"
                  sx={{backgroundColor: 'rgba(240, 240, 240, 1)'}}
                >
                  <Typography sx={{ width: '33%', flexShrink: 0, }}>
                    {myGames.name}
                  </Typography>
                </AccordionSummary>
                {handleUserGameDispaly(myGames)}
            </Accordion>
          {userCategories.map((category, index)=>{if(category.name!=='My Games'){
            return (
              <Accordion key={category.id} expanded={expanded === `panel${index+1}`} onChange={handleChange(`panel${index+1}`)}
              sx={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.0)', border: 'solid rgb(163, 11, 201) 3px', borderRadius: '5px'}}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1bh-content"
                    id="panel1bh-header"
                    sx={{backgroundColor: 'rgba(240, 240, 240, 1)'}}
                  >
                    <Typography sx={{ width: '33%', flexShrink: 0, }}>
                      {category.name}
                    </Typography>
                  </AccordionSummary>
                  <div className='categoryContentContainer'>
                    <EditIcon onClick={()=>{setActiveCategoryId(category.id); setEditCategoryDialogOpen(true)}} sx={{color: 'rgb(20, 238, 220)', marginTop: '10px', marginLeft: '5px'}}/>
                    <DeleteIcon onClick={()=>{setActiveCategoryId(category.id); setDeleteCategoryDialogOpen(true)}} sx={{color: 'rgb(20, 238, 220)'}} />
                    {handleGamesInCreatedCategoriesDisplay(category)}
                  </div>
              </Accordion>
            )
          }})}          
          </div>
        )        
      }
    }
  }

  const handleCreateCategoryClose =()=>{
    setCreateCategoryDialogOpen(false);
  }
  const handleEditCategoryClose =()=>{
    setEditCategoryDialogOpen(false);
  }
  const handleDeleteCategoryClose =()=>{
    setDeleteCategoryDialogOpen(false);
  }

  return (
    <div className='userCategories'>
      {handleUserCategoriesAccordionDisplay()}
      {/* {userCategories.length>0 ? userCategories.map((category, index)=>(
        <Accordion key={category.id} expanded={expanded === `panel${index}`} onChange={handleChange(`panel${index}`)}
          sx={{ width: '100%', backgroundColor: 'rgba(255, 255, 255, 0.0)', border: 'solid rgb(163, 11, 201) 3px', borderRadius: '5px'}}
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1bh-content"
            id="panel1bh-header"
            sx={{backgroundColor: 'rgba(240, 240, 240, 1)'}}
          >
            <Typography sx={{ width: '33%', flexShrink: 0, }}>
              {category.name}
            </Typography>
          </AccordionSummary>
          {handleUserGameDispaly(category)}
        </Accordion>        
      )) :
        null
      } */}
      <div className='addCategoryIconDiv'>
        <AddCircleIcon onClick={()=>{setCreateCategoryDialogOpen(true)}} sx={{height: '100%', width: '100%', color: 'rgb(163, 11, 201)'}}/>
      </div>

      <Dialog open={createCategoryDialogOpen} onClose={handleCreateCategoryClose}>
        <DialogTitle>
          Category Name:
        </DialogTitle>
        <DialogActions>
          <input type={'text'} onChange={(e)=>setCategoryName(e.target.value)} />
          <button onClick={()=>{handleAddCategorySubmit(); handleCreateCategoryClose()}}>Create Category</button>
        </DialogActions>
      </Dialog>

      <Dialog open={editCategoryDialogOpen} onClose={handleEditCategoryClose}>
        <DialogTitle>
          New Category Name:
        </DialogTitle>
        <DialogActions>
          <input type={'text'} onChange={(e)=>setNewCategoryName(e.target.value)} />
          <button onClick={()=>{handleEditCategory(); handleEditCategoryClose()}} >Submit Change</button> 
        </DialogActions>
      </Dialog>

      <Dialog open={deleteCategoryDialogOpen} onClose={handleDeleteCategoryClose} >
        <DialogTitle>
          Delete Category:
        </DialogTitle>
        <DialogActions>
          <button onClick={()=>{handleDeleteCategory(); handleDeleteCategoryClose(); setActiveCategoryId(0)}}>Delete</button>
          <button onClick={()=>{setActiveCategoryId(0); handleDeleteCategoryClose()}}>Cancel</button>
        </DialogActions>
      </Dialog>
    </div>
  )
}

export default UserCategoryies;