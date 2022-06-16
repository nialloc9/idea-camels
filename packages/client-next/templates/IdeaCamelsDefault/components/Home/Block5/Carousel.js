import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { Header } from "../../Header";
import { Block } from "../../Styled/Block";
import { withTheme, remCalc } from "../../../../../utils/style";
import { EditableText, EditableImage } from "../../Edit";

const settings = {
  dots: true,
  infinite: true,
  speed: 1000,
  slidesToShow: 1,
  slidesToScroll: 1,
  autoplay: false,
};

const onSetNewCarouselImage = ({ carousel, onSetExperiment }) => ({
  url,
  index,
}) => {
  const newCarousel = [...carousel];

  newCarousel[index] = {
    ...carousel[index],
    image: { src: url },
  };

  onSetExperiment({
    content: {
      block5: { carousel: newCarousel },
      imageFiles: {
        block5: { carousel: { ...carousel[index], image: { src: url } } },
      },
    },
  });
};

const onSetNewCarouselText = ({ carousel, onSetExperiment }) => ({
  text,
  index,
}) => {
  const newCarousel = [...carousel];

  newCarousel[index] = { ...carousel[index], header: { text } };

  onSetExperiment({ content: { block5: { carousel: newCarousel } } });
};

const Slide = withTheme(
  ({
    index,
    image,
    header,
    theme: { block5 },
    onSetCarouselImage,
    onSetCarouselText,
  }) => (
    <Block>
      <EditableImage
        centered
        size={block5.carousel.size}
        src={image.src}
        alt={image.alt}
        action="template-edit-carousel-click"
        label={`image-${index}`}
        editMinHeight={remCalc(400)}
        onSubmit={onSetCarouselImage}
      />
      <Header textAlign={block5.carousel.textAlign}>
        <EditableText
          maxWidth={remCalc(600)}
          initialText={header.text}
          action="template-edit-carousel-click"
          label={`header-${index}`}
          onSubmit={onSetCarouselText}
        />
      </Header>
    </Block>
  )
);

export default ({ content, onSetExperiment }) => (
  <Slider {...settings}>
    {content.block5.carousel.map((o, i) => (
      <Slide
        key={o.image.src}
        index={i}
        {...o}
        onSetCarouselImage={onSetNewCarouselImage({
          carousel: content.block5.carousel,
          onSetExperiment,
        })}
        onSetCarouselText={onSetNewCarouselText({
          carousel: content.block5.carousel,
          onSetExperiment,
        })}
      />
    ))}
  </Slider>
);
