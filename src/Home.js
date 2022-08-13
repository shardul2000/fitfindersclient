import { Typography,Grid,ButtonBase,Box } from "@mui/material";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import background from './assets/Mathing.png';
import './css/home.css';
import Card from "./components/card";
import GymCard from "./components/gymcard";
import BuddyCard from "./components/buddycard";
import { Container } from "@mui/system";
import { Link } from "react-router-dom";
import AdvertsCard from "./components/advertsCard";
import Bot from "./components/chatbot"; 


export default function Home(){
    return(
        <div>
            <Navbar /> 
             
            <Container>
             <Grid container sx={{marginTop:3, marginBottom:3}}>
                <Grid item xs={12} sm={6} md={6} lg={6} sx={{minHeight:850}}>
                    
                    <Grid container spacing={3}>
                         <Grid item xs={12} sm ={12} md={6}>
                            <Link to="gymlistings">
                               <GymCard />
                            </Link>
                        </Grid>
                        <Grid item xs={12} sm ={12} md={6}>
                            <Link to="findbuddy">
                             <BuddyCard />
                             </Link>
                        </Grid>
                        <Grid item xs={12} sm ={12} md={6}>
                             <Card />
                        </Grid>
                        <Grid item xs={12} sm ={12} md={6}>
                             <AdvertsCard />
                        </Grid>
                    </Grid>
                        
                   
                    
                </Grid>
                <Grid item xs={false} sm={6} md={6} lg={6} sx={{
                     backgroundImage: `url(${background})`,
                     alignItems: 'center',
                     justifyContent: 'center',
                     backgroundRepeat: 'no-repeat', 
                     backgroundPosition: 'center'
                   }}>    
                </Grid>
            </Grid>
            <Bot />

           
         
            </Container>
       
            <Footer />

        </div>
    );
}