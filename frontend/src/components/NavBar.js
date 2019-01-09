import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
// import Cookies from 'js-cookie';
import { Link, Redirect } from "react-router-dom";

import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import Button from '@material-ui/core/Button';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import Description from '@material-ui/icons/Description';
import FormatListBulleted from '@material-ui/icons/FormatListBulleted';
import Group from '@material-ui/icons/Group';
import CheckCircle from '@material-ui/icons/CheckCircle';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NoteAdd from '@material-ui/icons/NoteAdd';
import EditLocation from '@material-ui/icons/EditLocation';
import classNames from 'classnames';
import blue from '@material-ui/core/colors/blue';


import Auth from '../function/Auth';
const styles = {
  root: {
	// flexGrow: 1,
	height:48
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  list: {
    width: 250,
  },
  fullList: {
    width: 'auto',
  },
  icon: {
    '&:hover': {
      color: blue[800],
    },
  },
};

class NavBar extends React.Component {
//   state = {auth:false,anchorEl:null};
	constructor(props){
      super(props);
      this.state={ 
        anchorEl: null,
        auth: false,
        triggerLogout:false,
        top: false,
        left: false,
        bottom: false,
        right: false,
	  };
	  
  }
  componentDidMount(){
	this.authCheck();
	// if(typeof this.props.isLogin != 'undefined'){
	// 	if(this.props.isLogin){
	// 		this.setState({
	// 			auth:true
	// 		})
	// 	} else {
	// 		this.setState({
	// 			auth:false
	// 		})
	// 	}
		
	// } 
  }
  authCheck = () => {
	//   console.log("masuk auth chek");
    let test;
    try {
		// test = typeof Cookies.get('login');
	test = Auth.isLogin();
	//  test = Cookies.get('login');
	}catch(err){
	//  test=false;
	}
	if(typeof test != 'undefined'){
		this.setState({
			auth:true
		});
	} else {
		this.setState({
			auth:false
		});
	} 
	
  }
  handleChange = event => {
    this.setState({ auth: event.target.checked });
  };

  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };
  handleLogout = () => {
    this.handleClose();
    // Cookies.remove('name',{path:'/'});
    // Cookies.remove('login',{path:'/'});
    // Cookies.remove('token',{path:'/'});
    // Cookies.remove('role',{path:'/'});
    Auth.setLogout();
    this.setState({
      triggerLogout: true
    },() => {
      window.location.href='/';
    }
    );
    
	// this.forceUpdate();

}
toggleDrawer = (side, open) => () => {
  this.setState({
    [side]: open,
  });
};
  render() {
    const { classes } = this.props;
    const { auth, anchorEl } = this.state;
    const open = Boolean(anchorEl);


    const sideList = (
      <div className={classes.list}>
        <List>
            <Link to="/laporan">
              <ListItem button>
                {/* <ListItemIcon><Description className={classes.icon} /></ListItemIcon> */}
                <ListItemText primary="Laporan" />
              </ListItem>
            </Link>
            <Link to="/cashier">
              <ListItem button>
                {/* <ListItemIcon><FormatListBulleted className={classes.icon} /></ListItemIcon> */}
                <ListItemText primary="Kasir" />
              </ListItem>  
            </Link>
            <Link to="/supplier">
              <ListItem button>
                {/* <ListItemIcon><FormatListBulleted className={classes.icon} /></ListItemIcon> */}
                <ListItemText primary="Supplier" />
              </ListItem>  
            </Link> 
            <Link to="/barang">
              <ListItem button>
                {/* <ListItemIcon><FormatListBulleted className={classes.icon} /></ListItemIcon> */}
                <ListItemText primary="Barang" />
              </ListItem>  
            </Link>   
        </List>
        <Divider />
    </div>
  );

    return (
      <div>
        <AppBar className='navbar'>
          <Toolbar>
            <IconButton onClick={this.toggleDrawer('left', true)} className={classes.menuButton} color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            
              <Typography variant="h6" color="inherit" className={classes.grow}>
                <Link to="/">
                  {/* <img src='/img/tondan-light-text.png'alt='tondan-logo' style={{height:'32px', marginTop:'8px'}}/> */}
                  Point of Sales
                </Link>
              </Typography>
            
            {Auth.isLogin() && window.matchMedia("(min-width: 500px)").matches &&(
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : undefined}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="inherit"
                >
                  <Typography variant="h6" color="inherit" className={classes.grow}>
				{Auth.getUserData().name}
            </Typography>
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
                  <MenuItem onClick={this.handleClose}><Link to="/profile">Profile</Link></MenuItem>
                  <MenuItem onClick={this.handleLogout}>Logout</MenuItem>
                </Menu>
              </div>
            )}
            {!Auth.isLogin() && (<div>
				<IconButton
				aria-owns={open ? 'menu-appbar' : undefined}
				aria-haspopup="true"
				onClick={this.handleMenu}
				color="inherit"
			  >
				{/* <AccountCircle /> */}
				<Typography variant="h6" color="inherit" className={classes.grow}>
				Login/Register
            </Typography>
				
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
				<MenuItem onClick={this.handleClose}><Link to="/signin">Login</Link></MenuItem>
				<MenuItem onClick={this.handleClose}><Link to="/register">Register</Link></MenuItem>
			  </Menu>
			</div>
            )}
          </Toolbar>
        </AppBar>        
        <SwipeableDrawer
        anchor="left"
          open={this.state.left}
          onClose={this.toggleDrawer('left', false)}
          onOpen={this.toggleDrawer('left', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('left', false)}
            onKeyDown={this.toggleDrawer('left', false)}
          >
            {sideList}
          </div>
        </SwipeableDrawer>
        {/* <SwipeableDrawer
          anchor="top"
          open={this.state.top}
          onClose={this.toggleDrawer('top', false)}
          onOpen={this.toggleDrawer('top', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('top', false)}
            onKeyDown={this.toggleDrawer('top', false)}
          >

          </div>
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor="bottom"
          open={this.state.bottom}
          onClose={this.toggleDrawer('bottom', false)}
          onOpen={this.toggleDrawer('bottom', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('bottom', false)}
            onKeyDown={this.toggleDrawer('bottom', false)}
          >

          </div>
        </SwipeableDrawer>
        <SwipeableDrawer
          anchor="right"
          open={this.state.right}
          onClose={this.toggleDrawer('right', false)}
          onOpen={this.toggleDrawer('right', true)}
        >
          <div
            tabIndex={0}
            role="button"
            onClick={this.toggleDrawer('right', false)}
            onKeyDown={this.toggleDrawer('right', false)}
          > */}
            {/* {sideList}
          </div>
        </SwipeableDrawer> */}
      </div>
    );
  }
}
NavBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NavBar);