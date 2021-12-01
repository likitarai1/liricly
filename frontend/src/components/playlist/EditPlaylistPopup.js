import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import axios from 'axios';

export default function EditPlaylistPopup({ openEdit, closeEdit, playlistid }) {
  //   const [open, setOpen] = useState(openEdit);
  const [newPlaylistname, setNewPlaylistname] = useState('');
  console.log('ID : ', playlistid);
  //   const handleClickOpen = () => {
  //     setOpen(true);
  //   };

  // useEffect(() => {}, []);

  const saveNewName = () => {
    const payload = {
      newplaylistname: newPlaylistname,
      playlistid,
    };
    axios.patch('http://localhost:9000/playlist/playlistName', [payload]).then((response) => {
      alert('Updated!!');
      setNewPlaylistname('');
      closeEdit();
    });
  };
  //   const handleClose = () => {
  //     setOpen(false);
  //   };

  return (
    <div>
      <Dialog open={openEdit} onClose={closeEdit} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Edit playlist name</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Enter new name"
            type="email"
            fullWidth
            onChange={(e) => {
              console.log(e.target.value);
              setNewPlaylistname(e.target.value);
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeEdit} color="primary">
            Cancel
          </Button>
          <Button onClick={saveNewName} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
