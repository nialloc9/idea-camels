import React from "react";
import {
  remCalc,
  styled,
  withTheme,
  getMarginsOrPaddings,
} from "../../../utils/style";
import Accordion from "../../Accordion";

const Container = styled.section`
  max-width: 60%;
  margin: auto;
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
    content:
      "All IdeaCamels staff sign an NDA barring them from sharing information on any ideas acquired while working for IdeaCamels.",
    analyticsLabel: "stolen-ideas",
  },
  {
    title: "What if I don't use all my advertising budget?",
    content:
      "We will refund unused advertising budget within 30 days of experiment ending.",
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
    content: `You do for up to 1 year. We will manage it for you while your experiments are running but if you want to transfer ownership of this to your domain provider please contact us at support@ideacamels.com and we will be happy to help.`,
    analyticsLabel: "domain-ownership",
  },
  {
    title: "What if I want to cancel my experiments early?",
    content:
      "Not a problem, contact us at support@ideacamels.com and we will be happy to help.",
    analyticsLabel: "cancel-early",
  },
];

export default withTheme(() => (
  <Container>
    <Accordion fluid action="faq-click" data={data} />
  </Container>
));
