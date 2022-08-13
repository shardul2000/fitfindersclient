import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import { FormLabel } from '@mui/material';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import sign from '../assets/regAvatar.png';
import '../css/login.css';
import UserPool from './UserPool'; 
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CognitoUserAttribute  } from "amazon-cognito-identity-js";



export default function SignUpForm() {

  let navigate = useNavigate();

  const[FnameE, setFnameE] = useState(false);
  const[LnameE, setLnameE] = useState(false);
  const[passE, setPassE] = useState(false);
  const[cpassE, setCpassE] = useState(false);
  const[cityE, setCityE] = useState(false);
  const[stateE, setStateE] = useState(false);
  const[emailE, setEmailE] = useState(false);
  const[genderE, setGenderE] = useState(false);
  const[gender, setGender] =useState();

  const[errorMessage,setErrorMessage]=useState('');
  
  const validate=(email,password,city,state,fname,lname, gender)=>{
    if(email===''){
      setEmailE(true);
    }
    if(password===''){
      setPassE(true);
    }
    if(city===''){
      setCityE(true);
    }
    if(state===''){
      setStateE(true);
    }
    if(lname===''){
      setLnameE(true);
    }
    if(fname===''){
      setFnameE(true);
    }
    if(gender==null){
      setGenderE(true);
    }
  }
 
  const handleGender=(event)=>{
    setGender(event.target.value);
  }
  const validateSign=()=>{
    if(emailE==false&&passE==false&&LnameE==false&&FnameE==false &&cityE==false&&stateE==false){
      return true;
    }
    return false;
  }
 
  const handleSubmit = (event) => {
    setErrorMessage('');
      setEmailE(false);
      setPassE(false);
      setCityE(false);
      setCpassE(false);
      setFnameE(false);
      setLnameE(false);
      setStateE(false);
      setGenderE(false);
      event.preventDefault();
      const data = new FormData(event.currentTarget);
      var email = data.get('email');
      var password = data.get('password');
      var genders = document.getElementsByName("gender");
      var city= data.get('city');
      var state=data.get('state');
      var fname=data.get('firstName');
      var lname=data.get('lastName');

      validate(email,password,city,state,fname,lname,gender);
      var dataName = {
         Name: 'name', /* required */
         Value: fname
     };
 
    var dataFName = {
       Name: 'family_name', /* required */
       Value: lname
    };

    var dataAddr = {
       Name: 'address', 
       Value: city.concat(",",state)
    };
    
    var dataGender = {
       Name: 'gender',
       Value: gender
    };
    
    var dataEmail = {
	     Name: 'email',
	     Value: email
    };

    var attributeList = [];

    var attrEmail = new CognitoUserAttribute(dataEmail);
    var attrName = new CognitoUserAttribute(dataName);
    var attrFName = new CognitoUserAttribute(dataFName);
    var attrAddr = new CognitoUserAttribute(dataAddr);
    var attrGender = new CognitoUserAttribute(dataGender);

    attributeList.push(attrEmail);
    attributeList.push(attrName);
    attributeList.push(attrFName);
    attributeList.push(attrAddr);
    attributeList.push(attrGender);


   if(fname!=""&&lname!=""&&city!=""&&state!=""&&gender!=null){

        UserPool.signUp(email, password,attributeList, null, (err, result)=>{
         
          if(err){
            if(err.toString().includes("An account with the given email already exists.")){
              console.log(err);
              setErrorMessage(err.toString().substring(25,));
            }
            if(err.toString().includes("InvalidParameterException") || err.toString().includes("InvalidPasswordException")){
              console.log(err);
              setEmailE(true);
              setPassE(true);
              setErrorMessage("Enter a valid Email and/or password. \n(Password must contain a numeric, special character and must be minimum 8 characters long)");
            }
            if(err.toString().includes("SerializationException")){
              setErrorMessage("Enter missing details");
            }
          }else{
            //if no error
            navigate("/login"); 
            alert("Thank you for signing up, please check your email for the verification link.") 
          }     
        });      
      }
  else{//if empty fields
    setErrorMessage("Please enter all fields")  
  }
  
  
   
   
  };

  return (

      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
         <img src={sign} className="avatar" />
          <Typography component="h1" variant="h5">
            Create a New Account
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  error={FnameE}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                  error={LnameE}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="city"
                  label="City"
                  name="city"
                  autoComplete="family-name"
                  error={cityE}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="state"
                  label="State/Province"
                  name="state"
                  autoComplete="family-name"
                  error={stateE}
                />
              </Grid>
              <Grid item xs={12} sm= {6}>
              <FormControl component="fieldset" error={genderE}>
                   <FormLabel component="legend">Gender</FormLabel>
              <RadioGroup
                  name="radio-buttons-group"
                  onChange={handleGender}
              >
                   <FormControlLabel value="male" control={<Radio />} label="Male" />
                   <FormControlLabel value="female" control={<Radio />} label="Female" />
                   <FormControlLabel value="other" control={<Radio />} label="Other" />
               </RadioGroup>
               </FormControl>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  error={emailE}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={passE}
                  
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="confirm password"
                  label="Confirm Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={cpassE}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 3 }}
            >
              Sign Up
            </Button>
            <Grid container >
              <Grid item>
                <Link href="/" variant="body2">
                  Already have an account?  Sign in
                </Link>
              </Grid>
            </Grid>
            <Typography variant="h6" sx={{color:'red', margin: 2}} aria-live="assertive">{errorMessage}</Typography>
          </Box>
        </Box>
      </Container>

  );

}



