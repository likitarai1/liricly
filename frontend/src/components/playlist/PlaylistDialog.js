import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import { Container } from '@material-ui/core';
import axios from 'axios';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  playlistInput: {
    width: '30%',
    marginLeft: '25%',
  },
  createbtn: {
    marginTop: '2%',
    marginLeft: '2%',
  },
}));

export default function PlaylistDialog({ open, onClose, playlists, videoDetails }) {
  const classes = useStyles();
  const [playlistName, setPlaylistName] = useState('');
  const user = JSON.parse(localStorage.getItem('user'));

  const handleCreatePlaylist = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const username = user.username;
    const playlistname = playlistName;

    axios
      .post('http://localhost:9000/playlist/create', {
        username: username,
        playlistname: playlistname,
      })
      .then((response) => {
        console.log('handlecreateplaylist response >> ', response);
      });
  };

  const saveInPlaylist = (vdetails, SelectedPlaylistName) => {
    axios
      .post('http://localhost:9000/playlist/addvideoInplaylist', {
        username: user.username,
        pName: SelectedPlaylistName,
        vdtls: JSON.stringify(vdetails),
      })
      .then((res) => {
        console.log('Saved');
      })
      .catch((err) => console.log('Error in saving song in playlist ', err));
  };

  const renderplaylist = playlists.map((Playlist, index) => {
    return (
      <>
        <ListItem key={index} button>
          <ListItemText primary={Playlist.playlistName} secondary="videos" />
          <Button
            onClick={() => {
              saveInPlaylist(videoDetails, Playlist.playlistName);
            }}
            autoFocus
            color="inherit"
          >
            save
          </Button>
        </ListItem>
        <Divider />
      </>
    );
  });

  return (
    <Dialog fullScreen open={open} TransitionComponent={Transition}>
      <AppBar className={classes.appBar}>
        <Toolbar>
          <IconButton edge="start" color="inherit" aria-label="close">
            <CloseIcon
              onClick={() => {
                onClose();
              }}
            />
          </IconButton>
          <Typography variant="h6">Your Playlists</Typography>
        </Toolbar>
      </AppBar>
      <Container>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleCreatePlaylist();
          }}
        >
          <TextField
            required
            className={classes.playlistInput}
            variant="outlined"
            margin="normal"
            name="playlistname"
            label="Enter Playlist Name"
            type="text"
            id="playlistname"
            onChange={(e) => {
              setPlaylistName(e.target.value);
            }}
          />
          <Button variant="contained" color="primary" className={classes.createbtn} type="submit">
            Create playlist
          </Button>
        </form>
      </Container>
      <List>{renderplaylist}</List>
    </Dialog>
  );
}
