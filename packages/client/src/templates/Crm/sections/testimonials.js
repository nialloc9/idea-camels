/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Container } from "theme-ui";
import Slider from "react-slick";
import Testimonial from "../components/cards/testimonial";
import { addValueToArray } from "../../common/utils";

const settings = {
  arrows: false,
  dots: true,
  speed: 500,
  slidesToShow: 2,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 769,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

const Testimonials = ({ content, onSetContent }) => {
  return (
    <section id="testimonials" sx={styles.section}>
      <Container>
        <Slider sx={styles.slider} {...settings}>
          {content.testimonials.authors.map((testimonial, index) => (
            <Testimonial
              key={`${index}-${testimonial.authorName}`}
              data={testimonial}
              index={index}
              onEdit={(value) =>
                onSetContent({
                  testimonials: {
                    authors: addValueToArray(
                      content.testimonials.authors,
                      value,
                      index
                    ),
                  },
                })
              }
            />
          ))}
        </Slider>
      </Container>
    </section>
  );
};

export default Testimonials;

const styles = {
  section: {
    pt: [12, null, null, null, 10, 14],
    pb: [8, null, null, null, 10, 14],
  },
  slider: {
    ".slick-list": {
      // mx: [null, null, null, null, -2, 0],
    },
    ".slick-slide": {
      // mr: [null, null, null, null, 4, 0],
    },
    ".slick-dots": {
      display: "flex !important",
      margin: 0,
      padding: 0,
      listStyle: "none",
      alignItems: "center",
      justifyContent: "center",
      marginTop: [3, null, null, 13],
      li: {
        mx: 1,
        display: "flex",
      },
      button: {
        variant: "testimonials.button",
        borderRadius: 50,
        border: 0,
        cursor: "pointer",
        padding: 0,
        overflow: "hidden",
        textIndent: "-9999em",
        width: 10,
        height: 6,
        outline: 0,
        transition: "all 0.3s ease-in-out 0s",
      },
      ".slick-active button": {
        variant: "testimonials.activeButton",
        width: 20,
      },
    },
  },
};
