import React, {useState, useEffect} from 'react';
import {AppBar, Toolbar, Typography, Avatar, Button} from '@material-ui/core';
import useStyles from './styles';
import memories from '../../images/memories.png';
import {Link, useNavigate,useLocation} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux';
import {LOGOUT} from '../../constants/actionTypes';

import jwtDecode from 'jwt-decode';


const NavBar = () => {
  const location=useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userSelect = useSelector((store) => store.auth.authData);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  const classes = useStyles();
  console.log(userSelect);

  const logout = () => {
    dispatch({type: LOGOUT});
    navigate('/');
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;
    if(token) {
      const decoded=jwtDecode(token);
    if(decoded.exp*1000<new Date().getTime()) logout();

    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);

  return (
    <AppBar className={classes.appBar} position='static' color='inherit'>
      <div className={classes.brandContainer}>
        <Typography
          className={classes.heading}
          component={Link}
          to='/'
          variant='h2'
          align='center'>
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt='memories'
          height='60'
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}>
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.username} variant='h6'>
              {user.result.name}
            </Typography>
            <Button variant='contained' color='secondary' onClick={logout}>
              Log out
            </Button>
          </div>
        ) : (
          <Button
            variant='contained'
            color='primary'
            component={Link}
            to='/auth'>
            Log in{' '}
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;
