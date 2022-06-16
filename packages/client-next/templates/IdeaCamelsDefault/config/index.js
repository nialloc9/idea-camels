import content from "./content.json";
import theme1 from "./theme1.json";
import theme2 from "./theme2.json";
import theme3 from "./theme3.json";
import theme4 from "./theme4.json";

export default {
  ref: 1,
  name: "Idea Camels Default",
  content,
  themes: [
    {
      ref: 1,
      templateRef: 1,
      name: "Idea Camels Default",
      theme: theme1,
    },
    {
      ref: 2,
      templateRef: 1,
      name: "Cape Lee",
      theme: theme2,
    },
    {
      ref: 3,
      templateRef: 1,
      name: "Neverything",
      theme: theme3,
    },
    {
      ref: 4,
      templateRef: 1,
      name: "Antique Coral",
      theme: theme4,
    },
  ],
};
