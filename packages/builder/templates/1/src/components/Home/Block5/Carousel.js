import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { withTheme } from "../../../utils/style";
import { Image } from "../../Image";
import { Header } from "../../Header";

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

export default withTheme(({ theme: { block5 } }) => (
  <Slider {...settings}>
    <div>
      <Image
        centered
        size={block5.carousel.size}
        src={block5.carousel.image1}
      />
      <Header textAlign={block5.carousel.textAlign}>
        Create a landing page in minutes from our predesigned templates
      </Header>
    </div>
    <div>
      <Image
        centered
        size={block5.carousel.size}
        src={block5.carousel.image2}
      />
      <Header textAlign={block5.carousel.textAlign}>
        Register keywords and a budget to drive traffic to your landing page
      </Header>
    </div>
    <div>
      <Image
        centered
        size={block5.carousel.size}
        src={block5.carousel.image3}
      />
      <Header textAlign={block5.carousel.textAlign}>
        Analysis the results and build an email list of interested customers
      </Header>
    </div>
  </Slider>
));
