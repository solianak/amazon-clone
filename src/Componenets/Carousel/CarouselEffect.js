import React from 'react'
import classes from "./Carousel.module.css";
import { Carousel } from "react-responsive-carousel";
import { imgArray } from "./img/data";

import "react-responsive-carousel/lib/styles/carousel.min.css";

const CarouselEffect = () => {
  return (
    <div>
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
        {imgArray.map((imageItemLink, index) => (
          <div key={index}>
            <img src={imageItemLink} alt={`Image ${index}`} />
          </div>
        ))}
      </Carousel>
      <div className={classes.hero_img}></div>
    </div>
  );
};

export default CarouselEffect;