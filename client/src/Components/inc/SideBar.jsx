import * as React from 'react';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import {Link} from 'react-router-dom';
import AccountBalanceWalletIcon from '@material-ui/icons/AccountBalanceWallet';
import SmsIcon from '@material-ui/icons/Sms';
import InfoIcon from '@material-ui/icons/Info';
import BookIcon from '@material-ui/icons/Book';
import SendIcon from '@material-ui/icons/Send';
import useMediaQuery from '@mui/material/useMediaQuery';

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    }),
  }),
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function PersistentDrawerLeft() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(true);
  const matches = useMediaQuery('(min-width:1023px)'); // Define the breakpoint value as needed
 

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  return (
    <Box  sx={{ display: 'flex', backgroundColor:"#190D3F"}} className="purple-background-nav">
      
      <CssBaseline />

      <AppBar position="absolute" style={{width:"60px", height:"60px", left:"0", top:"150px"}} open={open} className='bg-white text-black'  sx={{ mr: 2, ...(open && { display: 'none' }) }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: 'none' }) }}
           
          >
            <MenuIcon />
          </IconButton>
          
        </Toolbar>
      </AppBar>
      
      
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },

        }}
        variant="persistent"
        anchor="left"
        open={open && matches}
        
      >
        
        <DrawerHeader  style={{backgroundColor:"#190D3F", borderTop:"1px solid white"}} className="purple-background-nav">
            <p className='text-white' style={{fontSize: "18px",margin:"3px 50px 0 0"}}>SMS Tools</p>
          <IconButton onClick={handleDrawerClose} style={{color:"white"}}>
            {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </DrawerHeader>
        <Divider/>

        <List style={{backgroundColor:"#190D3F", color:"white"}} className='itemButton purple-background-nav' >
         
            <ListItem disablePadding>
             
              <ListItemButton component={Link} to="/">
                <ListItemIcon style={{color:"white"}}><AccountBalanceWalletIcon/></ListItemIcon>
                <ListItemText>Fee SMS</ListItemText>
              </ListItemButton>
            
            </ListItem>

           
            <ListItem disablePadding>
            
              <ListItemButton component={Link} to="/generalsms">
                <ListItemIcon style={{color:"white"}}><SmsIcon /></ListItemIcon>
                <ListItemText>General SMS</ListItemText>
              </ListItemButton>
           
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/directmessages">

              <ListItemIcon style={{color:"white"}}><SendIcon /></ListItemIcon>
               <ListItemText>Direct Message</ListItemText>
              </ListItemButton>
            </ListItem>
           
        
        </List>
        <Divider />

        <List  style={{backgroundColor:"#190D3F", color:"white"}} className='itemButton purple-background-nav' >

         <ListItem disablePadding>
           <ListItemButton component={Link} to="/logs">
            
             <ListItemIcon style={{color:"white"}}><BookIcon /></ListItemIcon>
             <ListItemText>Logs</ListItemText>
           </ListItemButton>
         </ListItem>


         <ListItem disablePadding>
           <ListItemButton component={Link} to="/info">
             <ListItemIcon style={{color:"white"}}><InfoIcon /></ListItemIcon>
             <ListItemText>Info</ListItemText>
           </ListItemButton>
         </ListItem>
     
        </List>
        <Divider />

        <div className="purple-background-nav" style={{backgroundColor:"#190D3F", height:"100%"}}></div>
        
      </Drawer>
     
    </Box>
  );
}
