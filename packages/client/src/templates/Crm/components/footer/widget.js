/** @jsxRuntime classic */
/** @jsx jsx */
import { jsx, Box, Heading } from "theme-ui";
import { Link } from "../link";
import withEditableText from "../../../common/withEditableText";
import { addValueToArray } from "../../../common/utils";

const EditableHeading = withEditableText(Heading);
const EditableLink = withEditableText(Link);

const Widget = ({ title, items, index, onSetContent }) => {
  return (
    <Box sx={styles.footerWidget}>
      <EditableHeading
        as="h4"
        initialtText={title}
        color="white"
        onSubmit={(value) =>
          onSetContent({
            footer: {
              items: addValueToArray(items, { items, title: value }, index),
            },
          })
        }
      />
      <ul>
        {items.map((item, i) => (
          <li key={i}>
            <EditableLink
              key={i}
              initialText={item}
              variant="footer"
              color="white"
              onSubmit={(value, i) =>
                onSetContent({
                  footer: {
                    items: addValueToArray(
                      items,
                      { items: addValueToArray(items, value, i), title },
                      index
                    ),
                  },
                })
              }
            />
          </li>
        ))}
      </ul>
    </Box>
  );
};

export default Widget;

const styles = {
  footerWidget: {
    a: {
      color: "white",
    },
    h4: {
      color: "white",
      fontFamily: "body",
      fontSize: 3,
      fontWeight: 500,
      lineHeight: 1.68,
      letterSpacing: "heading",
    },
    ul: {
      listStyle: "none",
      margin: "28px 0 0",
      padding: 0,
      li: {
        // display: "flex",
        alignItems: "center",
        img: {
          mr: "15px",
        },
      },
      a: {
        variant: "footer",
      },
    },
  },
};
