import React from "react";
import {
  remCalc,
  styled,
  withTheme,
  getMarginsOrPaddings,
} from "../../../utils/style";
import Accordion from "../../Accordion";

const Heading = styled.h1`
  margin: ${remCalc(30)} auto 0 auto;
  text-align: center;
  display: block;
  font-size: ${({
    theme: {
      block4: { heading },
    },
  }) => remCalc(heading.size)};
  font-weight: ${({
    theme: {
      block4: { heading },
    },
  }) => heading.weight};
  line-height: ${({
    theme: {
      block4: { heading },
    },
  }) => remCalc(heading.lineHeight)};
`;

const Container = styled.section`
  max-width: 60%;
  margin: ${remCalc(40)} auto 0 auto;
  background-color: ${({
    theme: {
      block6: { backgroundColor },
    },
  }) => backgroundColor};
  display: flex;
  justify-content: center;
  position: relative;
  font-family: ${({
    theme: {
      block6: { fontFamily },
    },
  }) => fontFamily};
  padding: ${({
    theme: {
      block6: { paddings },
    },
  }) => getMarginsOrPaddings(paddings)};
`;

const data = [
  {
    title: "How do you prevent my ideas from being taken by your staff?",
    content: (
      <span>
        All IdeaCamels staff sign an{" "}
        <a href="https://www.investopedia.com/terms/n/nda.asp" target="_blank">
          NDA
        </a>{" "}
        barring them from sharing information on any ideas acquired while
        working for IdeaCamels.
      </span>
    ),
    analyticsLabel: "stolen-ideas",
  },
  {
    title: "What if I don't use all my advertising budget?",
    content:
      "We will refund unused advertising budget within 30 days of an experiment ending.",
    analyticsLabel: "unused-advertising-budget",
  },
  {
    title: "Can I run multiple experiments at the same time?",
    content:
      "Absolutely, we encourage this so you can test multiple ideas and find the best one.",
    analyticsLabel: "concurrent-experiments",
  },
  {
    title: "Who owns the domain I purchase through IdeaCamels?",
    content: (
      <span>
        You own it and it is registered for an initial 12 month period. We will
        manage it for you while your experiments are running but if you want to
        transfer ownership of this to your domain provider, please contact us at{" "}
        <a href="mailto: support@ideacamels.com">support@ideacamels.com</a> and
        we will be happy to help.
      </span>
    ),
    analyticsLabel: "domain-ownership",
  },
  {
    title: "What if I want to cancel my experiments early?",
    content: (
      <span>
        Not a problem, contact us at{" "}
        <a href="mailto: support@ideacamels.com">support@ideacamels.com</a> and
        we will be happy to help.
      </span>
    ),
    analyticsLabel: "cancel-early",
  },
];

export default withTheme(() => [
  <Heading>You asked, we answered</Heading>,
  <Container>
    <Accordion fluid action="faq-click" data={data} />
  </Container>,
]);
