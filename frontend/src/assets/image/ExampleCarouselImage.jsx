import React from 'react';
import a from '../image/a.webp'; 
import s from '../image/s.webp'; 
import w from '../image/w.webp'; 

const ExampleCarouselImage = ({ text }) => (
  <div>
    <img src={a} alt={text} style={{ height: '200px' }}/>
    <img src={s} alt={text} style={{ height: '200px' }}/>
    <img src={w} alt={text} style={{ height: '200px' }}/>

  </div>
);

export default ExampleCarouselImage;