import { Paper, Avatar, Typography, Grid, Card, CardContent,Rating, Chip,TextField,Button,ListItem,List, getAccordionDetailsUtilityClass} from "@mui/material";
import { useState, useEffect} from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { IconButton } from '@mui/material';
import Carousel from "../components/carousel";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import EditIcon from '@mui/icons-material/Edit';
import Editmodal from "./modals/editModal";
import Reviews from "../components/viewReviews";

export default function MyProfile(){

    let currUser={
        email:'',
        gender:'',
        fname:'',
        lname:'',
        city:''
    }
    let userId= localStorage.getItem("uid");
    currUser=JSON.stringify(currUser);


    if(localStorage.getItem("currentUser")!=null){
         currUser= localStorage.getItem("currentUser");
    }
   
  
    let navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);
    const handleOpen = () => setOpen(true);
    const [reviewsList, setReviewsList] =useState([]);


    const [values, setValues] = useState({
        userId: userId,
        city: '',
        age:'',
        tags: '',
        summary:'',
        regimen:'',
        avatar:'',
        pic1:'',
        pic2:'',
        email: JSON.parse(currUser).email,
        gender:JSON.parse(currUser).gender,
        fname: JSON.parse(currUser).fname,
        lname: JSON.parse(currUser).lname
    });

  //  const [values, setValues] = useState({avatar:''})
    const[error,setError]= useState(false);
    const [tags, setTags] = useState([]);
    useEffect(()=>{
       
        axios.get(`http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/users/getUserData/${localStorage.getItem("uid")}`,{headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("jwtToken")}`
        }})
        .then((res)=>{
            setValues(res.data.userData);
            const map=res.data.userData.tags.split(",");       
            setTags(map); 
        }) 
        .catch((e)=>{
            setError(true);
            navigate("/error");
            navigate(0);
        })

        
    },[])

    useEffect(()=>{
        axios.get(`http://fatback-env-1.eba-q5mmqtxi.us-east-1.elasticbeanstalk.com/api/profile/getReviews/${localStorage.getItem("uid")}`,{headers: {
            "Content-Type": "application/json",
            Authorization: `${localStorage.getItem("jwtToken")}`
        }})
        .then((res)=>{
            setReviewsList(res.data.reviews);
        })
        .catch((e)=>{
            console.log("Error "+e)
        });
    },[])


    return(

        !error?(
        <div>
        <Navbar />
        <Editmodal open={open} handleClose={handleClose} handleOpen={handleOpen} values={values} setValues={setValues}/>
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
                    <Typography variant="h4" component='div'>{values.fname +" "+values.lname}</Typography>
                    <Grid item>
                     
                        <Button onClick={handleOpen} variant="contained" sx={{marginRight:2}}> <IconButton><EditIcon sx={{color:'white'}} /></IconButton> Edit Profile</Button>
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
                           values.pic1===''&&values.pic2===''? <Carousel pic1={'/placeholder.png'} pic2={'/placeholder.png'} />: <Carousel pic1={values.pic1} pic2={values.pic2} />
                        }
                    </Grid>
                    <Grid item xs={12}sm={6} md={6} alignItems="center" justifyContent="center" direction='column'>
                        <Card  className="shadow rounded">
                            <CardContent>
                            <Grid item>
                               <Typography variant="h5" component='div' sx={{margin:5}}>Your Reviews</Typography>
                            </Grid>           
                                <hr />  
                                { 
                                    reviewsList.length==0?(<Typography variant="h7">No reviews yet</Typography>)
                                    :reviewsList.map((review)=>(
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
        </div>):(<></>)
    )
}
