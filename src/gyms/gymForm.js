import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import sign from '../assets/regAvatar.png';
import '../css/login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from 'axios';

const validationSchema=Yup.object({
      displayName: Yup.string()
              .required()
              .min(2),
      city: Yup.string()
              .min(2,"Name must have atleast 2 alphabets")
              .required(),
      state: Yup.string()
               .min(2,"Name must have atleast 2 alphabets")
               .required(),
      email: Yup.string().email()
            .typeError("Enter a valid email")
            .required(),    
      description: Yup.string()
                .required()
                .min(10,"Enter atleast 10 characters"),
      address: Yup.string()
                  .required(),
      hours: Yup.string().required()
});

export default function GymForm() {

  let navigate = useNavigate();
  const [ coverIsUploaded, setCoverIsUploaded ] = useState(false);
  const [ error, setError ] = useState("");
  const [ coverImage, setCoverImage ] = useState(null);

  const formik = useFormik({
    initialValues: {
      address: '',
      city:'',
      state:'',
      description:'',
      email:'',
      hours:'',
      rating: '',
      displayName:'',
      coverImage:''
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
        if(coverImage!=null){
            const formData = new FormData();
            formData.append('avatar', coverImage);

            const config = {
              headers: {
                'content-type': 'multipart/form-data',
                Authorization: `${localStorage.getItem("jwtToken")}`
              },
            };
            axios.post("http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/users/uploadAvatar", formData, config)
            .then((res)=>{
                values.coverImage = res.data.s3uri;
                console.log(res.data.s3uri);
                values.name = values.displayName.replaceAll(/\s/g,'') + values.city;
                return values;
            })
            .then((data)=>{
              axios.post('http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/gym/createGymListing',data,{headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("jwtToken")}`
            }})
              .then((res)=>{
                  alert("Thank you, our team will verify the details");
                  navigate("/gymlistings")
              })
              .catch((e)=>{
                  console.log("Error:  " + e);
                 alert("Something went wrong. Try later")
              })
            })
            .catch((e)=>{
              console.log(e);
              alert(e);
            })
           
        }
        
    }
  });
 
  const validate = (event) => {
    if(coverIsUploaded==false){
      setError("Please upload a cover image")  
    }
    else{
      setError("");
    }
  };

  const handleUpload = (e) => {
      setCoverIsUploaded(true);
      setCoverImage(e.target.files[0]);
  }
  

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
            Register Your Gym
          </Typography>
          <Box component="form" noValidate onSubmit={formik.handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="displayName"
                  required
                  fullWidth
                  id="displayName"
                  label="Gym Name"
                  autoFocus
                  onChange={formik.handleChange}
                  error={formik.touched.displayName && Boolean(formik.errors.displayName)}
                  helperText={formik.touched.displayName && formik.errors.displayName}
        
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
                  onChange={formik.handleChange}
                  error={formik.touched.city && Boolean(formik.errors.city)}
                  helperText={formik.touched.city && formik.errors.city}
       
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
                  onChange={formik.handleChange}
                  error={formik.touched.state && Boolean(formik.errors.state)}
                  helperText={formik.touched.state && formik.errors.state}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="address"
                  label="Address"
                  name="address"
                  autoComplete="family-name"
                  onChange={formik.handleChange}
                  error={formik.touched.address && Boolean(formik.errors.address)}
                  helperText={formik.touched.address && formik.errors.address}
                />
              </Grid>
              <Grid item xs={12} sx={{marginBottom:2.5}} >
                  <Typography variant='h7' component="div" sx={{marginBlock:1}}>Upload a pic:</Typography>
                  <input onChange={handleUpload} type="file" class="form-control" id="avatar"  name="avatar"  />
                  <Typography variant='h7' component="div" sx={{marginBlock:1, color:'red'}}>{error}</Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Gym's Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={formik.handleChange}
                  error={formik.touched.email && Boolean(formik.errors.email)}
                  helperText={formik.touched.email && formik.errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="hours"
                  label="Hours"
                  name="hours"
                  autoComplete="hours"
                  onChange={formik.handleChange}
                  error={formik.touched.hours && Boolean(formik.errors.hours)}
                  helperText={formik.touched.hours && formik.errors.hours}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Description"
                  name="description"
                  autoComplete="Description"             
                  onChange={formik.handleChange}
                  error={formik.touched.description && Boolean(formik.errors.description)}
                  helperText={formik.touched.description && formik.errors.description}
                />
              </Grid>
              
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 5, mb: 3 }}
              onClick={validate}
            >
              Register the Gym
            </Button>
            <Grid container >
              <Grid item>
                <Link href="/gymListings" variant="body2">
                  Is your gym already registered?  Click here to see managed gyms
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>

  );

}



