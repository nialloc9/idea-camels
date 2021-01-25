import React from "react";
import withAnalytics from "../../hoc/withAnalytics";
import { styled, remCalc, withTheme } from "../../utils/style";
import { Grid, GridColumn } from "../Grid";
import { Image } from "../Image";
import { List, ListItem } from "../List";
import { Icon } from "../Icon";
import { content } from "../../config"

const Container = styled.section`
  min-height: ${({ theme: { footer: { height } } }) => remCalc(height)};
  padding: ${({ theme: { footer: { paddings } } }) => `${remCalc(paddings[0])} ${remCalc(paddings[1])} ${remCalc(
      paddings[2]
    )} ${remCalc(paddings[3])}`};
  box-sizing: border-box;
  background-color: ${({ theme: { footer: { backgroundColor } } }) => backgroundColor};
  color: ${({ theme: { footer: { color } } }) => color};
  font-family: ${({ theme: { footer: { fontFamily } } }) => fontFamily};
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${({ theme: { footer: { color } } }) => color};
  font-size: ${({ theme: { footer: { size } } }) => remCalc(size)};
`;

const StyledIcon = styled(Icon)`
  color: ${({ theme: { footer: { column3 } } }) => column3.iconColor};
`;

const StyledListItem = styled(ListItem)`
  color: ${({ theme: { footer: { column2 } } }) => column2.color} !important;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${({ theme: { footer: { column2 } } }) => column2.hoverColor} !important;
  }
`;

const AnalyticsIcon = withAnalytics(StyledIcon);
const AnalyticsListItem = withAnalytics(StyledListItem);

export default withTheme(({ theme: { footer: { column1, column3 } } }) => (
  <Container>
    <Grid stackable container columns={3}>
      <GridColumn>
        <Image src={content.footer.column1.image.src} size={column1.imageSize} avatar />
        <span>{content.footer.column1.text.text}</span>
      </GridColumn>
      <GridColumn>
        <List>
          {content.footer.column2.map(({ text, ...rest }) => (
            <AnalyticsListItem
              key={text}
              {...rest}
              as="a"
            >
              {text}
            </AnalyticsListItem>
          ))}
        </List>
      </GridColumn>
      <GridColumn>
      {content.footer.column3.map(({ href, action, name }) => (
            <a href={href}>
              <AnalyticsIcon
                bordered
                size={column3.iconSize}
                action={action}
                name={name}
              />
            </a>
          ))}
      </GridColumn>
    </Grid>
  </Container>
))