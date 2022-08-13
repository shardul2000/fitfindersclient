import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import logo from './assets/logo.jpg';
import background from './assets/fitbackb.png';
import buddy from './assets/buddy.png'
import bruce from './assets/Bruce.jpg'
import './css/login.css';
import { Card, CardContent } from '@mui/material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from "jwt-decode";
import { Avatar } from '@mui/material';
import Navbar from "./components/Navbar";
import Footer from "./components/Footer"

export default function FindBuddy() {


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

      var acctlogin = {
        Username : email,
        Password : pwd,
      };



    }

    const clicks = () => { 

    }


  return (
	<>
	<Navbar />
        <div style={{backgroundImage: `url(${background})`, backgroundPosition: 'center', backgroundSize: 'cover', backgroundRepeat: 'no-repeat',height: '1100px'}}>
	&nbsp;
      <div className='container' >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 5,
            display: 'grid',
            //flexDirection: 'column',
            alignItems: 'center',
	    gap: 1,
	    marginBottom:4,
	    //flexWrap:'wrap',
	    gridTemplateColumns: 'repeat(2,1fr)',
	    //gridTemplateRows:'auto',
          }}
        >  
        <Card variant="outlined" className='shadow rounded' sx={{ backgroundColor: '#343434', color: "white"}}>
          <CardContent>
	  <Grid container>
	  <Grid item>
          <div className='flex-container'>
          <img src={buddy} style={{'margin-top':'1em','marginBottom':'2em','width':'70px','height':'70px', textAlign:'center'}} className='shadow rounded'/> 
	        	<h3> Find a Buddy </h3>
	           	<p> Press <b>Match</b> if you're <u>interested</u> or <b> pass </b> if you are <u>not</u> </p>
             </div>
	</Grid>
	<Grid item>
              <div className='container' sx={{}}>
		<Card variant="outlined" className='shadow rounded' sx={{marginTop:5, alignItems:'center', textAlign:'center', width:'100%'}}>
		  <CardContent sx={{mt:0, mb:0}}>
			<img src={bruce} size={320} sx={{mb:5}}/>
			<h2 sx={{size:'10px', mt:'10px'}}>Bruce <sup>19</sup></h2>
			<p>Long walks on the treadmill is where its at.</p>
		</CardContent>  
		</Card>
		</div>
	</Grid>
	<Grid item>     
               		<Button
                 	type="submit"
                	 variant="contained"
                	 onClick={clicks}
			size="large"
			color="success"
                	 sx={{ mt: 5, mb: 1, ml: 1, mr: 1, width:"10%" , height:'45%',}}
              		 >
                 MATCH
               </Button>
		<br/>
		<Button
                 type="submit"
                 variant="contained"
		 size="small"
		color="error"
                 onClick={clicks}
                 sx={{ mt: 1, mb: 1 , ml:1 ,mr: 1, width: "10%", height:"45%",}}
               >
                 pass
               </Button>
	</Grid>
	</Grid> 
               <Typography variant="h6" sx={{color:'red', margin: 2}} aria-live="assertive">{error}</Typography>
               <Grid container>
                 <Grid item xs>
                   <Link href="#" variant="body2">
                     How to use?
                   </Link>
                 </Grid>
                 <Grid item xs>
                   <Link href="/register" variant="body2">
                     report a problem
                   </Link>
                 </Grid>
               </Grid>
           
       
          </CardContent>
        </Card>
       
        </Box>
      </div>
      </div>
	<Footer />
	</>
  );
}

