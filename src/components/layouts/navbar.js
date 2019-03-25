import React,{Component} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';

import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';




import { Link } from "react-router-dom";
import {connect} from 'react-redux';
import { logoutuser } from "../../actions/authAction";

const drawerWidth = 240;

const styles = theme => ({
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginLeft: 12,
    marginRight: 20,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: '0 8px',
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  bigAvatar: {
    margin: 10,
    width: 150,
    height: 150,
  }
});

class Navbar extends Component {

  constructor(props) {
    super(props);
  }


  state = {
    openside: false,
    anchorEl: null,
  };

  //for sidenav Drawer
  handleDrawerOpen = () => {
    this.setState({ openside: true });
  };

  handleDrawerClose = () => {
    this.setState({ openside: false });
  };

  //for profile log
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  onlogout(e){
    e.preventDefault();
    this.setState({ anchorEl: null });
    this.props.logoutuser();
  }

  onlogin(){
    return <Link to="/login" />
  }


  render() {

    const {isAuthenticated,user} = this.props.auth;
    

   

    //for drawer
    const { classes, theme } = this.props;
    const { openside } = this.state;

    //for profile log
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    const guestlink = (
      <List component="nav">
      <Link to="/login">
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Log In" />
      </ListItem></Link>
      <Link to="/register">
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="Sign up" />
      </ListItem></Link>
    </List>
    )

    
    const authlink = (
      <div>
    <Grid container justify="center" alignItems="center">
      <Avatar alt={user.name} 
       src={require("../../assets/img/home_background.jpeg")}
      className={classes.bigAvatar} />
    </Grid>
      <p style={{textAlign:"center"}}>{user.name}</p>
      <Divider/>
      <List component="nav">
      <Link to="/dashboard">
      <ListItem button>
        <ListItemIcon>
          <InboxIcon />
        </ListItemIcon>
        <ListItemText primary="Dashboard" />
      </ListItem></Link>
      <Link to="/addtask">
      <ListItem button>
        <ListItemIcon>
          <MailIcon />
        </ListItemIcon>
        <ListItemText primary="Add Task" />
      </ListItem></Link>
    </List>
    </div>
    )




    return (
      <div className={classes.root}>
        <CssBaseline />
        <AppBar
          position="sticky"
          className={classNames(classes.appBar, {
            [classes.appBarShift]: openside,
          })}
          style={{background:"black"}}
        >
          <Toolbar disableGutters={!openside}>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={this.handleDrawerOpen}
              className={classNames(classes.menuButton, openside && classes.hide)}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit" noWrap className={classes.grow}>
              Task Manager
            </Typography>

            {isAuthenticated ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={open}
                  onClose={this.handleClose}
                >
                  <MenuItem onClick={this.handleClose}>Profile</MenuItem>
                  <MenuItem onClick={this.onlogout.bind(this)}>Logout</MenuItem>
                </Menu>
              </div>
            ):null}  


          </Toolbar>
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant="persistent"
          anchor="left"
          open={openside}
          classes={{
            paper: classes.drawerPaper,
          }}
        >
          <div className={classes.drawerHeader}>
            <IconButton onClick={this.handleDrawerClose}>
              {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
          </div>
          <Divider />
          {isAuthenticated ? authlink:guestlink}
        </Drawer>
      </div>
    );
  }
}

Navbar.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired,
  logoutuser:PropTypes.func.isRequired,
  auth:PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth:state.auth
});

export default connect(mapStateToProps,{logoutuser})(withStyles(styles, { withTheme: true })(Navbar));
