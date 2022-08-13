import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Badge from '@mui/material/Badge';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MailIcon from '@mui/icons-material/Mail';
import MoreIcon from '@mui/icons-material/MoreVert';
import ExploreIcon from '@mui/icons-material/Explore';
import PersonSearchIcon from '@mui/icons-material/PersonSearch';
import { Link, useNavigate} from 'react-router-dom';
//import Link from '@mui/material/Link';

export default function Navbar() {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const logout = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    localStorage.clear();
    alert("Logging out and redirecting to login page");
    navigate("/login")
  };

  const login = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
    navigate("/login")
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <Link to="/myprofile"><MenuItem onClick={handleMenuClose}>Profile</MenuItem></Link>
      {(localStorage.getItem("uid")===null)
      ?( <MenuItem onClick={login}>Login</MenuItem>)
      :( <MenuItem onClick={logout}>Logout</MenuItem>)}
    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
     <Link to = "/FindBuddy" style={{color:'#FFF'}}>
        <MenuItem style={{color:'#FFF'}}>
          <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <PersonSearchIcon />
          </IconButton>
          Find Buddy
        </MenuItem>
      </Link>
      <Link  to = "/FindBuddy">
        <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
              <ExploreIcon />
          </IconButton>
          <p>Explore Gyms</p>
        </MenuItem>
      </Link>
      <MenuItem>
        <IconButton size="large" aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="error">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  return (
    
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
 		<Link to="/" style={{color:'#FFF'}}>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' } }}
          >
            FitFinders
          </Typography> 
		</Link>     
          <Box sx={{ flexGrow: 1 }} />
         
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>

          <Link to="/gymlistings" style={{color:'#FFF'}}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
               <ExploreIcon />
          </IconButton>  
          </Link>
          <Typography
            variant="h7"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, marginRight:10, marginTop: 1.5}}
          >
           <Link  to="/gymlistings" style={{color:'#FFF'}}> <strong>Explore Gyms</strong></Link>
          </Typography>
          <Link to="/findbuddy" style={{color:'#FFF'}}>
          <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              color="inherit"
            >
               <PersonSearchIcon />
          </IconButton>
          </Link>
          
          <Typography
            variant="h7"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, marginRight:10, marginTop: 1.5 }}
          >
            <Link to="/FindBuddy"  style={{color:'#FFF'}}><strong xs={{color:"white"}}>Find buddy</strong></Link>
          </Typography> 
            <IconButton size="large" aria-label="show 4 new mails" color="inherit" sx={{marginRight:5}}>
              <Badge badgeContent={4} color="error">
                <MailIcon />
              </Badge>
            </IconButton>
            
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
              sx={{marginRight:1}}
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
}
