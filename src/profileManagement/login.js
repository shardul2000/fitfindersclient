import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from '../assets/logo.jpg';
import background from '../assets/fitbackb.png';
import '../css/login.css';
import { Card, CardContent } from '@mui/material';
import UserPool from './UserPool'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUser, AuthenticationDetails  } from "amazon-cognito-identity-js";
import jwt_decode from "jwt-decode";

export default function Login() {

  const validate=(email,password)=>{
    if(email==''){
      setEmailE(true);
    }
    if(password==''){
      setPassE(true);
    }

  }

  const[error,setError]= useState('');
  const[emailE, setEmailE]= useState(false);
  const[passwordE, setPassE]= useState(false);

  let navigate = useNavigate();


    const handleSubmit = (event) => {
      setEmailE(false);
      setPassE(false);
      setError('');

      event.preventDefault();
      const data = new FormData(event.currentTarget);

      var email = data.get('Email');
      var pwd = data.get('password');
      
      validate(email, pwd);

      var userData = {
        Username : email,
        Pool : UserPool
      };

      var acctlogin = {
        Username : email,
        Password : pwd,
      };

      var authDet = new AuthenticationDetails(acctlogin);

      var cognitoUser = new CognitoUser(userData); 

      cognitoUser.authenticateUser(authDet, {
        onSuccess: function (result) {
            var idToken=result.idToken.jwtToken;
            console.log(idToken);
            const decoded = jwt_decode(idToken);
            const uid = decoded.sub;
            const CurrentUser={
              fname: decoded.name,
              lname:decoded.family_name,
              email: decoded.email,
              city:decoded.address.formatted,
              gender:decoded.gender
            }
            localStorage.setItem("jwtToken", idToken);
            localStorage.setItem("uid", uid);
            alert(idToken);
            localStorage.setItem("currentUser",JSON.stringify( CurrentUser));
            setError('');
            navigate('/myProfile');
        },

        onFailure: function(err) {
            if(err=="UserNotConfirmedException: User is not confirmed."){
              console.log("Confirm email")
              setError('Please verify your account first!')
            }
            if(err=="NotAuthorizedException: Incorrect username or password."){
              setError('Invalid Credentials!')
              setEmailE(true);
              setPassE(true);
            }
            
            console.log(err);
            
        }

      });


    }

    const clicks = () => { 

    }


  return (
      <div style={{backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',height: '1100px'}}>
	&nbsp;
      <div className='container' >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginBottom:4
          }}
        >  

        <Card variant="outlined" className='shadow rounded'>
          <CardContent>
          <div className='container'>
          
          <img src={logo} style={{'margin-top':'1em','marginBottom':'2em','width':'300px','height':'300px'}} className='shadow rounded'/> 
	        	<h3> Welcome to Fit Finders! </h3>
	           	<p> Please Sign in <b>below</b> </p>
             </div>
             <form onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
              <div className='container'>
             
               <TextField
                 margin="normal"
                 required
                 fullWidth
                 id="Email"
                 label="Email"
                 name="Email"
                 autoFocus
                 error={emailE}
               />
            
               <TextField
                 margin="normal"
                 required
                 fullWidth
                 name="password"
                 label="Password"
                 type="password"
                 id="password"
                 autoComplete="current-password"
                 error={passwordE}
               />
      
              
               <Button
                 type="submit"
                 fullWidth
                 variant="contained"
                 onClick={clicks}
                 sx={{ mt: 3, mb: 2 }}
               >
                 Sign In
               </Button>
               <Typography variant="h6" sx={{color:'red', margin: 2}} aria-live="assertive">{error}</Typography>
               <Grid container>
                 <Grid item xs>
                   <Link href="#" variant="body2">
                     Forgot password?
                   </Link>
                 </Grid>
                 <Grid item xs>
                   <Link href="/register" variant="body2">
                     New User? Click here to Sign Up
                   </Link>
                 </Grid>
               </Grid>
               </div>
             </form>
       
          </CardContent>
        </Card>
       
        </Box>
      </div>
      </div>
  );
}

