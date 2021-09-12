import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Image } from "../../Image";
import { Header } from "../../Header";
import {withTheme} from '../../../utils/style'
import { EditableText, EditableImage, EditableButton, createImagePreview } from "../../Edit";

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: true,
};

const onSetNewCarouselImage = ({ carousel, onSetExperiment }) => ({ file, index }) => {
  const newCarousel = [...carousel];

  newCarousel[index] = {...carousel[index], image: { src: createImagePreview(file) }};

  onSetExperiment({ content: { block5: { carousel: newCarousel }, imageFiles: { block5: { carousel: {...carousel[index], image: { src: file } } } } } })
}

const onSetNewCarouselText = ({ carousel, onSetExperiment }) => ({ text, index }) => {
  const newCarousel = [...carousel];

  newCarousel[index] = {...carousel[index], header: { text }};

  onSetExperiment({ content: { block5: { carousel: newCarousel }}})
}

const Slide = withTheme(({ image, header, theme: { block5 }, onSetCarouselImage, onSetCarouselText }) => (
  <div style={{textAlign: "center"}}>
      <EditableImage
        centered
        size={block5.carousel.size}
        src={image.src}
        alt={image.alt}
        onSubmit={onSetCarouselImage}
      />
      <Header textAlign={block5.carousel.textAlign}>
        <EditableText initialText={header.text} />
      </Header>
    </div>
))

export default ({ content, onSetExperiment }) => (
  <Slider {...settings}>
    {content.block5.carousel.map(o => <Slide key={o.image.src} {...o} onSetCarouselImage={onSetNewCarouselImage({ carousel: content.block5.carousel, onSetExperiment })} onSetCarouselText={onSetNewCarouselText({ carousel: content.block5.carousel, onSetExperiment })} />)}
  </Slider>
);
