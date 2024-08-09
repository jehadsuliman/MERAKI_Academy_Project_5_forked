import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const SlideImage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: '200px', paddingTop:'175px' }}>
 <img 
        src="https://img.ltwebstatic.com/images3_ccc/2024/07/29/3a/1722235135a53e3980e7f549325a5e08c0cc518169_thumbnail_432x.webp" 
        alt="image"
        style={{ height: '200px', width: '250px' , paddingRight:'20px'}} 
      />
    <Carousel data-bs-theme="dark" style={{ height: '200px' , width:'500px'}}>
    <Carousel.Item>
      <img
        className="https://img.ltwebstatic.com/images3_ccc/2024/07/29/72/1722234605775a63934bfc819a101f42f55240c700_thumbnail_2000x.webp"
        alt="First slide"
        style={{ height: '250px' }} />
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://img.ltwebstatic.com/images3_ccc/2024/07/08/d9/17204201252ecdf46dc1460de1f5ebacd6ee208dc1.webp"
        alt="Second slide"
        style={{ height: '200px' }} />
     
    </Carousel.Item>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://img.ltwebstatic.com/images3_ccc/2024/07/29/22/17222347766ec2d4467bec7bb2db3ac4784f126228_thumbnail_2000x.webp"
        style={{ height: '200px' }}   alt="Third slide"
      />
     
    </Carousel.Item>
  </Carousel>
  <img 
        src="https://img.ltwebstatic.com/images3_ccc/2024/07/01/ff/171981684160dd83acd172fcd0ba12de2fe880d549.webp" 
        alt="image"
        style={{ height: '200px', width: '250px' , paddingLeft:'20px' }} 
      />
      </div>
  );
}

export default SlideImage;
