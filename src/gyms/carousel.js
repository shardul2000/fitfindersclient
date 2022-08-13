//https://mdbootstrap.com/docs/b5/react/components/carousel/
import React from 'react';
import {
  MDBCarousel,
  MDBCarouselInner,
  MDBCarouselItem,
  MDBCarouselElement,
} from 'mdb-react-ui-kit';
import gym1 from '../assets/gym1.jpg';
import gym2 from '../assets/gym2.jpg';


export default function Carousel({gym}) {
  return (
    <div className='container' style={{ paddingTop:'5em'}}>
    <MDBCarousel showControls style={{height:'30em'}}>
      <MDBCarouselInner style={{height:'30em'}}>
        <MDBCarouselItem className='active' style={{height:'30em', backgroundColor: 'lightgrey'}}>
          <MDBCarouselElement src={gym.coverImage} alt='...'style={{height:'30em', objectFit:'contain'}} />
        </MDBCarouselItem>
        <MDBCarouselItem style={{height:'30em', backgroundColor: 'lightgrey'}}>
          <MDBCarouselElement src={gym1} alt='...' style={{height:'30em', objectFit:'contain'}}/>
        </MDBCarouselItem>
        <MDBCarouselItem style={{height:'30em', backgroundColor: 'lightgrey'}}>
          <MDBCarouselElement src={gym2} alt='...' style={{height:'30em', objectFit:'contain'}} />
        </MDBCarouselItem>
      </MDBCarouselInner>
    </MDBCarousel>
    </div>
  );
}