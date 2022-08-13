import {  Typography} from "@mui/material";
import {  useEffect} from "react";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import { useNavigate } from "react-router-dom";

export default function ErrorPage(){

    let navigate = useNavigate();
   
    useEffect(() => {
       
        setTimeout(() => {
          navigate('/login')
        }, 5000)
    }, [])
    
    return(
        <div>
            <Navbar />
                <div className='container' style={{minHeight: '30em'}}>
                    <Typography variant="h5" sx={{marginTop:12}}>You are not Authorised to access this page</Typography>
                    <Typography variant="h7">Redirecting to login page in 5 seconds..</Typography>
                </div>
            <Footer />
        </div>
    );
}

