/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Image, Heading, Text } from "theme-ui";
import { remCalc } from "../../../../utils/style";
import EditableImageContainer from "../../../common/EditableImageContainer";
import withEditableText from "../../../common/withEditableText";

const EditableText = withEditableText(Text);
const EditableHeading = withEditableText(Heading);

const Testimonial = ({ data, onEdit, ...rest }) => {
  console.log(remCalc(31));
  return (
    <Box sx={styles.testimonial}>
      <Box as="figure" sx={styles.avatar}>
        <EditableImageContainer
          component={Image}
          src={data.image.src}
          alt={data.authorName}
          onSubmit={(src) =>
            onEdit({
              data: { ...data, image: { alt: data.authorName, src } },
              ...rest,
            })
          }
        />
      </Box>
      <Box sx={styles.content}>
        <EditableImageContainer
          component={Image}
          src={data.logoImage.src}
          alt={data.authorName}
          height={31}
          onSubmit={(src) =>
            onEdit({
              data: { ...data, logoImage: { alt: data.authorName, src } },
              ...rest,
            })
          }
        />
        <EditableText
          as="p"
          initialText={data.text}
          onSubmit={(text) =>
            onEdit({
              data: { ...data, text },
              ...rest,
            })
          }
        />
        <EditableHeading
          as="h4"
          initialText={data.authorName}
          onSubmit={(authorName) =>
            onEdit({
              data: { ...data, authorName },
              ...rest,
            })
          }
        />
        <br />
        <EditableText
          as="span"
          initialText={data.designation}
          onSubmit={(designation) =>
            onEdit({
              data: { ...data, designation },
              ...rest,
            })
          }
        />
      </Box>
    </Box>
  );
};

export default Testimonial;

const styles = {
  testimonial: {
    display: [null, null, null, "flex"],
    textAlign: ["center", null, null, "left"],
    px: [null, null, null, 10, 0],
    mr: [null, null, null, null, 4, 0],
    img: {
      mx: ["auto", null, null, "unset"],
    },
  },
  avatar: {
    width: 60,
    margin: ["0 0 15px 0", null, null, "55px 30px 0 0"],
    img: {
      borderRadius: "50%",
    },
  },
  content: {
    img: {
      mb: 2,
    },
    p: {
      fontSize: [2, null, null, 3],
      lineHeight: 1.94,
      letterSpacing: "heading",
      color: "heading",
    },
    h4: {
      color: "heading",
      mt: 4,
    },
    span: {
      display: "inline-flex",
      mt: "8px",
    },
  },
};
