import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import * as React from 'react';
import GymForm from "./gymForm"

export default function GymRegister(){

  const [age, setAge] = React.useState('');

  const handleChange = (event) => {
    setAge(event.target.value);
  };


    return(
        <>
          <Navbar />
              <div className="container">        
                  <GymForm />       
              </div>
          <Footer />
        </>
    );
}
