import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Image } from '../../Image';
import { Header } from '../../Header';
import dragAndDrop from "static/dragAndDrop.png"
import keywords from "static/keywords.png"
import results from "static/results.png"

const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true
  };

export default () => (
    <Slider {...settings}>
        <div>
          <Image size="huge" src={dragAndDrop} />
          <Header textAlign="center">Create a landing page in minutes from our predesigned templates</Header>
        </div>
        <div>
         <Image src={keywords} />
         <Header textAlign="center">Register keywords and a budget to drive traffic to your landing page</Header>
        </div>
        <div>
         <Image size="huge" src={results} />
         <Header textAlign="center">Analysis the results and build an email list of interested customers</Header>
        </div>
      </Slider>
    );