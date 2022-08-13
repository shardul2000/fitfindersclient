import React from 'react';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement
} from 'mdb-react-ui-kit';
import '../css/carousel.css';

export default function Carousel({pic1, pic2}) {
  return (
    <MDBCarousel showIndicators showControls fade className='slides' style={{height:'30em'}}>
      <MDBCarouselInner className='slides'  style={{height:'30em'}}>
          <MDBCarouselItem className='active img-fluid'  style={{height:'30em', backgroundColor: 'lightgrey'}}>
            <MDBCarouselElement src={pic1} alt='...'  style={{height:'30em', objectFit:'contain'}}  />       
          </MDBCarouselItem>

          <MDBCarouselItem className='img-fluid'  style={{height:'30em', backgroundColor: 'lightgrey'}}>
            <MDBCarouselElement src={pic2} alt='...'  style={{height:'30em', objectFit:'contain'}}  />       
          </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
  );
}