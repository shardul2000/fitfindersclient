import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import buddy from '../assets/buddy.png';
import { ButtonBase } from '@mui/material';
import '../css/home.css'

export default function Card() {
  return (
    <ButtonBase>
    <MDBCard style={{ width: '15rem', borderRadius:100, margin:2}} className='shadow card'>
      <MDBCardImage src={buddy} alt='...' position='top' />
      <MDBCardBody>
        <MDBCardText>
         Trainers
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
    </ButtonBase>
  );
}