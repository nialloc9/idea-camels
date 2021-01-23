import React from "react";
import withAnalytics from "../../hoc/withAnalytics";
import { styled, remCalc } from "../../utils/style";
import { Grid, GridColumn } from "../Grid";
import { Image } from "../Image";
import { List, ListItem } from "../List";
import { Icon } from "../Icon";
import { theme, content } from "../../config"

const { footer: { height, paddings, backgroundColor, color, fontFamily, size,column3, column2, column1 } } = theme;

const Container = styled.section`
  min-height: ${remCalc(height)};
  padding: ${`${remCalc(paddings[0])} ${remCalc(paddings[1])} ${remCalc(
      paddings[2]
    )} ${remCalc(paddings[3])}`};
  box-sizing: border-box;
  background-color: ${backgroundColor};
  color: ${color};
  font-family: ${fontFamily};
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: ${color};
  font-size: ${remCalc(size)};
`;

const StyledIcon = styled(Icon)`
  color: ${column3.iconColor};
`;

const StyledListItem = styled(ListItem)`
  color: ${column2.color} !important;
  text-decoration: none;

  &:hover {
    text-decoration: underline;
    color: ${column2.hoverColor} !important;
  }
`;

const AnalyticsIcon = withAnalytics(StyledIcon);
const AnalyticsListItem = withAnalytics(StyledListItem);

export default () => (
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
)