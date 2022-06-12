/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Flex, Container } from "theme-ui";
import SectionHeading from "../components/section-heading";
import EditableImage from "../../common/EditableImageContainer";
import Image from "../components/image";

const Addons = ({ content, onSetContent }) => {
  return (
    <section sx={styles.section}>
      <Container>
        <Box sx={styles.grid}>
          <SectionHeading
            sx={styles.heading}
            title={content.addons.title}
            description={content.addons.description}
            learnMore={content.addons.learnMore}
            onEdit={({ addons }) =>
              onSetContent({ ...content.addons, ...addons })
            }
          />
          <Flex sx={styles.illustration}>
            <EditableImage
              src={content.addons.image.src}
              alt={content.addons.image.alt}
              component={Image}
              onSubmit={({ src }) =>
                onSetContent({ addons: { image: { src } } })
              }
            />
          </Flex>
        </Box>
      </Container>
    </section>
  );
};

export default Addons;

const styles = {
  section: {
    pt: [6, null, null, 8, 10, 11],
    pb: [8, null, null, 12, null, 14],
  },
  grid: {
    display: "grid",
    alignItems: "center",
    gap: 6,
    gridTemplateColumns: ["1fr", null, null, "repeat(2, 1fr)", "500px 1fr"],
  },
  heading: {
    textAlign: ["center", null, null, "left"],
    h3: {
      fontSize: [3, null, null, 6, 11],
      lineHeight: 1.53,
    },
  },
  illustration: {
    alignItems: "center",
  },
};
