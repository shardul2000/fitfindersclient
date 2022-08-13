import * as React from 'react';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import background from '../assets/signup.png';
import '../css/login.css';
import SignUpForm from './signupform';


export default function SignInSide() {
 
  return (
      <Grid container component="main" sx={{ height: '100vh' }}> 
        <Grid
          item
          xs={false}
          sm={4}
          md={6}
          lg={8}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat', 
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={6} lg={4} component={Paper} elevation={6} square>
            <SignUpForm />       
        </Grid>
      </Grid>
  );
}