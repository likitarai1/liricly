import React, { useState, useCallback } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import AddCircleRoundedIcon from '@material-ui/icons/AddCircleRounded';
import IconButton from '@material-ui/core/IconButton';
import PlaylistDialog from './../playlist/PlaylistDialog';
import ExploreDialog from './ExploreDialog';
import axios from 'axios';

export default function ExploreItem({ video }) {
  const [playing, setPlaying] = useState(false);
  const [open, setOpen] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);
  const [userplaylist, setUserplaylist] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const getData = () => {
    const username = user.username;
    axios.get(`http://localhost:9000/playlist/getplaylists/${username}`).then((response) => {
      setUserplaylist(response.data.result);
    });
  };

  const handleClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  const handleVideoClose = useCallback(() => {
    setOpenVideo(false);
    setPlaying(false);
  }, [setOpenVideo]);

  const openPlaylistDialog = () => {
    setOpen(true);
  };

  return (
    <>
      <ListItem>
        <ListItemAvatar>
          <Avatar alt={video.snippet.description} src={video.snippet.thumbnails.high.url} />
        </ListItemAvatar>
        <ListItemText
          primary={video.snippet.title.slice(0, 70) + ' ...'}
          secondary={video.snippet.channelTitle}
        />
        <IconButton onClick={() => setOpenVideo(true)}>
          {playing ? (
            <PauseCircleFilledRoundedIcon
              onClick={() => {
                setPlaying(false);
              }}
            />
          ) : (
            <PlayCircleFilledWhiteRoundedIcon
              onClick={() => {
                setPlaying(true);
              }}
            />
          )}
        </IconButton>
        <IconButton>
          <AddCircleRoundedIcon
            onClick={() => {
              setOpen(true);
              getData();
            }}
          />
        </IconButton>
        <PlaylistDialog
          open={open}
          onClose={() => {
            handleClose();
          }}
          playlists={userplaylist}
          videoDetails={video}
        />
        <ExploreDialog
          open={openVideo}
          onClose={() => {
            handleVideoClose();
          }}
          videoID={video.id.videoId}
          videoTitle={video.snippet.title.slice(0, 60) + ' ...'}
          openPlaylistDialog={() => {
            openPlaylistDialog();
          }}
          add={true}
        />
      </ListItem>
    </>
  );
}
