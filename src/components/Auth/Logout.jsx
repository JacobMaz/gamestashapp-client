
import { Button, Dialog, DialogTitle } from '@mui/material'
import React, { useState } from 'react'
import { Link, Navigate } from 'react-router-dom';
import { actions } from '../../actions';
import {useDispatch, useSelector} from 'react-redux';
import APIURL from '../../helpers/environment';

const Logout = (props) => {
    const user = useSelector(state=>state.user.user)

    const dispatch = useDispatch();

    const [deleteUserProfileDialogOpen, setDeleteUserProfileDialogOpen] = useState(false)

    const logoutUser=(e)=>{
        e.preventDefault();
    
        dispatch(actions.logout());
      }

    const handleDeleteUser =(e)=>{
      e.preventDefault();

      dispatch(actions.deleteUser(`${APIURL}/user/${user.user.id}`, user.sessionToken))
    }

    if(!props.isLoggedIn){
        return <Navigate to={'/'} />
    }

  return (
    <div className='splashpageAndAuth'>
      <div className='containerForSplashAndAuth'>
          <div className='titleForSplashAndAuth'>
              <h1>Log Out?</h1>                
          </div>

          <div className='authForm'>
              <button onClick={(e)=>logoutUser(e)} className='authSignUpLoginButtons'>Yes</button>
              <Link to='/usergames' className='links' id='logoutNOlink'><button className='authSignUpLoginButtons' id='logoutNObtn'>No</button></Link>
          </div>

          <div>
            <button onClick={()=>{setDeleteUserProfileDialogOpen(true)}} >Delete Profile?</button>
          </div>
      </div>

      <Dialog open={deleteUserProfileDialogOpen} onClose={()=>setDeleteUserProfileDialogOpen(false)} >
        <DialogTitle>
          Permanently Delete {props.isLoggedIn ? user.user.username : 'User'}'s Profile?'
        </DialogTitle>
        <div>
          User Profile Cannot Be Recovered!
        </div>
        <button onClick={()=>{setDeleteUserProfileDialogOpen(false)}}>Cancel</button>
        <button onClick={(e)=>{handleDeleteUser(e)}}>Delete</button>
      </Dialog>
    </div>
  )
}

export default Logout;