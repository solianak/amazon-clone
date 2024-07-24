import React from 'react'
import LayOut from '../../Componenets/LayOut/LayOut';
import CarouselEffect from "../../Componenets/Carousel/CarouselEffect";
import Category from '../../Componenets/Category/Category';
import Product from '../../Componenets/Product/Product';


const Landing = () => {
  return (
    <LayOut>
      <CarouselEffect />
      <Category />
      <Product />
    </LayOut>
  );
}

export default Landing;
