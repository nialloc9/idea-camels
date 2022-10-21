/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Flex, Container, Heading, Text, Button } from "theme-ui";
import Image from "../components/image";
import Play from "../components/icons/play";
import withEditableText from "../../common/withEditableText";
import EditableImage from "../../common/EditableImageContainer";

const EditableHeading = withEditableText(Heading);
const EditableText = withEditableText(Text);
const EditableButton = withEditableText(Button);

const Banner = ({ content, onSetContent }) => {
  return (
    <section id="home" sx={styles.section}>
      <Container sx={styles.container}>
        <div sx={styles.content}>
          <EditableHeading
            as="h1"
            initialText={content.banner.heading}
            onSubmit={(heading) =>
              onSetContent({
                banner: { heading },
              })
            }
          />
          <EditableText
            as="p"
            initialText={content.banner.subHeading}
            onSubmit={(subHeading) =>
              onSetContent({
                banner: { subHeading },
              })
            }
          />

          <Flex sx={styles.buttonGroup}>
            <EditableButton
              variant="primary"
              sx={styles.btnPrimary}
              initialText={content.banner.button1}
              onSubmit={(button1) => ({ banner: { button1 } })}
            />
            <EditableButton
              sx={styles.btnOutlined}
              initialText={content.banner.button2}
              onSubmit={(button2) => ({ banner: { button2 } })}
              appearAfterText={<Play fill="white" />}
            />
          </Flex>
        </div>
        <Flex as="figure" sx={styles.illustration}>
          <EditableImage
            src={content.banner.image.src}
            alt={content.banner.image.alt}
            height={680}
            containerHeight={713}
            component={Image}
            onSubmit={(src) => onSetContent({ banner: { image: { src } } })}
          />
        </Flex>
      </Container>
    </section>
  );
};

export default Banner;

const styles = {
  section: {
    variant: "banner",
    // pt: [8, null, null, null, 10, 14],
    // pb: [8, null, null, null, 10, 14],
    position: "relative",
    zIndex: 0,
    "::before": {
      backgroundColor: "white",
      content: `''`,
      position: "absolute",
      height: [30, null, null, 70, 85, 120],
      bottom: 0,
      width: "100%",
      zIndex: -1,
    },
  },
  container: {
    minHeight: [null, null, null, null, null, "100vh"],
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    flexDirection: "column",
  },
  content: {
    maxWidth: [null, null, null, 570, 690],
    textAlign: "center",
    marginTop: [18, null, null, 22, 180],
    h1: {
      color: "white",
      fontSize: [7, null, null, 12, 14],
      lineHeight: 1.35,
    },
    p: {
      color: "white",
      fontSize: [1, null, null, 2],
      marginTop: [3, null, null, 6],
    },
  },
  buttonGroup: {
    alignItems: "center",
    justifyContent: "center",
    marginTop: [6, null, null, 8],
    position: "relative",
    zIndex: 2,
    button: {
      px: ["12px", null, null, "18px"],
    },
  },
  btnPrimary: {},
  btnOutlined: {
    borderColor: "white",
    color: "white",
    ml: 3,
    svg: {
      ml: 2,
    },
  },
  illustration: {
    transform: ["scale(1.20)", null, null, "none"],
    alignItems: "center",
    display: "flex",
    marginTop: [2, null, null, -4, -5],
  },
};
