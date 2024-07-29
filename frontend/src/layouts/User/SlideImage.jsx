import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const SlideImage = () => {
  return (
    <Carousel data-bs-theme="dark" style={{ height: '200px' }}>
    <Carousel.Item>
      <img
        className="d-block w-100"
        src="https://img.ltwebstatic.com/images3_ccc/2024/07/29/04/1722234857ecbe7d34775172f09da8ae41aa587f81_thumbnail_2000x.webp"
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
        src="https://img.ltwebstatic.com/images3_ccc/2024/07/08/d9/17204201252ecdf46dc1460de1f5ebacd6ee208dc1.webp"
        style={{ height: '200px' }}   alt="Third slide"
      />
     
    </Carousel.Item>
  </Carousel>
  );
}

export default SlideImage;
