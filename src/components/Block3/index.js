import React from 'react';
import { remCalc, styled, withTheme } from 'utils/style';
import { Button } from '../Button';
import { Grid, GridColumn } from '../Grid';
import { Card } from '../Card';

const getMarginsOrPaddings = values => `${remCalc(values[0])} ${remCalc(values[1])} ${remCalc(values[2])} ${remCalc(values[3])}`;

const Container = styled.section`
    height: ${({ theme: { block3: { height } } }) => remCalc(height)};
    background-color: ${({ theme: { block3: { backgroundColor } } }) => backgroundColor};
    display: flex;
    justify-content: center;
    position: relative;
    font-family: ${({ theme: { block3: { fontFamily } } }) => fontFamily};
`;

const Overlay = styled.div`
    position: absolute;
    box-sizing: border-box;
    top: ${({ theme: { block3: { overlay } } }) => `${overlay.top}px`};
    min-height: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.minHeight)};
    background-color: ${({ theme: { block3: { overlay } } }) => overlay.backgroundColor};
    max-width: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.width)};
`;

const Heading = styled.h1`
    display: block;
    font-size: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.headingSize)};
    font-weight: ${({ theme: { block3: { overlay } } }) => overlay.headingWeight};
    line-height: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.headingLineHeight)};
    margin: ${({ theme: { block3: { overlay } } }) => getMarginsOrPaddings(overlay.headingMargins)};
`;

const MainText = styled.p`
    font-size: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.mainText.fontSize)};
    line-height: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.mainText.lineHeight)};
    font-weight: ${({ theme: { block3: { overlay } } }) => overlay.mainText.fontWeight};
    margin: ${({ theme: { block3: { overlay } } }) => getMarginsOrPaddings(overlay.mainText.margins)};
`;

const ButtonContainer = styled.div`
    max-width: ${({ theme: { block3: { overlay } } }) => overlay.button.width ? remCalc(overlay.button.width) : 'auto'};
    margin: ${({ theme: { block3: { overlay } } }) => getMarginsOrPaddings(overlay.button.margins)};
`;

const TextContainer = styled.div`
    padding: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.padding)};
`;

const FeaturesContainer = styled.div`
    margin: ${({ theme: { block3: { overlay } } }) => getMarginsOrPaddings(overlay.features.featuresMargins)};
`;

const StyleCard = styled(Card)`
    width: 100% !important;
`;

const FeatureHeader = styled.h1`
    margin: ${({ theme: { block3: { overlay } } }) => getMarginsOrPaddings(overlay.features.headerMargins)};
    background-color: ${({ theme: { block3: { overlay } } }) => overlay.features.headerBackgroundColor};
    padding: ${({ theme: { block3: { overlay } } }) => remCalc(overlay.features.headerPadding)};
    font-family: ${({ theme: { block3: { overlay } } }) => overlay.features.headerFontFamily};
    display: flex;
    justify-content: center;
`;

const features = [
    {
        key: 1,
        header: 'Modern',
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures."
    },
    {
        key: 2,
        header: 'Simple',
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures."
    },
    {
        key: 3,
        header: 'Safe',
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures."
    }
];

export default withTheme(({ theme: { block3 } }) => console.log(block3) || (
    <Container>
        <Overlay>
            <TextContainer>
                <Heading>
                    Welcome to The Teachers Guild
                </Heading>
                <MainText>
                    We are a professional community that activates teachers' creativity to solve the biggest challenges in education today. In our collaborative learning programs we use Design Thinking, a learner-centered approach to problem solving. Teachers tap into their inner designer by trying new ideas and discovering what works and why for their students and schools.
                </MainText>
                <ButtonContainer>
                    <Button color='black' size={block3.overlay.button.size} basic>Learn More</Button>
                </ButtonContainer>
            </TextContainer>

            <FeatureHeader>FEATURES</FeatureHeader>
            
            <FeaturesContainer>
                <Grid centered columns={3} stretched stackable>
                    {
                        features.map(({ key, ...rest }) => (
                            <GridColumn>
                                <StyleCard {...rest} />
                            </GridColumn>
                        ))
                    }
                </Grid>
            </FeaturesContainer>
        </Overlay>
    </Container>
));