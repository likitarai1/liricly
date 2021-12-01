import axios from 'axios';
import React, { useState, useEffect, useCallback } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import Divider from '@material-ui/core/Divider';
import AcUnitIcon from '@material-ui/icons/AcUnit';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Pagination from '@material-ui/lab/Pagination';
import EditPlaylistPopup from './EditPlaylistPopup';

const useStyles = makeStyles((theme) => ({
  listStyle: {
    width: '100%',
    maxWidth: 400,
  },
  listItemStyle: {
    '&:hover': {
      background: 'rgba(0, 0, 0, 0.08)',
    },
  },
}));

function Playlist() {
  const [myPlaylists, setMyplaylists] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  const classes = useStyles();

  const itemsPerPage = 4;
  const [page, setPage] = useState(1);
  const [noOfPages] = useState(Math.ceil(5 / itemsPerPage));

  const handleChange = (event, value) => {
    setPage(value);
  };

  const headTo = (playlistname) => {
    window.location.href = `/playlist/${playlistname}`;
  };

  useEffect(() => {
    const getMyPlaylists = async () => {
      const username = user.username;
      axios
        .get(`http://localhost:9000/playlist/getplaylists/${username}`)
        .then((response) => {
          console.log('herere:: ', response.data.result);
          setMyplaylists(response.data.result);
        })
        .catch((err) => {
          console.log('This is playlist error frontend useeffect', err);
        });
    };
    getMyPlaylists();
  }, []);

  const [openEditPopup, setOpenEditPopup] = useState(false);
  const [playlistid, setPlaylistid] = useState(null);

  const openEditModal = (ID) => {
    setOpenEditPopup(true);
    setPlaylistid(ID);
  };
  const closeEditModal = useCallback(() => {
    setOpenEditPopup(false);
  }, [setOpenEditPopup]);

  return (
    <Container maxWidth="sm" style={{ padding: '0% 6%' }}>
      <List className={classes.listStyle}>
        <h1 style={{ color: 'rgba(0, 0, 0, 0.6)' }}>My Playlists</h1>
        {myPlaylists.length ? (
          myPlaylists
            .slice((page - 1) * itemsPerPage, page * itemsPerPage)
            .map((playlist, index) => {
              return [
                <ListItem key={index} className={classes.listItemStyle} button>
                  <ListItemIcon>
                    <AcUnitIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary={playlist.playlistName.toUpperCase()}
                    onClick={() => headTo(playlist.playlistName)}
                  />
                  <ListItemIcon>
                    <EditIcon
                      onClick={() => {
                        console.log('hi');
                        openEditModal(playlist.idplaylist);
                      }}
                    />
                    <EditPlaylistPopup
                      openEdit={openEditPopup}
                      closeEdit={() => {
                        closeEditModal();
                      }}
                      playlistid={playlistid}
                    />
                    <DeleteIcon
                      onClick={() => {
                        console.log('hello');
                      }}
                    />
                  </ListItemIcon>
                </ListItem>,
                <Divider />,
              ];
            })
        ) : (
          <h4>No Playlists created</h4>
        )}
      </List>
      {myPlaylists.length > 4 ? (
        <Pagination
          maxWidth="sm"
          style={{ marginLeft: '19%' }}
          count={noOfPages}
          page={page}
          onChange={handleChange}
          color="secondary"
          defaultPage={1}
          showFirstButton
          showLastButton
        />
      ) : (
        ''
      )}
    </Container>
  );
}
export default React.memo(Playlist);
