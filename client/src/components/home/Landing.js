import React, { Fragment, useState, useRef } from 'react';
import { Tabs, Tab, AppBar, TextField, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import { fade, makeStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import Home from './Home';
import Current from '../../userShows/Current';
import Future from '../../userShows/Future';
import { logout } from '../../actions/authActions';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const Landing = (props) => {
  const { match, history, logout } = props;
  const { params } = match;
  const { page } = params;

  const tabNameToIndex = {
    0: 'home',
    1: 'current',
    2: 'future',
  };

  const indexToTabName = {
    home: 0,
    current: 1,
    future: 2,
  };

  const [selectedTab, setSelectedTab] = useState(indexToTabName[page]);
  const [filter, setFilter] = useState('How to');
  const [query, setQuery] = useState('How to');

  const handleChange = (event, newValue) => {
    history.push(`/dash/${tabNameToIndex[newValue]}`);
    setSelectedTab(newValue);
  };

  const handleSearchChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = () => {
    setQuery(filter);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    paper: {
      marginRight: theme.spacing(3),
    },
    searchContainer: {
      display: 'flex',
      backgroundColor: fade(theme.palette.common.white, 0.15),
      paddingLeft: '20px',
      paddingRight: '20px',
      marginBottom: '-5px',
      marginLeft: '-350px',
      marginRight: '80px',
    },
    searchIcon: {
      alignSelf: 'flex-end',
      marginBottom: '5px',
    },
    searchInput: {
      width: '300px',
      margin: '5px',
    },
  }));

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    console.log(event.name);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleCloseLogout = (event) => {
    console.log(event.name);
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
    logout();
  };

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  const settingsBar = (
    <Fragment>
      <Button
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        <MenuIcon fontSize="large" />
      </Button>
      <Popper
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === 'bottom' ? 'center top' : 'center bottom',
            }}
          >
            <Paper>
              <ClickAwayListener onClickAway={handleClose}>
                <MenuList keepMounted id="menu-list-grow">
                  <MenuItem
                    variant="menu"
                    className="logout"
                    onClick={handleCloseLogout}
                  >
                    Logout
                  </MenuItem>
                </MenuList>
              </ClickAwayListener>
            </Paper>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );

  return (
    <Fragment>
      <AppBar position="static">
        <Toolbar>
          <div className="settings-div">{settingsBar}</div>

          {selectedTab === 0 && (
            <div className={classes.searchContainer}>
              <SearchIcon
                onClick={handleSubmit}
                className={classes.searchIcon}
              />
              <TextField
                onKeyPress={(ev) => {
                  console.log(`Pressed keyCode ${ev.key}`);
                  if (ev.key === 'Enter') {
                    handleSubmit();
                    ev.preventDefault();
                  }
                }}
                onChange={handleSearchChange}
                className={classes.searchInput}
                label="Search any show or movie!"
                variant="standard"
              />
            </div>
          )}
          <Tabs
            value={selectedTab}
            onChange={handleChange}
            centered
            indicatorColor="secondary"
            textColor="secondary"
          >
            <Tab
              icon={<i className="fas fa-search fa-2x"></i>}
              label="Search"
            />
            <Tab
              icon={<i className="far fa-heart fa-2x"></i>}
              label="Current Shows"
            />
            <Tab
              icon={<i className="fas fa-bookmark fa-2x"></i>}
              label="Future Interests"
            />
          </Tabs>
        </Toolbar>
      </AppBar>
      {selectedTab === 0 && <Home userQuery={query} />}
      {selectedTab === 1 && <Current />}
      {selectedTab === 2 && <Future />}
    </Fragment>
  );
};

Landing.propTypes = {
  logout: PropTypes.func.isRequired,
};

export default connect(null, { logout })(Landing);
