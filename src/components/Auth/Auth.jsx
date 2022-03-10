import React from 'react'
import {Button} from '@mui/material'
import { Link } from 'react-router-dom'

const Auth = () => {

  return (
    <div>
        <Button color="inherit"><Link to='/register'>Sign Up</Link></Button>
        <Button color="inherit"><Link to='/login'>Login</Link></Button>
    </div>
  )
}

export default Auth