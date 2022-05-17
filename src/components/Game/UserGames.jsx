
import { Grid } from '@mui/material';
import React, { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { actions } from '../../actions';

import '../../css/user.css';
import UserCategoryies from '../Categories/UserCategoryies';

const UserGames = (props) => {
  const userCategories = useSelector(state=>state.userCategories)
  const token = useSelector(state=>state.user.user.sessionToken)

  const dispatch = useDispatch();

  useEffect(()=>{
      dispatch(actions.getUserCategories('http://localhost:3069/category/usercategories', token))
  }, [])

  const handleCategoryDisplay=()=>{
    if(userCategories.status==='SUCCESS'){
      return (<UserCategoryies userCategories={userCategories.categories.userCategories} />)
    } else {
      return null
    }
  }

  return (
    <div className='userBaseContainer'>
      <div className='userContainer'>
        <Grid
          container
          direction="column"
          alignItems='center'
          sx={{width: '100%', height: '100%'}}
        >
          <Grid item xs={2} sx={{ height: '20%', width: '80%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
            <h1 className='userTitle'>{props.user.user.username}</h1>
          </Grid>
          <Grid item xs sx={{ height: '80%', width: '80%', dipslay: 'flex'}}>
            {handleCategoryDisplay()}            
          </Grid>
        </Grid>
      </div>
    </div>
  )
}

export default UserGames;