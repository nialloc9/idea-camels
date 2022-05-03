import content from "./content.json";
import theme1 from "./theme1.json";
import theme2 from "./theme2.json";

export default {
  ref: 3,
  name: "Modern",
  content,
  themes: [
    {
      ref: 1,
      templateRef: 3,
      name: "Modern",
      theme: theme1,
    },
    {
      ref: 2,
      templateRef: 3,
      name: "Two",
      theme: theme2,
    },
  ],
};
