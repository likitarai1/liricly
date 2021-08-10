import React, { useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import MenuIcon from '@material-ui/icons/Menu';
import MoodIcon from '@material-ui/icons/Mood';
import AccountCircle from '@material-ui/icons/AccountCircle';
import PersonOutlineRoundedIcon from '@material-ui/icons/PersonOutlineRounded';
import LockOpenRoundedIcon from '@material-ui/icons/LockOpenRounded';
import PlaylistPlayOutlinedIcon from '@material-ui/icons/PlaylistPlayOutlined';
import SearchOutlinedIcon from '@material-ui/icons/SearchOutlined';
import MoreIcon from '@material-ui/icons/MoreVert';
import { Link } from 'react-router-dom';
import { useStyles } from '../../styles/NavbarStyle';

export default function Navbar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = useState(null);
  const [appMenuAnchorEl, setAppMenuAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : {};

  const isMenuOpen = Boolean(anchorEl); //Profile Menu i.e. Account one
  const isAppMenuOpen = Boolean(appMenuAnchorEl); //Appmenu i.e. MenuIcon one
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl); //Mobile menu i.e. three dot one (MoreIcon)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAppMenuOpen = (event) => {
    setAppMenuAnchorEl(event.currentTarget);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setAppMenuAnchorEl(null);
    setMobileMoreAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = 'http://localhost:3000/';
  };

  const appmenuId = 'app-menu';
  const renderAppmenu = (
    <Menu
      anchorEl={appMenuAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={appmenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isAppMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem
        onClick={() => {
          window.location.href = 'http://localhost:3000/explore';
        }}
      >
        <IconButton>
          <SearchOutlinedIcon />
        </IconButton>
        <p>Explore</p>
      </MenuItem>
      <MenuItem
        onClick={() => {
          window.location.href = 'http://localhost:3000/playlist';
        }}
      >
        <IconButton>
          <PlaylistPlayOutlinedIcon />
        </IconButton>
        <p>My Playlists</p>
      </MenuItem>
    </Menu>
  );

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <MoodIcon />
        </IconButton>
        <p>Hi {user.username}</p>
      </MenuItem>
      <MenuItem onClick={handleLogout}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Logout</p>
      </MenuItem>
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMenuClose}
    >
      {user.username
        ? [
            <MenuItem>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <MoodIcon />
              </IconButton>
              <p>Hi {user.username}</p>
            </MenuItem>,
            <MenuItem onClick={handleLogout}>
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <p>Logout</p>
            </MenuItem>,
          ]
        : [
            <MenuItem
              onClick={() => {
                window.location.href = 'http://localhost:3000/';
              }}
            >
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <LockOpenRoundedIcon />
              </IconButton>
              <p>SignIn</p>
            </MenuItem>,
            <MenuItem
              onClick={() => {
                window.location.href = 'http://localhost:3000/signup';
              }}
            >
              <IconButton
                aria-label="account of current user"
                aria-controls="primary-search-account-menu"
                aria-haspopup="true"
                color="inherit"
              >
                <PersonOutlineRoundedIcon />
              </IconButton>
              <p>SignUp</p>
            </MenuItem>,
          ]}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          {user.username ? (
            <IconButton
              edge="start"
              className={(classes.menuButton, classes.sectionMobile)}
              color="inherit"
              aria-label="open drawer"
              aria-controls={appmenuId}
              onClick={handleAppMenuOpen}
            >
              <MenuIcon />
            </IconButton>
          ) : (
            <Typography className={classes.sectionMobile} variant="h6" noWrap>
              Liricly
            </Typography>
          )}
          <Typography className={classes.title} variant="h6" noWrap>
            Liricly
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            {localStorage.getItem('user') ? (
              <>
                <Link to="/explore" className={classes.links}>
                  <Typography variant="h6" noWrap>
                    Explore
                  </Typography>
                </Link>
                <Link to="/playlist" className={classes.links} style={{ marginLeft: '20px' }}>
                  <Typography variant="h6" noWrap>
                    Playlist
                  </Typography>
                </Link>
                <IconButton
                  edge="end"
                  aria-label="account of current user"
                  aria-controls={menuId}
                  aria-haspopup="true"
                  onClick={handleProfileMenuOpen}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
              </>
            ) : (
              <>
                <Link to="/" className={classes.links}>
                  <Typography variant="h6" noWrap>
                    SignIn
                  </Typography>
                </Link>
                <Link to="/signup" className={classes.links} style={{ marginLeft: '20px' }}>
                  <Typography variant="h6" noWrap>
                    SignUp
                  </Typography>
                </Link>
              </>
            )}
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
      {renderAppmenu}
    </div>
  );
}
