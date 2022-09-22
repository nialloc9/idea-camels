/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Heading, Text, Link as A } from "theme-ui";
import withEditableText from "../../common/withEditableText";
import Play from "./icons/play";

const EditableHeading = withEditableText(Heading);
const EditableText = withEditableText(Text);
const EditableLearnMore = withEditableText(A);

const SectionHeading = ({
  title,
  description,
  learnMore,
  moreLink,
  onEdit,
  ...props
}) => {
  return (
    <Box sx={styles.heading} {...props}>
      <EditableHeading
        as="h3"
        sx={styles.title}
        initialText={title}
        onSubmit={(newTitle) => onEdit({ title: newTitle })}
      />
      {description && (
        <EditableText
          as="p"
          sx={styles.description}
          initialText={description}
          onSubmit={(newDescription) => onEdit({ description: newDescription })}
        />
      )}
      {learnMore && (
        <EditableLearnMore
          sx={styles.learnMore}
          initialText={learnMore ?? "Learn More"}
          appearAfterText={<Play />}
          onSubmit={(newLearnMore) => onEdit({ learnMore: newLearnMore })}
        />
      )}
    </Box>
  );
};

export default SectionHeading;

const styles = {
  heading: {
    mx: "auto",
    textAlign: "center",
  },
  slogan: {
    color: "primary",
    fontWeight: 500,
    fontSize: 2,
    lineHeight: 2.25,
  },
  title: {
    color: "heading",
    fontWeight: [500, null, null, 700],
    fontSize: [4, null, 5, 6],
    lineHeight: [1.33, 1.33, 2.08],
    letterSpacing: [null, null, null, "heading"],

    img: {
      ml: ["15px"],
      position: "relative",
      top: "8px",
      maxWidth: [25, null, null, "100%"],
    },
  },
  description: {
    color: "heading",
    fontSize: ["14px", null, "16px"],
    lineHeight: [1.86, null, 2.2],
    mt: [5],
    maxWidth: 610,
    m: ["10px auto 0"],
  },
  learnMore: {
    mt: [3, null, null, 5],
    color: "primary",
    cursor: "pointer",
    fontSize: [1, null, null, null, "15px"],
    fontWeight: 700,
    display: "inline-flex",
    alignItems: "center",
    textDecoration: "none",
    textTransform: "uppercase",
    svg: {
      width: [14, null, null, 17],
      ml: 2,
    },
  },
};
