import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid, TextField } from '@mui/material';
import { useState, useEffect } from 'react';
import axios from 'axios';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function Editmodal({open, handleClose, handleOpen, values, setValues}){

    const[avatar, setAvatar]=useState(null);
    const[pics, setPics]=useState([]);
    const[valuesFinal, setValuesFinal]=useState(false);


    //make post request after making sure values is being updated
    useEffect(()=>{
      if(valuesFinal){
        axios.post("http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/users/addData", values,{headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("jwtToken")}`
      }})
        .then(()=>{
           alert("Profile Updated. Please refresh the page to see changes")
        })
        .catch((e)=>{
            alert(e)
        })
      }
    },[valuesFinal])

    const handleSubmit = async(e) => {
     
        e.preventDefault();
        if(avatar!=null){
            const formData = new FormData();
            formData.append('avatar', avatar);
    
            const config = {
              headers: {
                'content-type': 'multipart/form-data',
                Authorization: `${localStorage.getItem("jwtToken")}`
              },
            };
            let res =  await axios.post("http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/users/uploadAvatar", formData, config);
            values.avatar = res.data.s3uri;
        }
        const formDataPics = new FormData();
        if(pics.length>1){
    
            pics.forEach((pic)=>{
                formDataPics.append('pics', pic);
            })
           
            const config = {
              headers: {
                'content-type': 'multipart/form-data',
                Authorization: `${localStorage.getItem("jwtToken")}`
              },
            };
            let res =  await axios.post("http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/users/uploadPics", formDataPics, config);
            //setPics([...pics,res.data.s3uri]);

            setValues({...values, pic1: res.data.s3uri[0],pic2:res.data.s3uri[1]})
        }
      
        setValuesFinal(true);
        handleClose();
    }


    const handleChange = (e) => {
       const { name, value } = e.target;
       setValues({ ...values, [name]: value });
    }

    const handleUpload = (e) => {
       setAvatar(e.target.files[0]);
    }

    const handlePicUpload = (e) => {
        
        setPics([...pics,e.target.files[0]]);
    }
  


    return(
        <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={open}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2"sx={{marginTop:-2, marginBottom:2}}>
              Update Profile:
            </Typography>
            <form onSubmit={handleSubmit}>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sm={6} lg ={6}>
                       <TextField id="outlined-basic" fullWidth sx={{marginBlock: 1}} label="City" variant="outlined"
                        value={values.city}
                        name="city"
                        onChange={handleChange} />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg ={6}>
                       <TextField id="outlined-basic" fullWidth sx={{marginBlock:1}} label="Age" variant="outlined" 
                        value={values.age}
                        name="age"
                        onChange={handleChange}/>
                    </Grid>
                </Grid>
                
                <Typography variant='h7' component="div" sx={{marginBlock:1}}>Enter tags seperated by commas:</Typography>
                <TextField id="outlined-basic" fullWidth sx={{marginBlock: 1}} label="Tags" variant="outlined"
                    value={values.tags}
										name="tags"
										onChange={handleChange}
                />
                 
                <Typography variant='h7' component="div" sx={{marginBlock:1}}>Update Avatar:</Typography>
                <input onChange={handleUpload} type="file" class="form-control" id="avatar"  name="avatar"  />

                <Typography variant='h7' component="div" sx={{marginBlock:1}}>Update pictures:</Typography>

                <Grid container spacing={2}>
                    <Grid item xs={12} md={6} sm={6} lg ={6}>
                        <input type="file" class="form-control" id="image"  name="image"onChange={handlePicUpload}  />
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg ={6}>
                        <input type="file" class="form-control" id="image2"  name="image2" onChange={handlePicUpload} />
                    </Grid>
                </Grid>
                <TextField sx={{marginTop:3}}id="outlined-basic" fullWidth label="Summary" variant="outlined"
                     value={values.summary}
                     name="summary"
                     onChange={handleChange} 
                  />
                <TextField sx={{marginTop:2}}id="outlined-basic" fullWidth label="Regimen" variant="outlined" 
                    value={values.regimen}
										name="regimen"
										onChange={handleChange} />
                


                <Grid container spacing={2} sx={{marginTop:2}}>
                    <Grid item xs={12} md={6} sm={6} lg ={6}>
                         <Button variant='outlined'   fullWidth >Cancel</Button>
                    </Grid>
                    <Grid item xs={12} md={6} sm={6} lg ={6}>
                        <Button variant='contained' type="submit" fullWidth >Save</Button>
                    </Grid>
                </Grid> 
            </form>       
          </Box>
        </Fade>
      </Modal>
    )
}