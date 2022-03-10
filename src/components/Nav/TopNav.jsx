import * as React from 'react';
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import Typography from '@mui/material/Typography';
// import Button from '@mui/material/Button';
// import IconButton from '@mui/material/IconButton';
import {AppBar,Box,Toolbar,Typography,IconButton, Button} from '@mui/material'
import Auth from '../Auth/Auth';
import { Link } from 'react-router-dom';

const TopNav=()=>{

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
            <Button><Link to='/'>Home</Link></Button>
        <Auth />
        </Toolbar>
      </AppBar>
    </Box>
  );
}

export default TopNav;