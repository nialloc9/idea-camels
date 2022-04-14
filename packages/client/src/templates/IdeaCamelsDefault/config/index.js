import content from "./content.json";
import defaultTheme from "./theme1.json";
import themeTwo from "./theme2.json";

export default {
  ref: 1,
  name: "Idea Camels Default",
  content,
  themes: [
    {
      ref: 1,
      templateRef: 1,
      name: "Idea Camels Default",
      theme: defaultTheme,
    },
    {
      ref: 2,
      templateRef: 1,
      name: "Two",
      theme: themeTwo,
    },
  ],
};
