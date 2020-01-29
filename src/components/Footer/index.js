import React from 'react';
import {styled, remCalc} from 'utils/style'

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
`;

export default () => (
    <Container>
        hello
    </Container>
)