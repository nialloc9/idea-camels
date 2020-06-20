import React from 'react';
import {styled, remCalc, getMarginsOrPaddings, createMediaQuery} from 'utils/style';
import EmailSignUp from 'components/EmailSignUp';

const Container = styled.section`
    min-height: 100vh;
    padding: ${({ theme: { comingSoon: { paddings } } }) => getMarginsOrPaddings(paddings)};
    background-color: ${({ theme: { comingSoon: { backgroundColor } } }) => backgroundColor};
    font-family: ${({ theme: { comingSoon: { fontFamily } } }) => fontFamily};
    display: flex;
    justify-content: center;
`;

const InnerContainer = styled.div`
    display: flex;
    justify-content: center;
    flex-direction: column;
    max-width: ${({ theme: { comingSoon } }) => remCalc(comingSoon.width)};
`;

const Heading = styled.h1`
    display: block;
    font-size: ${({ theme: { comingSoon: { headingSize } } }) => remCalc(headingSize)};
    line-height: ${({ theme: { comingSoon: { headingLineHeight } } }) => remCalc(headingLineHeight)};
    margin: ${({ theme: { comingSoon: { headingMargins } } }) => `${remCalc(headingMargins[0])} ${remCalc(headingMargins[1])} ${remCalc(headingMargins[2])} ${remCalc(headingMargins[3])}`};
`;

const SubHeading = styled.p`
    display: block;
    line-height: ${({ theme: { comingSoon: { subHeadingLineHeight } } }) => remCalc(subHeadingLineHeight)};
    font-size: ${({ theme: { comingSoon: { subHeadingSize } } }) => remCalc(subHeadingSize)};
    margin: ${({ theme: { comingSoon: { subHeadingMargins } } }) => `${remCalc(subHeadingMargins[0])} ${remCalc(subHeadingMargins[1])} ${remCalc(subHeadingMargins[2])} ${remCalc(subHeadingMargins[3])}`};
`;

const SignUpContainer = styled.div`
    ${({ theme: { breakpoints } }) => createMediaQuery(breakpoints.tablet)} {
        max-width: ${({ theme: { comingSoon } }) => remCalc(comingSoon.signUpWidth)};
    }
`;

export default () => (
    <Container>
        <InnerContainer>
            <Heading>Coming Soon</Heading>
            <SubHeading>Sign up now to the upcoming Idea Camels release and receive an early bird discount.</SubHeading>
            <SignUpContainer>
                <EmailSignUp />
            </SignUpContainer>
        </InnerContainer>
    </Container>
)