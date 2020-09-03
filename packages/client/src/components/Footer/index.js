import React from 'react';
import withAnalytics from '../../hoc/withAnalytics';
import {styled, remCalc, withTheme} from '../../utils/style';
import { Grid, GridColumn } from "../Grid";
import { Image } from "../Image";
import { List, ListItem } from "../List";
import { Icon } from "../Icon";

const Container = styled.section`
    min-height: ${({ theme: { footer: { height } } }) => remCalc(height)};
    padding: ${({ theme: { footer: { paddings } } }) => `${remCalc(paddings[0])} ${remCalc(paddings[1])} ${remCalc(paddings[2])} ${remCalc(paddings[3])}`};
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
    color: ${({ theme: { footer: { column3: { iconColor } }}}) => iconColor};
`;

const StyledListItem = styled(ListItem)`
    color: ${({ theme: { footer: { column2: { color } }}}) => color} !important;
    text-decoration: none;

    &:hover {
        text-decoration: underline;
        color: ${({ theme: { footer: { column2: { hoverColor } }}}) => hoverColor} !important;
    }
`;

const AnalyticsIcon = withAnalytics(StyledIcon);
const AnalyticsListItem = withAnalytics(StyledListItem);

export default withTheme(({ theme: { footer: { column1: { imageSrc, imageSize }, column3: { iconSize } } } }) => (
    <Container>
        <Grid stackable container columns={3}>
            <GridColumn>
                <Image src={imageSrc} size={imageSize} avatar />
                <span>Idea Camels</span>
            </GridColumn>
            <GridColumn>
                <List>
                    <AnalyticsListItem as="a" href="/coming-soon" action="footer-contact">Contact Us</AnalyticsListItem>
                    <AnalyticsListItem as="a" href="/coming-soon" action="footer-taq">Terms And Conditions</AnalyticsListItem>
                    <AnalyticsListItem as="a" href="/coming-soon" action="footer-privacy">Privacy Policy</AnalyticsListItem>
                    <AnalyticsListItem as="a" href="/coming-soon" action="footer-cookies">Cookies Policy</AnalyticsListItem>
                </List>
            </GridColumn>
            <GridColumn>
                <a href="/coming-soon"><AnalyticsIcon action="footer-facebook" bordered size={iconSize} name='facebook' /></a>
                <a href="/coming-soon"><AnalyticsIcon action="footer-facebook" bordered size={iconSize} name='twitter' /></a>
                <a href="/coming-soon"><AnalyticsIcon action="footer-facebook" bordered size={iconSize} name='linkedin' /></a>
            </GridColumn>
        </Grid>
    </Container>
))