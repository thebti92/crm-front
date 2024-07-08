import React from "react";
import Slider from "react-slick";

export default function CarouselPromo({ children }) {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 2,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  return (
    <Slider {...settings}>
      {children}
    </Slider>
  );
}
