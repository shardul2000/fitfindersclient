import { Paper, Avatar, Typography, Grid, Card, CardContent,Rating, Chip,TextField,Button,ListItem,List} from "@mui/material";
import { useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FavoriteIcon from '@mui/icons-material/Favorite';
import EmailIcon from '@mui/icons-material/Email';
import { IconButton } from '@mui/material';
import Carousel from "../components/carousel";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Reviews from "../components/viewReviews";

export default function Profile(){


    const { id }= useParams();
    let navigate = useNavigate();

    const [values, setValues] = useState({});
    const [tags, setTags] = useState([]);
    const [rating, setRating] = useState(1);
    const [review, setReview] = useState("");
    const [reviewsList, setReviewsList] =useState([]);

    useEffect(()=>{
        const asyncFunc = async()=>{
            try{
                const data = await axios.get(`http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/users/getUserData/${id}`,{headers: {
                   "Content-Type": "application/json",
                   Authorization: `${localStorage.getItem("jwtToken")}`
               }});
               setValues(data.data.userData); 
               const map=data.data.userData.tags.split(",");       
               setTags(map);       
             
            }catch(e){
                 navigate("/error");
                 navigate(0);
            }
        }
       asyncFunc(); 
       
       axios.get(`http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/profile/getReviews/${id}`,{headers: {
        "Content-Type": "application/json",
        Authorization: `${localStorage.getItem("jwtToken")}`
       }})
       .then((res)=>{
           setReviewsList(res.data.reviews);
       })
       .catch((e)=>{
           console.log("Error "+e)
       });
    },[]);


    const postReview = async(e) => {
        e.preventDefault();
        const reviewerId=localStorage.getItem("uid");
        const entry = {
            reviewerId:reviewerId,
            userId:id,
            review:review,
            rating:rating
        }
        
        axios.post('http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/profile/postReview',entry,{headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("jwtToken")}`
        }})
        .then((res)=>{
          alert("Review posted. Please refresh the page to see the changes");
        })
        .catch((e)=>{
           alert("Something went wrong, check back later \n");
        })

    }


    return(
        <div>
        <Navbar />
        <div className='container'>
            <Paper elevation={10} sx={{height:'auto', minHeight:'100em', marginTop:10, paddingBlock:3, paddingRight:2,paddingLeft:2, marginBottom:4}} >
                <div className="container">

                  <Grid container spacing={3} alignItems="center" justifyContent="center" direction='column'>
                    <Avatar
                         className="shadow"
                         alt="Remy Sharp"
                         src = {values.avatar} 
                         sx={{height:'9em', width:'9em', marginBlock:4}}
                    />
                    <Typography variant="h4" component='div'>{values.fname + " " + values.lname}</Typography>
                    <Grid item>
                        <Button variant="outlined" sx={{marginRight:2}}>  <IconButton><FavoriteIcon /></IconButton>Send Like</Button>
                        <Button variant="contained" sx={{marginRight:2}}> <IconButton><EmailIcon sx={{color:'white'}} /></IconButton>Message</Button>
                    </Grid>
                   
                  </Grid> 
                  <Grid container>
                    <br /> <br /> <br />
                  </Grid>

                  <Grid container spacing={3}>
                    <Grid item xs={12}sm={6} md={6} >
                        <Card className="shadow rounded" sx={{ marginBottom:4}}>
                            <CardContent>
                                <div className="container">
                                    <Typography variant="h5" component='div'sx={{margin:5}}><strong>Summary</strong></Typography>
                                    <Typography variant="h7" component='div'sx={{margin:3}}>{values.summary}</Typography>
                                    { 
                                        tags.map((e)=>(
                                            <Chip label={e} sx={{margin:1}}/>
                                        ))
                                    }         
                                </div>
                                <Typography variant="h6" component='div'sx={{margin:5}}>Workout Regime:</Typography>
                                <Typography variant="h7" component='div'sx={{margin:3}}>{values.regimen}</Typography>
                            </CardContent>
                        </Card>
                        { 
                           values.pic1===''&&values.pic2===''? <Carousel  pic1={'/placeholder.png'} pic2={'/placeholder.png'} />: <Carousel pic1={values.pic1} pic2={values.pic2} />
                        }
                    </Grid>
                    <Grid item xs={12}sm={6} md={6} alignItems="center" justifyContent="center" direction='column'>
                        <Card  className="shadow rounded">
                            <CardContent>
                            <Grid item>
                            <Typography variant="h5" component='div' sx={{margin:5}}>Reviews</Typography>
                            </Grid>
                            <form onSubmit={postReview}>
                            <Grid item>
                                <Rating
                                   name="simple-controlled"
                                   sx={{marginBottom: 1}}
                                   value={rating}
                                   onChange={(event, newValue) => {
                                    setRating(newValue);
                                  }}
                                />         
                             </Grid>
                            <Grid item>
                               <TextField id="outlined-basic" label="Leave a Review" variant="outlined"sx={{margin:2}} onChange={(e)=>setReview(e.target.value)} />
                            </Grid>
                            <Grid item>
                               <Button variant="contained"sx={{margin:2}} type = 'submit'>Submit</Button>
                            </Grid>  
                            </form>                  
                            <hr />  
                            {
                                  reviewsList.map((review)=>(
                                    <Reviews review={review} />
                                  ))
                            } 
                           
                            </CardContent>
                        </Card>
                     </Grid>
                  </Grid>
                </div>
            </Paper> 
        </div>
        <Footer />
        </div>
    )
}

