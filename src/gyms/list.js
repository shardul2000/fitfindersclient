import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Divider from '@mui/material/Divider';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { Grid, Box } from '@mui/material';
import bruce from '../assets/pic.jpg';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';

export default function AlignItemsList({post}) {

   const[userdata, setUserData] = useState({});

  useEffect(()=>{
    axios.get(`http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/users/getUserData/${post.userId}`,{headers: {
      "Content-Type": "application/json",
      Authorization: `${localStorage.getItem("jwtToken")}`
  }})
    .then((res)=>{
        setUserData(res.data.userData);
    })
    .catch((e)=>{
        console.log("Something went wrong while fetching gyms")
    })
  },[])

  return (
    <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
      <Divider variant="inset" component="li" />
      <ListItem alignItems="flex-start">
            <Grid container spacing={3}>
                <Grid item xs={4} sm={4} md={3} lg={2}>
                    <ListItemAvatar>
                       <Avatar alt="Cindy Baker" src={userdata.avatar}sx={{width:'8rem', height:'8rem'}} />
                    </ListItemAvatar>
                </Grid>
                <Grid item xs={8} sm={8} md={9} lg={10}>
             
                    <Link to={`/profile/${userdata.userId}`}><ListItemText
                        primary={userdata.fname + " " + userdata.lname}
                        secondary={
                        <React.Fragment>
                         <br/>
                           
                        {post.text}
                        </React.Fragment>
                    }
                    />
                    </Link>
                    
                </Grid>
            </Grid>
      </ListItem>
    </List>
  );
}
