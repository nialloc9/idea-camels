import content from "./content.json";
import theme1 from "./theme1.json";
import theme2 from "./theme2.json";

export default {
  ref: 2,
  name: "Basic",
  content,
  themes: [
    {
      ref: 1,
      templateRef: 2,
      name: "Basic",
      theme: theme1,
    },
    {
      ref: 2,
      templateRef: 2,
      name: "Two",
      theme: theme2,
    },
  ],
};
