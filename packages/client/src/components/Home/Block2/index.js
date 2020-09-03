import React from 'react';
import { remCalc, styled } from '../../../utils/style';

const Container = styled.section`
    min-height: ${({ theme: { block2: { height } } }) => remCalc(height)};
    background-image: url(${({ theme: { block2: { image } } }) => image});
    background-position: center;
    background-repeat: no-repeat;
`;

export default () => <Container />;