import React, { useState, useCallback } from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import PlayCircleFilledWhiteRoundedIcon from '@material-ui/icons/PlayCircleFilledWhiteRounded';
import PauseCircleFilledRoundedIcon from '@material-ui/icons/PauseCircleFilledRounded';
import IconButton from '@material-ui/core/IconButton';
import ExploreDialog from './../explore/ExploreDialog';

export default function PlaylistVideoItem({ videodata }) {
  const [playing, setPlaying] = useState(false);
  const [openVideo, setOpenVideo] = useState(false);

  const handleVideoClose = useCallback(() => {
    setOpenVideo(false);
    setPlaying(false);
  }, [setOpenVideo]);

  return (
    <ListItem>
      <ListItemAvatar>
        <Avatar alt={videodata.snippet.description} src={videodata.snippet.thumbnails.high.url} />
      </ListItemAvatar>
      <ListItemText
        primary={videodata.snippet.title.slice(0, 70) + ' ...'}
        secondary={videodata.snippet.channelTitle}
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
      <ExploreDialog
        open={openVideo}
        onClose={() => {
          handleVideoClose();
        }}
        videoID={videodata.id.videoId}
        videoTitle={videodata.snippet.title.slice(0, 60) + ' ...'}
        add={false}
      />
    </ListItem>
  );
}
