import { Fab, Grid, Typography } from "@mui/material";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import ListingCard from "./listingCard";
import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";


export default function GymListings(){

  const [gyms,setGyms] =  useState([]);
  const [city, setCity] = useState('');

  const handleCityChange = (event) => {
    setCity(event.target.value);
  };


  useEffect(() => {
    axios.get("http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/gym/getGymListings")
    .then((res)=>{
        setGyms(res.data.gyms);
    })
    .catch((e)=>{
        console.log("Something went wrong while fetching gyms")
    })
  }, [city]);


    return(
        <>
            <Navbar />
                <div className="container" style={{minHeight:'15em'}}>
                <Grid container spacing={3} sx={{marginTop:4, marginBottom:4}}>
                    <Grid item xs={4} sm={3} md={3} lg={2}>
                         <Typography variant="h6">Filter by Location:</Typography>
                    </Grid>
                    <Grid item xs={8} sm={9} md={9} lg={10} sx={{textAlign:'left'}}>
                        <FormControl sx={{width:'20rem'}}>
                            <InputLabel id="demo-simple-select-label">City</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={city}
                                label="Age"
                                onChange={handleCityChange}
                                >
                                <MenuItem value={''}>--</MenuItem>
                                <MenuItem value={'Toronto'}>Toronto</MenuItem>
                                <MenuItem value={'Halifax'}>Halifax</MenuItem>
                                <MenuItem value={'Montreal'}>Montreal</MenuItem>
                                <MenuItem value={'Vancouver'}>Vancouver</MenuItem>
                            </Select>
                         </FormControl>
                    </Grid>
                </Grid>

                <Grid container spacing={3} sx={{marginTop:4, marginBottom:4}}>
                    {
                       
                        gyms.filter((item)=>{
                          return item.city.includes(city)
                        })
                        .map((element) => {
                            return (
                                <Grid item xs={12} sm={6} md={6} lg={4}>
                                   <Link to={`/gymdetails/${element.name}`}><ListingCard gym={element} /></Link>
                                </Grid>
                            );
                        })		
                    } 
                </Grid>        
                <br />
                <Link to="/gymRegister" variant="body2">   
                    Looking to register your gym? Click here
                </Link>
                <br />
                </div>
            <Footer />
        </>
    );
}