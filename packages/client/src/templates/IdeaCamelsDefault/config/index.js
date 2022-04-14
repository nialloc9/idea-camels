import content from "./content.json";
import theme1 from "./theme1.json";
import theme2 from "./theme2.json";

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
      name: "Two",
      theme: theme2,
    },
  ],
};
