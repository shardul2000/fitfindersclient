import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import gym from '../assets/gym.png';
import { ButtonBase } from '@mui/material';
import '../css/home.css'

export default function GymCard() {
  return (
    <ButtonBase>
    <MDBCard style={{ width: '15rem', borderRadius:100, margin:2}} className='shadow card'>
      <MDBCardImage src={gym} alt='...' position='top' />
      <MDBCardBody>
        <MDBCardText>
         Find Gyms
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
    </ButtonBase>
  );
}