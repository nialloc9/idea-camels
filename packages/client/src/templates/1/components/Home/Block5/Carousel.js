import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Header } from "../../Header";
import { Block } from "../../Styled/Block";
import {withTheme, remCalc} from '../../../utils/style'
import { EditableText, EditableImage, createImagePreview } from "../../Edit";

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
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
  <Block>
    <EditableImage
        centered
        size={block5.carousel.size}
        src={image.src}
        alt={image.alt}
        editMinHeight={remCalc(400)}
        onSubmit={onSetCarouselImage}
      />
      <Header textAlign={block5.carousel.textAlign}>
        <EditableText maxWidth={remCalc(600)} initialText={header.text} onSubmit={onSetCarouselText} />
      </Header>
    </Block>
))

export default ({ content, onSetExperiment }) => (
  <Slider {...settings}>
    {content.block5.carousel.map(o => <Slide key={o.image.src} {...o} onSetCarouselImage={onSetNewCarouselImage({ carousel: content.block5.carousel, onSetExperiment })} onSetCarouselText={onSetNewCarouselText({ carousel: content.block5.carousel, onSetExperiment })} />)}
  </Slider>
);
