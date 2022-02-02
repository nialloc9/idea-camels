import content from "./content";
import defaultTheme from "./defaultTheme";
import themeTwo from "./themeTwo";

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
