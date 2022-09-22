/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Image, Heading, Text } from "theme-ui";
import Play from "../icons/play";
import withEditableText from "../../../common/withEditableText";
import EditableImage from "../../../common/EditableImageContainer";

const EditableHeading = withEditableText(Heading);
const EditableText = withEditableText(Text);

const Feature = ({ data, onEdit, ...props }) => {
  return (
    <Box sx={styles.feature} {...props}>
      <Box as="figure">
        <EditableImage
          component={Image}
          src={data?.icon}
          alt={data?.title}
          onSubmit={(icon) => ({ ...data, icon })}
        />
      </Box>
      <Box>
        <EditableHeading
          as="p"
          initialText={data?.title}
          onSubmit={(title) => onEdit({ ...data, title })}
        />
        <EditableText
          as="p"
          initialText={data?.description}
          onSubmit={(description) => onEdit({ ...data, description })}
        />
        <div sx={styles.learnMore}>
          <span>Learn More</span> <Play width={14} height={14} />
        </div>
      </Box>
    </Box>
  );
};

export default Feature;

const styles = {
  feature: {
    display: [null, null, null, null, null, "flex"],
    textAlign: ["center", null, null, null, null, "left"],
    figure: {
      minWidth: [42, null, null, 70],
      mr: [null, null, null, null, null, 6],
      mb: [3, null, null, null, null, 0],
    },
    h4: {
      fontSize: [2, null, null, 3],
      fontWeight: "bold",
      lineHeight: 1.68,
      color: "heading",
      mb: 3,
    },
    p: {
      fontSize: [1, null, null, 2],
      lineHeight: 1.88,
      color: "text",
    },
  },
  learnMore: {
    color: "primary",
    cursor: "pointer",
    fontSize: [1, null, null, "13px"],
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "baseline",
    textDecoration: "none",
    letterSpacing: 1,
    lineHeight: 1,
    textTransform: "uppercase",
    mt: 4,
    svg: {
      ml: 2,
    },
  },
};
