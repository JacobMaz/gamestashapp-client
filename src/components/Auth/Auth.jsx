import React from 'react';
import {Button} from '@mui/material';
import { Link } from 'react-router-dom';

const Auth = (props) => {

  return (
    <div >
        {props.isLoggedIn?
        <div className='authAndUserBtns'>
          <Link to='/usergames' className='links' ><Button className='topToolbarBtns' >User Games</Button></Link>
          <Link to='logout' className='links'><Button className='topToolbarBtns' >Sign Out</Button></Link>
        </div>
         : 
        <div className='authAndUserBtns'>
          <Link to='/register' className='links' ><Button className='topToolbarBtns' >Sign Up</Button></Link>
          <Link to='/login' className='links' ><Button className='topToolbarBtns' >Login</Button></Link>
        </div>}
    </div>
  )
}

export default Auth;