/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Flex, Container } from "theme-ui";
import SectionHeading from "../components/section-heading";
import Image from "../components/image";
import EditableImage from "../../common/EditableImageContainer";

const Security = ({ content, onSetContent }) => {
  return (
    <section sx={styles.section} id="features">
      <Container>
        <Box sx={styles.grid}>
          <Flex sx={styles.illustration}>
            <EditableImage
              src={content.security.image.src}
              alt={content.security.image.alt}
              height={534}
              component={Image}
              onSubmit={(src) => ({ security: { image: { src } } })}
            />
          </Flex>
          <SectionHeading
            sx={styles.heading}
            title={content.security.title}
            description={content.security.description}
            learnMore={content.security.learnMore}
            onEdit={(security) =>
              onSetContent({
                security: { ...content.security, ...security },
              })
            }
          />
        </Box>
      </Container>
    </section>
  );
};

export default Security;

const styles = {
  section: {
    pt: [6, null, null, null, 10, 14],
    pb: [6, null, null, 8, 10, 11],
  },
  grid: {
    display: ["flex", null, null, "grid"],
    alignItems: "center",
    gap: [null, null, null, 6, 14],
    flexDirection: ["column-reverse", null, null, "unset"],
    gridTemplateColumns: ["1fr", null, null, "repeat(2, 1fr)", "1fr 470px"],
  },
  heading: {
    textAlign: ["center", null, null, "left"],
    h3: {
      fontSize: [3, null, null, 8, 11],
      lineHeight: 1.53,
    },
  },
  illustration: {
    alignItems: "center",
    mt: [8, null, 0],
  },
};
