
import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import Img1 from "../assets/img1.jpg"
import Img2 from "../assets/img2.jpg"
import Img3 from "../assets/img3.gif"

// Sample data for products (you can replace it with your actual data)
const products = [
  { id: 1, name: "Product 1", image: "https://via.placeholder.com/400", price: 10 },
  { id: 2, name: "Product 2", image: "https://via.placeholder.com/400", price: 20 },
  { id: 3, name: "Product 3", image: "https://via.placeholder.com/400", price: 30 },
  { id: 4, name: "Product 4", image: "https://via.placeholder.com/400", price: 40 },
  { id: 5, name: "Product 5", image: "https://via.placeholder.com/400", price: 50 }
];

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1
        }
      }
    ]
  };

  return (
    <Slider {...settings}>
    
    <div>
       <img src={Img1} className="h-full w-full object-cover object-center group-hover:opacity-75" />
    </div>
      
    <div>
                <img
                  src={Img2}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
    </div>

    <div>
                <img
                  src={Img3}
                //  alt={}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
    </div>
    
     
    </Slider>
  );
};

export default Carousel;
