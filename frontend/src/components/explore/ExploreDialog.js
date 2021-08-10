import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContentText from '@material-ui/core/DialogContentText';

export default function ExploreDialog({
  open,
  onClose,
  videoID,
  videoTitle,
  openPlaylistDialog,
  add,
}) {
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Now Playing</DialogTitle>
      <DialogContent>
        <DialogContentText>{videoTitle}</DialogContentText>
        <iframe
          title="drawerplayer"
          width="300"
          height="200"
          src={`https://www.youtube.com/embed/${videoID}?controls=0&rel=0`}
          frameborder="0"
          allow="autoplay;"
          id="player"
        ></iframe>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Close
        </Button>
        {add ? (
          <Button onClick={openPlaylistDialog} color="primary">
            Add to playlist
          </Button>
        ) : (
          ''
        )}
      </DialogActions>
    </Dialog>
  );
}
