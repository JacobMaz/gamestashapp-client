
import React from 'react'

import {Button, Dialog, DialogActions, DialogContent, DialogTitle} from '@mui/material';
import { actions } from '../../actions';
import { useDispatch, useSelector } from 'react-redux';

export const DeleteUserGameAlert = (props) => {
    const token = useSelector(state=>state.user.user.sessionToken)

    const dispatch = useDispatch();

    const deleteGameFromStash =(e)=>{
        e.preventDefault();

        fetch(`http://localhost:3069/game/${props.activeGame.id}`, {
            method: 'DELETE',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': `${token}`
            })
        })
            .then(res=>res.json())
                .then(data=>{
                    console.log('data:',data)
                    if(data.status==='success'){
                        dispatch(actions.getUserGames('http://localhost:3069/game/usergames', token))
                    }
                })
                    .catch(err=>console.log(err))
    }

  return (
    <div>
        <Dialog
            open={props.deleteGameAlertOpen}
            onClose={props.handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">
            {`Delete ${props.activeGame.name} From Your Stash?`}
            </DialogTitle>
            <DialogContent>
            <div id="alert-dialog-description">
                Are You Sure You Want to Delete This Game From Your Stash?
            </div>
            </DialogContent>
            <DialogActions>
            <Button onClick={props.handleClose}>No</Button>
            <Button onClick={(e)=>{props.handleClose(); deleteGameFromStash(e)}} autoFocus>
                Agree
            </Button>
            </DialogActions>
        </Dialog>
    </div>
  )
}
