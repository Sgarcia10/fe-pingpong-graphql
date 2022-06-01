import { useMutation } from "@apollo/client";
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { CREATE_PLAYER } from "../queries/players";

export interface AddMatchDialogProps {
    open: boolean;
    onClose: () => void;
}

export function AddPlayerDialog(props: AddMatchDialogProps) {
    const { onClose, open } = props;
    const [username, setUsername] = useState('');
    const [mutateCreatePlayer, { data: playerData, loading: loadingPlayer }] = useMutation(CREATE_PLAYER);

    useEffect(() => {
        if(playerData) {
          onClose()
        }
    }, [playerData, loadingPlayer]);
    
    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleClose = () => {
        mutateCreatePlayer({variables: {username}})
        setUsername('')
    };

    return (
    <Dialog open={open} onClose={handleClose}>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Username"
            type="text"
            value={username}
            fullWidth
            variant="standard"
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Add Player</Button>
        </DialogActions>
      </Dialog>
    )
}