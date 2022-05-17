import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
import {AppBar,Box,Toolbar,Button, Grid} from '@mui/material'
import Auth from '../Auth/Auth';
import { Link } from 'react-router-dom';

const TopNav=(props)=>{

  const handleHomeSearchToggle=()=>{

    if(props.isLoggedIn){
      return (
        <Link to='/searchgames' className='links' ><Button id='topToolbarHomeBtn' className='topToolbarBtns' >Search</Button></Link>
      )
    } else {
      return (
        <Link to='/' className='links' ><Button id='topToolbarHomeBtn' className='topToolbarBtns' >Home</Button></Link>
      )
    }
  }

  return (
    <Box sx={{ flexGrow: 1 }} id='topNav'>
      <AppBar position="static">
        <Toolbar id='topToolbar'>
          <Grid container>
            <Grid item xs={1} >
              {handleHomeSearchToggle()}
            </Grid>
            <Grid item xs={9} ></Grid>
            <Grid item xs={2}>
              <Auth isLoggedIn={props.isLoggedIn} /> 
            </Grid>     
          </Grid>
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopNav;