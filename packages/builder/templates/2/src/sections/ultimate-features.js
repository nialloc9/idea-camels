/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Container } from "theme-ui";
import SectionHeading from "components/section-heading";
import Feature from "components/cards/feature";
import { config, content } from "config";

const UltimateFeatures = () => {
  return (
    <section sx={styles.section} id="services">
      <Container>
        <SectionHeading
          sx={styles.heading}
          title={content.ultimateFeatures.title}
          description={content.ultimateFeatures.description}
        />
        <Box sx={styles.features}>
          {content.ultimateFeatures.features?.map((item) => (
            <Feature
              key={item.id}
              className="feature-item"
              data={content.ultimateFeatures.features}
              comingSoonUrl={config.experiment.comingSoonUrl}
            />
          ))}
        </Box>
      </Container>
    </section>
  );
};

export default UltimateFeatures;

const styles = {
  section: {
    pt: [12],
    pb: [6, null, null, 8, 15],
  },
  heading: {
    marginBottom: [40, 50, 60, 80],
    maxWidth: ["none", null, null, 565, null, "none"],
  },
  features: {
    gap: [6, null, null, "90px 40px"],
    display: ["grid"],
    maxWidth: 1175,
    mx: "auto",
    justifyContent: ["center", null, null, "unset"],
    gridTemplateColumns: [
      "repeat(1, 300px)",
      null,
      null,
      "repeat(2, 1fr)",
      "repeat(3, 1fr)",
    ],
  },
};
