/** @jsxRuntime classic */
/** @jsx jsx */
import { rgba } from "polished";
import { jsx, Flex, Container, Heading, Text, Button } from "theme-ui";
import Image from "components/image";
import { Link } from "components/link";
import Play from "components/icons/play";

import { config, content } from "config";

const Banner = () => {
  return (
    <section id="home" sx={styles.section}>
      <Container sx={styles.container}>
        <div sx={styles.content}>
          <Heading as="h1">{content.banner.heading}</Heading>
          <Text as="p">{content.banner.subHeading}</Text>
          <Flex sx={styles.buttonGroup}>
            <Link
              href={config.experiment.comingSoonUrl}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button variant="primary" sx={styles.btnPrimary}>
                {content.banner.button1}
              </Button>
            </Link>
            <Link
              href={config.experiment.comingSoonUrl}
              style={{ color: "inherit", textDecoration: "inherit" }}
            >
              <Button variant="outlined" sx={styles.btnOutlined}>
                {content.banner.button2} <Play fill="white" />
              </Button>
            </Link>
          </Flex>
        </div>
        <Flex as="figure" sx={styles.illustration}>
          <Image
            src={content.banner.image.src}
            alt={content.banner.image.alt}
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
      color: rgba("white", 0.8),
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
    borderColor: rgba("white", 0.25),
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
    height: 713,
    img: {
      height: 680,
    },
  },
};
