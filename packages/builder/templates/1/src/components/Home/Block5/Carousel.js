import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Image } from "../../Image";
import { Header } from "../../Header";
import {theme, content} from '../../../config'

const { block5 } = theme;

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const Slide = ({ image, header }) => (
  <div>
      <Image
        centered
        size={block5.carousel.size}
        src={image.src}
        alt={image.alt}
      />
      <Header textAlign={block5.carousel.textAlign}>
        {header.text}
      </Header>
    </div>
)

export default () => (
  <Slider {...settings}>
    {content.block5.carousel.map(o => <Slide key={o.image.src} {...o} />)}
  </Slider>
);
