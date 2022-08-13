import { Grid, Paper, TextField, Typography,Button } from "@mui/material";
import Carousel from "./carousel";
import bruce from '../assets/pic.jpg';
import AlignItemsList from "./list";
import Footer from "../components/Footer"
import Navbar from "../components/Navbar"
import { useState, useEffect } from "react";
import axios from "axios";
import { useParams, useNavigate} from "react-router-dom";

export default function GymDetails(){

    let navigate = useNavigate();

    const { gym }= useParams();
    const [posts, setPosts]= useState([]);
    const [details, setDetails]= useState({});
    useEffect(()=>{

        let data=[];
        axios.get(`http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/gym/getGymDetails/${gym}`,{headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("jwtToken")}`
        }})
        .then((res)=>{
            data=res.data.details;
            setDetails(data);
        })
        .catch((e)=>{
            console.log("Hey you" +e);

            navigate("/error");
            navigate(0);
        });

        axios.get(`/api/gym/getPosts/${gym}`,{headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("jwtToken")}`
        }})
        .then((res)=>{
            setPosts(res.data.posts.Items);
        })
        .catch((e)=>{
            console.log(e);
        });



    },[])

    const [postValue, setPostValue] = useState("");

    const post =(e) => {
        e.preventDefault();
        try{
            const body = {
                userId: localStorage.getItem("uid"),
                gymName: gym,
                text: postValue
            }
            axios.post("/api/gym/createPost",body,{headers: {
                "Content-Type": "application/json",
                Authorization: `${localStorage.getItem("jwtToken")}`
            }});
            setPostValue("");
            alert("Comment Posted");
        }catch(e){
            alert("Failed to post. Try again")
        }
    }
        
        

    const handleChange = (e) => {
        setPostValue(e.target.value);
    }

    
    return(
        <>
        <Navbar />
         <div className='container'>
           
         <Paper elevation={10} sx={{height:'auto', minHeight:'100em', paddingLeft:5, paddingRight:5, marginBottom:5}} >
            <Typography variant="h4" sx={{paddingTop:5}}>{details.displayName}</Typography>
            <Carousel gym={details} />
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={6} lg={6} >
                   <Grid container spacing={2} sx={{marginTop:5, borderRight:'1px solid black'}} >
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography variant="h6" component="div">City:</Typography>
                            <Typography variant="h6">Address:</Typography>
                            <Typography variant="h6">Rating:</Typography>
                            <Typography variant="h6">Hours Open:</Typography>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6}>
                            <Typography component="div" sx={{marginTop:1}}>{details.city}</Typography>
                            <Typography component="div" sx={{marginTop:1}}>{details.address}</Typography>
                            <Typography component="div" sx={{marginTop:1}}>5</Typography>
                            <Typography component="div" sx={{marginTop:0.3}}>{details.hours}</Typography>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sm={6} md={6} lg={6} sx={{marginTop:5}}>
                   <Typography variant="h6">Description:</Typography>
                   <Typography variant="h8" component="div" sx={{marginTop:2}}>{details.description}</Typography>
                </Grid>
            </Grid>
            <br /> <br />
            <hr />
            <br />
            <Typography variant="h6">Discussions</Typography>
            <br /><br />


            <form onSubmit={post}>
            <Grid container spacing={2} sx={{width: '30rem', marginBottom:6, marginLeft:4}}>
                <Grid item xs={8} sm={8} md={8} lg={8}>
                    <TextField id="outlined-basic" value={postValue}label="Type Something" variant="outlined" fullWidth onChange={handleChange}/>
                </Grid>
                <Grid item xs={4} sm={4} md={4} lg={4} >
                    <Button variant="contained" type="submit" sx={{marginTop:1}}>Post</Button>
                </Grid>      
            </Grid>
            </form>
        
            {
                posts.map((post)=>{
                    return(
                      <AlignItemsList post={post}/>
                    )
                })
            }
          
            
           
            
          </Paper>
        

         </div>
         <Footer />
            
        </>
    );
}