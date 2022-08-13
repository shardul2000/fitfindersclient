import React from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardImage } from 'mdb-react-ui-kit';
import ads from '../assets/ads.png';
import { ButtonBase } from '@mui/material';
import '../css/home.css'

export default function AdvertsCard() {
  return (
    <ButtonBase>
    <MDBCard style={{ width: '15rem', borderRadius:100, margin:2}} className='shadow card'>
      <MDBCardImage src={ads} alt='...' position='top' />
      <MDBCardBody>
        <MDBCardText>
          Advertisements
        </MDBCardText>
      </MDBCardBody>
    </MDBCard>
    </ButtonBase>
  );
}