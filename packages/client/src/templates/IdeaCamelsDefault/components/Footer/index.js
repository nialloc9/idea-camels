import React from "react";
import { styled, remCalc, withTheme } from "../../../../utils/style";
import { Grid, GridColumn } from "../Grid";
import { List, ListItem } from "../List";
import { Icon } from "../Icon";
import { EditableText, EditableImage } from "../Edit";

const Container = styled.section`
  min-height: ${({
    theme: {
      footer: { height },
    },
  }) => remCalc(height)};
  padding: ${({
    theme: {
      footer: { paddings },
    },
  }) =>
    `${remCalc(paddings[0])} ${remCalc(paddings[1])} ${remCalc(
      paddings[2]
    )} ${remCalc(paddings[3])}`};
  box-sizing: border-box;
  background-color: ${({
    theme: {
      footer: { backgroundColor },
    },
  }) => backgroundColor};
  color: ${({
    theme: {
      footer: { color },
    },
  }) => color};
  font-family: ${({
    theme: {
      footer: { fontFamily },
    },
  }) => fontFamily};
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({
    theme: {
      footer: { color },
    },
  }) => color};
  font-size: ${({
    theme: {
      footer: { size },
    },
  }) => remCalc(size)};
`;

const StyledIcon = styled(Icon)`
  color: ${({
    theme: {
      footer: { column3 },
    },
  }) => column3.iconColor};
`;

const StyledListItem = styled(ListItem)`
  color: ${({
    theme: {
      footer: { column2 },
    },
  }) => column2.color} !important;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${({
      theme: {
        footer: { column2 },
      },
    }) => column2.hoverColor} !important;
  }
`;

export default withTheme(
  ({
    theme: {
      footer: { column1, column3 },
    },
    content,
    onSetExperiment,
  }) => (
    <Container>
      <Grid stackable container columns={3}>
        <GridColumn>
          <EditableImage
            src={content.footer.column1.image.src}
            size={column1.imageSize}
            avatar
            onSubmit={(file) =>
              onSetExperiment({
                content: {
                  footer: {
                    column1: { image: { src: file } },
                  },
                },
                imageFiles: { footer: { column1: { image: { src: file } } } },
              })
            }
          />
          <EditableText
            initialText={content.footer.column1.text.text}
            onSubmit={(text) =>
              onSetExperiment({
                content: { footer: { column1: { text: { text } } } },
              })
            }
          />
        </GridColumn>
        <GridColumn>
          <List>
            {content.footer.column2.map(({ text, ...rest }) => (
              <StyledListItem key={text} {...rest}>
                {text}
              </StyledListItem>
            ))}
          </List>
        </GridColumn>
        <GridColumn>
          {content.footer.column3.map(({ name }) => (
            <StyledIcon bordered size={column3.iconSize} name={name} />
          ))}
        </GridColumn>
      </Grid>
    </Container>
  )
);
