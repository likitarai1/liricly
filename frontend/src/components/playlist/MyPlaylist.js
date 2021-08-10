import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import PlaylistVideoList from './PlaylistVideoList';
import EmptyPlaylist from './../../images/emptyPlaylist.png';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  playlist: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: theme.palette.background.paper,
  },
}));

export default function MyPlaylist(props) {
  const classes = useStyles();
  const user = JSON.parse(localStorage.getItem('user'));
  const [videosInPlaylist, setVideosInPlaylist] = useState([]);

  useEffect(() => {
    const getMyVideos = () => {
      axios
        .get('http://localhost:9000/playlist/particularplaylist', {
          params: {
            username: user.username,
            playlistname: props.match.params.playlistname,
          },
        })
        .then((res) => {
          setVideosInPlaylist(res.data.response);
        })
        .catch((err) => {
          console.log('ERRROOORRR ', err);
        });
    };
    getMyVideos();
  }, []);

  return (
    <Container maxWidth="xs">
      <List className={classes.playist}>
        <h1 style={{ color: 'rgba(0, 0, 0, 0.6)' }}>{props.match.params.playlistname}</h1>
        {videosInPlaylist.length ? (
          <div>
            <ul>
              {videosInPlaylist.map((video, index) => {
                return <PlaylistVideoList key={index} videoDetails={video.videoDetails} />;
              })}
            </ul>
          </div>
        ) : (
          <div>
            <img alt="Empty Playlist" src={EmptyPlaylist} style={{ width: '200px' }} />
            <p style={{ color: 'rgba(0, 0, 0, 0.6)' }}>
              Seems you don't have any videos in here!!!
            </p>
          </div>
        )}
      </List>
    </Container>
  );
}
